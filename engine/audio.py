"""Banda sonora 100% sintetizada (sin licencias de terceros): música + efectos + mezcla con la voz.

Uso: python3 engine/audio.py videos/<id>
Lee build/voice.wav, build/cues.json, build/timeline.json → escribe build/mix.wav
"""
import json, os, subprocess, sys, wave
import numpy as np
from scipy.signal import butter, sosfilt

SR = 48000
rng = np.random.default_rng(7)


def read_wav(path):
    with wave.open(path) as w:
        x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768
        return x.reshape(-1, w.getnchannels()).mean(axis=1)


def write_wav(path, x):
    x = np.clip(x, -1, 1)
    if x.ndim == 1:
        x = np.stack([x, x], axis=1)
    with wave.open(path, "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((x * 32767).astype(np.int16).tobytes())


def lp(x, f, order=2):
    return sosfilt(butter(order, f, "low", fs=SR, output="sos"), x)


def hp(x, f, order=2):
    return sosfilt(butter(order, f, "high", fs=SR, output="sos"), x)


def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], "band", fs=SR, output="sos"), x)


def t_axis(d):
    return np.arange(int(d * SR)) / SR


def env_ad(n, a, d):
    t = np.arange(n) / SR
    return np.where(t < a, t / max(a, 1e-4), np.exp(-(t - a) / d))


def midi(m):
    return 440 * 2 ** ((m - 69) / 12)


# ───────────── Efectos ─────────────
def sweep_noise(d, f0, f1, blocks=24):
    n = int(d * SR)
    noise = rng.standard_normal(n)
    out = np.zeros(n)
    edges = np.linspace(0, n, blocks + 1).astype(int)
    for i in range(blocks):
        f = f0 * (f1 / f0) ** (i / (blocks - 1))
        seg = bp(noise[max(0, edges[i] - 2000):edges[i + 1]], max(60, f * 0.6), min(SR / 2 - 100, f * 1.6))
        out[edges[i]:edges[i + 1]] = seg[-(edges[i + 1] - edges[i]):]
    return out


def sfx(kind):
    if kind == "whoosh":
        d = 0.5; t = t_axis(d)
        x = sweep_noise(d, 400, 6000) * np.sin(np.pi * t / d) ** 2
        return 0.5 * x / (np.abs(x).max() + 1e-9)
    if kind == "swipe":
        d = 0.22; t = t_axis(d)
        x = sweep_noise(d, 2500, 9000, 10) * np.sin(np.pi * t / d) ** 1.5
        return 0.4 * x / (np.abs(x).max() + 1e-9)
    if kind == "pop":
        d = 0.14; t = t_axis(d)
        f = 950 * np.exp(-t * 18) + 280
        x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env_ad(len(t), 0.002, 0.035)
        return 0.55 * x
    if kind == "tick":
        d = 0.04; t = t_axis(d)
        return 0.35 * np.sin(2 * np.pi * 2400 * t) * env_ad(len(t), 0.001, 0.008)
    if kind == "ding":
        d = 1.2; t = t_axis(d)
        x = sum(a * np.sin(2 * np.pi * midi(88) * r * t) * np.exp(-t * k)
                for a, r, k in [(1, 1, 4), (0.45, 2.01, 7), (0.25, 3.03, 11), (0.12, 4.2, 15)])
        return 0.32 * x * env_ad(len(t), 0.002, 10)
    if kind == "stamp":
        d = 0.5; t = t_axis(d)
        f = 140 * np.exp(-t * 14) + 45
        body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)
        click = lp(rng.standard_normal(len(t)), 3500) * np.exp(-t * 60)
        return 0.9 * body + 0.35 * click
    if kind == "buzz":
        d = 0.32; t = t_axis(d)
        sq = np.sign(np.sin(2 * np.pi * 110 * t)) + np.sign(np.sin(2 * np.pi * 116.5 * t))
        return 0.18 * lp(sq, 1800) * env_ad(len(t), 0.005, 0.15)
    if kind == "rise":
        d = 0.6; t = t_axis(d)
        f = 300 * (8 ** (t / d))
        tone = np.sin(2 * np.pi * np.cumsum(f) / SR)
        x = (0.25 * tone + 0.8 * sweep_noise(d, 500, 8000, 16)) * (t / d) ** 2
        return 0.35 * x / (np.abs(x).max() + 1e-9)
    if kind == "boom":
        d = 1.6; t = t_axis(d)
        f = 90 * np.exp(-t * 4) + 32
        sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.6)
        air = lp(rng.standard_normal(len(t)), 1200) * np.exp(-t * 5)
        return 0.95 * sub + 0.25 * air
    raise ValueError(kind)


# ───────────── Música (Am – F – C – G, 100 BPM) ─────────────
def music(dur, accents):
    bpm = 100; beat = 60 / bpm
    n = int(dur * SR)
    out = np.zeros(n)
    t = np.arange(n) / SR
    prog = [(57, [57, 60, 64]), (53, [53, 57, 60]), (48, [55, 60, 64]), (55, [55, 59, 62])]  # raíz, acorde
    bar = 4 * beat
    # Pad: sierras desafinadas filtradas, cambio cada 2 compases
    pad = np.zeros(n)
    for ci in range(int(dur / (2 * bar)) + 1):
        root, chord = prog[ci % 4]
        a, b = int(ci * 2 * bar * SR), min(n, int((ci + 1) * 2 * bar * SR) + int(0.3 * SR))
        if a >= n:
            break
        tt = np.arange(b - a) / SR
        seg = np.zeros(b - a)
        for m in chord + [chord[0] + 12]:
            for det in (-0.12, 0.12):
                ph = (midi(m + det) * tt) % 1
                seg += 2 * ph - 1
        e = np.minimum(1, tt / 0.6) * np.minimum(1, (tt[-1] - tt + 1e-3) / 0.3)
        pad[a:b] += seg * e
    pad = lp(pad, 1100, 2) * 0.035
    # Bajo en corcheas
    bass = np.zeros(n)
    eighth = beat / 2
    for k in range(int(dur / eighth)):
        st = k * eighth
        root, _ = prog[int(st / (2 * bar)) % 4]
        a = int(st * SR); L = int(eighth * SR * 0.9)
        if a + L > n:
            break
        tt = np.arange(L) / SR
        f = midi(root - 24)
        bass[a:a + L] += (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt)) * env_ad(L, 0.005, 0.12) * (1 if k % 2 == 0 else 0.7)
    bass *= 0.16
    # Batería suave: bombo en 1 y 3, hi-hat en contratiempo, palmada en 2 y 4
    drums = np.zeros(n)
    kick = sfx("stamp") * 0.0
    kt = t_axis(0.35); kick = np.sin(2 * np.pi * np.cumsum(120 * np.exp(-kt * 30) + 48) / SR) * np.exp(-kt * 10)
    ht = t_axis(0.06); hat = hp(rng.standard_normal(len(ht)), 7000) * np.exp(-ht * 70)
    cl = t_axis(0.18); clap = bp(rng.standard_normal(len(cl)), 900, 3500) * np.exp(-cl * 25)
    for k in range(int(dur / beat) + 1):
        st = k * beat
        for sig, off, g, cond in [(kick, 0, 0.5, k % 2 == 0), (clap, 0, 0.12, k % 2 == 1), (hat, beat / 2, 0.06, True)]:
            if not cond:
                continue
            a = int((st + off) * SR)
            if a + len(sig) < n:
                drums[a:a + len(sig)] += sig * g
    # Arpegio "pluck" en semicorcheas
    arp = np.zeros(n)
    six = beat / 4
    pattern = [0, 1, 2, 3, 2, 1, 2, 3]
    for k in range(int(dur / six)):
        st = k * six
        _, chord = prog[int(st / (2 * bar)) % 4]
        notes = chord + [chord[0] + 12]
        m = notes[pattern[k % 8]] + 12
        a = int(st * SR); L = int(0.25 * SR)
        if a + L > n:
            break
        tt = np.arange(L) / SR
        f = midi(m)
        arp[a:a + L] += (np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(4 * np.pi * f * tt)) * np.exp(-tt * 18)
    arp = lp(arp, 4000) * 0.03
    out = pad + bass + drums * 0.55 + arp
    # Pausa dramática antes de cada acento y fundido final
    gain = np.ones(n)
    for ta in accents:
        a, b = int((ta - 0.45) * SR), int(ta * SR)
        if 0 <= a < b <= n:
            gain[a:b] = np.minimum(gain[a:b], np.linspace(1, 0.25, b - a))
    gain *= np.minimum(1, t / 0.4) * np.minimum(1, (dur - t) / 1.5)
    return out * gain


def main(vdir):
    build = os.path.join(vdir, "build")
    voice = read_wav(os.path.join(build, "voice.wav"))
    cues = json.load(open(os.path.join(build, "cues.json")))
    tl = json.load(open(os.path.join(build, "timeline.json")))
    dur = tl["duration"]
    n = int(dur * SR)
    voice = np.pad(voice, (0, max(0, n - len(voice))))[:n]
    voice = voice / (np.abs(voice).max() + 1e-9) * 0.9
    accents = [c["t"] for c in cues if c["type"] == "boom"]
    mus = music(dur, accents)
    # Ducking: la música baja cuando habla la voz
    envv = np.abs(voice)
    envv = lp(envv, 6, 1)
    envv = envv / (envv.max() + 1e-9)
    duck = 1 - 0.5 * np.clip(envv * 3, 0, 1)
    mus = mus / (np.abs(mus).max() + 1e-9) * 0.30 * duck
    fx = np.zeros(n)
    cache = {}
    for c in cues:
        s = cache.setdefault(c["type"], sfx(c["type"]))
        a = int(c["t"] * SR)
        if a < 0:
            s = s[-a:]; a = 0
        L = min(len(s), n - a)
        if L > 0:
            fx[a:a + L] += s[:L] * c.get("gain", 1) * 0.55
    mix = voice + mus + fx
    # Estéreo con un ligero ensanche en música y efectos
    left = voice + mus * 1.0 + fx * 0.95
    right = voice + np.roll(mus, 240) + np.roll(fx, 120)
    st = np.stack([left, right], axis=1)
    st = st / (np.abs(st).max() + 1e-9) * 0.95
    raw = os.path.join(build, "mix_raw.wav")
    write_wav(raw, st)
    # Normalización de sonoridad para redes (-14 LUFS, -1 dBTP)
    subprocess.check_call(["ffmpeg", "-y", "-v", "error", "-i", raw, "-af", "loudnorm=I=-14:TP=-1.5:LRA=11",
                           "-ar", str(SR), os.path.join(build, "mix.wav")])
    os.remove(raw)
    print("OK →", os.path.join(build, "mix.wav"), f"({len(cues)} efectos)")


if __name__ == "__main__":
    main(sys.argv[1])

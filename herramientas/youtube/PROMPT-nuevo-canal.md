# Prompt para montar la publicación en YouTube de otro canal

Copia el bloque siguiente en una sesión nueva de Claude Code abierta sobre el repositorio del canal. Antes, cambia las tres líneas de «Datos de este canal».

```text
Quiero publicar los vídeos de este repositorio en YouTube de forma directa, con la API oficial, siguiendo el mismo método que ya funciona en mi canal Hispanic Legacy. Hazlo tú de principio a fin y pídeme solo lo que no puedas hacer.

## Datos de este canal
- Nombre corto del canal (en mayúsculas, sin espacios): MICANAL
- Idiomas: español e inglés (un canal de YouTube por idioma)
- Días y horas de publicación (hora de Madrid): lunes, miércoles y viernes; 19:00 en español y 21:00 en inglés

## Qué reutilizar (no lo rehagas)
1. La herramienta está en el repositorio santismm/videos-santismm-com, carpeta herramientas/youtube/ (rama por defecto): youtube.py, youtube_auth.py y README.md. Léete ese README entero antes de empezar: es la guía y manda sobre este prompt en los detalles.
   - Si este repositorio ES santismm/videos-santismm-com, úsala donde está.
   - Si es otro repositorio, copia esos tres archivos a herramientas/youtube/ sin modificarlos (añade el repositorio a la sesión si hace falta). No escribas un script propio.
2. El proyecto de Google Cloud ya existe y sirve para todos mis canales. No hay que crear proyecto, ni habilitar la API, ni tocar la pantalla de consentimiento.
3. Las variables YT_CLIENT_ID y YT_CLIENT_SECRET ya están en el entorno en la nube y son comunes. Compruébalo sin imprimir sus valores.

## Lo único nuevo por canal
- Dos refresh tokens, con estos nombres exactos: YT_REFRESH_TOKEN_MICANAL_ES y YT_REFRESH_TOKEN_MICANAL_EN.
- Un archivo canal.json con el calendario, las horas, las carpetas de los vídeos y los nombres de esas dos variables.

## Pasos
1. Mira cómo están organizados los vídeos de este repositorio (carpeta por idioma, nombre de los archivos de salida, dónde están el título y la descripción) y crea el canal.json que encaje, según el README. Si los textos de publicación no tienen el formato que la herramienta lee, genera un youtube.json en cada carpeta de vídeo con título (máximo 100 caracteres), descripción y etiquetas, sacados de los textos que ya existan. No inventes textos nuevos.
2. Ejecuta --simular y enséñame la lista de lo que se subiría, con título y fecha de cada vídeo.
3. Comprueba si existen las dos variables de token. Si faltan, dame la orden exacta de youtube_auth.py para autorizar los dos canales de una vez desde mi Mac (con el prefijo SSL_CERT_FILE=/etc/ssl/cert.pem y las etiquetas MICANAL_ES y MICANAL_EN), dime los nombres de variable con que debo guardarlas en el entorno, y espera. Recuérdame que las variables solo llegan a una sesión nueva.
4. Con las variables disponibles, ejecuta --verificar y enséñame a qué canal de YouTube apunta cada token. No sigas si alguno apunta a un canal que no toca.
5. Haz UNA subida de prueba en privado (un vídeo, un idioma), léela de vuelta y dame el enlace. Espera mi visto bueno.
6. Cuando te lo dé, programa el resto con --calendario, haz commit de todos los publicado.json y del canal.json, y enséñame la tabla de fechas con enlaces.
7. Si te lo pido después, crea una tarea programada que, tras cada día de publicación, produzca el siguiente vídeo y lo programe. Usa como modelo canales/hispanic-legacy/docs/RUTINA.md del repositorio santismm/videos-santismm-com.

## Reglas
- Nunca imprimas, copies ni guardes en archivos el valor de ninguna credencial. No me pidas que las pegue en el chat.
- Todo se sube como privado con fecha de publicación. Nunca publiques de inmediato ni uses --publico o --forzar sin que yo lo pida expresamente.
- No borres ni modifiques vídeos ya publicados.
- Haz commit de los publicado.json en cuanto existan: sin ellos se duplicarían las subidas.
- Si esta sesión no ve las variables de entorno aunque estén guardadas, no es un error: necesita una sesión nueva. Dímelo en vez de buscar rodeos.
- Avísame de dos cosas que no puedes verificar tú: que nadie ha escuchado los vídeos, y que la marca de «contenido alterado o sintético» hay que confirmarla a mano en YouTube Studio.
```

## Qué te pedirá esa sesión

1. Ejecutar una orden en tu Mac para autorizar los dos canales nuevos (un minuto).
2. Guardar dos variables de entorno.
3. Abrir una sesión nueva y dar el visto bueno a la subida de prueba.

No tendrás que volver a Google Cloud.

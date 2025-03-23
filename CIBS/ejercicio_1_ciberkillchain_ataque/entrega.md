# Ejercicio CiberKillChain - Ataque

## Alumno

Mariángel Díaz Balza

## Sistema víctima

Sistema de ahorro de energía para oficinas usando IA y ESP32. Se utiliza el protocolo MQTT con el broker Mosquitto para recibir mediciones de temperatura, humedad y ocupación. Los datos con los que se nutrirá el sistema además de los mencionados anteriormente incluyen la información de una api de clima.

Se usa la api de OpenAI para recibir mediante json los parámetros y tomar decisiones a través de un prompt customizado, dichas decisiones serán enviadas a través de json a para que reles de 4 voltios modifiquen los parámetros.

A continuación se muestra un diagrama de las distintas capas que conforman la aplicación.

<img src="/CIBS/ejercicio_1_ciberkillchain_ataque/imagenes/diagramaTF.png">

## Objetivo del ataque

Comprometer el sistema de gestión energética, deshabilitar los controles de climatización e iluminación y exigir un rescate para restaurar el servicio.

### <img src="/CIBS/ejercicio_1_ciberkillchain_ataque/imagenes/reconnaissance.png"> Reconnaissance


- Investigo si hay algún ejemplo en alguna documentación pública, algún video en youtube sobre sistemas similares. Busco en internet, en github si se les escapó algo a los creadores de la solución (CWE-200: Exposición de Información Sensible).

- Busco en github u otros lugares de internet credenciales embebidas (CWE-798: Uso de credenciales codificadas).

- Envío correos con archivos adjuntos maliciosos o enlaces a páginas falsas que capturen credenciales de acceso (CWE-601: Redirección de URL a un sitio no confiable ("Redirección abierta")).

- Uso Shodan para identificar servidores MQTT, para determinar la ubicación y direcciones IP de dispositivos (CWE-200: Exposición de Información Sensible).

- Investigo si hay configuraciones expuestas en archivos .env, .json o .yaml (CWE-312: Almacenamiento de información confidencial en texto plano).

Prompt injection



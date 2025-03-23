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

### Reconnaissance





# 🛡️ Cyber Kill Chain – Sabotaje y Extorsión de Sistema de Gestión Energética

## Alumno

Mariángel Díaz Balza <br>
Universidad de Buenos Aires<br>
Especialización en Internet de las Cosas<br>

## Sistema víctima

Sistema de ahorro de energía para oficinas usando IA y ESP32. Se utiliza el protocolo MQTT con el broker Mosquitto para recibir mediciones de temperatura, humedad y ocupación. Los datos con los que se nutrirá el sistema además de los mencionados anteriormente incluyen la información de una api de clima.

Se usa la api de OpenAI para recibir mediante json los parámetros y tomar decisiones a través de un prompt customizado, dichas decisiones serán enviadas a través de json a para que reles de 4 voltios modifiquen los parámetros.

A continuación se muestra un diagrama de las distintas capas que conforman la aplicación.

<img src="/CIBS/ejercicio_1_ciberkillchain_ataque/imagenes/diagramaTF.png">

## Objetivo del ataque

Comprometer el sistema de gestión energética, deshabilitar los controles de climatización e iluminación y exigir un rescate para restaurar el servicio.

### <img src="/CIBS/ejercicio_1_ciberkillchain_ataque/imagenes/reconnaissance.png"> Reconnaissance (Reconocimiento)

🔍 **Objetivo:** Obtener información sobre la infraestructura del sistema, dispositivos IoT, APIs expuestas, credenciales y puntos de acceso.

#### 🔹 Estrategias:

- Investigo si hay algún ejemplo en alguna documentación pública. Busco en internet, en github si se les escapó algo a los creadores de la solución (**CWE-200: Exposición de Información Sensible**).

- Busco si en los comentarios del html expuesto hay información importante (**CWE-615: Inclusión de información confidencial en los comentarios del código fuente**).

- Busco en github o en el código base credenciales embebidas (**CWE-798: Uso de credenciales codificadas**).

- Envío correos con archivos adjuntos maliciosos o enlaces a páginas falsas que capturen credenciales de acceso (**CWE-601: Redirección de URL a un sitio no confiable ("Redirección abierta")**).

- Investigo si hay configuraciones expuestas en archivos .env, .json o .yaml (**CWE-312: Almacenamiento de información confidencial en texto plano**).

- Uso Shodan para identificar servidores MQTT, para determinar la ubicación y direcciones IP de dispositivos (**CWE-829: Inclusión de funcionalidad de una esfera de control no confiable**). Verifico si los dispositivos IoT se conectan a redes sin validación estricta.

- Intento suscribirme a tópicos MQTT sin autenticación con **mosquitto_sub** para escuchar tráfico en la red (**CWE-923: Restricción inadecuada del canal de comunicación a los puntos finales previstos**).

- 

<img src="/ejercicio_1_ciberkillchain_ataque/imagenes/suscripcion_topics.png">

### Weaponization (Preparación del Ataque)

🛠 **Objetivo:** Crear exploits, malware y técnicas de persistencia antes de la entrega.

#### 🔹 Estrategias:

- Creo un **firmware malicioso para ESP32** (**CWE-494: Descarga de código sin verificación de integridad**).

Prompt injection



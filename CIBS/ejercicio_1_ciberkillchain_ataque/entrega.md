# 💥 Cyber Kill Chain – Sabotaje y Extorsión de Sistema de Gestión Energética

## Alumno

<span style="color: blue;">Mariángel Díaz Balza</span><br>
<span style="color: blue;">Universidad de Buenos Aires</span><br>
<span style="color: blue;">Especialización en Internet de las Cosas</span><br>

## Sistema víctima

Sistema de ahorro de energía para oficinas usando IA y ESP32. Se utiliza el protocolo MQTT con el broker Mosquitto para recibir mediciones de temperatura, humedad y ocupación. Los datos con los que se nutrirá el sistema además de los mencionados anteriormente incluyen la información de una API de clima.

Se usa la API de OpenAI para recibir mediante json los parámetros y tomar decisiones a través de un prompt customizado, dichas decisiones serán enviadas a través de json a para que reles de 4 voltios modifiquen los parámetros.

A continuación se muestra un diagrama de las distintas capas que conforman la aplicación.

<img src="/CIBS/ejercicio_1_ciberkillchain_ataque/imagenes/diagramaTF.png">

## Objetivo del ataque

Comprometer el sistema de gestión energética, deshabilitar los controles de climatización e iluminación y exigir un rescate para restaurar el servicio.

## 1️⃣ Reconnaissance (Reconocimiento)

🔍 **Objetivo:** Obtener información sobre la infraestructura del sistema, dispositivos IoT, APIs expuestas, credenciales y puntos de acceso.

### 🔹 Estrategias:

- Busco en **GitHub, GitLab, Bitbucket** credenciales y configuraciones expuestas, si un programador olvidó borrar su clave de acceso, yo podría usarla.(**CWE-200: Exposición de Información Sensible**).

- Busco información importante en el html del front (**CWE-615: Inclusión de información confidencial en los comentarios del código fuente**).

- Busco en github o en el código base credenciales embebidas (**CWE-798: Uso de credenciales codificadas**).

- Envío correos con archivos adjuntos maliciosos o enlaces a páginas falsas que capturen credenciales de acceso (**CWE-601: Redirección de URL a un sitio no confiable ("Redirección abierta")**).

- Investigo y consigo configuraciones expuestas en archivos .json (**CWE-312: Almacenamiento de información confidencial en texto plano**). 

- Uso Shodan (es un buscador para encontrar dispositivos conectados a Internet) para identificar servidores MQTT, para determinar la ubicación y direcciones IP de dispositivos (**CWE-829: Inclusión de funcionalidad de una esfera de control no confiable**). Verifico si los dispositivos IoT se conectan a redes sin validación estricta.<br><br>

    shodan search "port:1883 MQTT"  <br>
    shodan search "title:'Open MQTT Broker'"  <br><br>

- Intento suscribirme a tópicos MQTT sin autenticación con **mosquitto_sub** para escuchar tráfico en la red (espiar mensajes entre dispositivos IoT) (**CWE-923: Restricción inadecuada del canal de comunicación a los puntos finales previstos**).<br>

    mosquitto_sub -h broker.mqtt.com -t "#" <br>

## 2️⃣ Weaponization (Preparación del Ataque)

🛠 **Objetivo:** Crear exploits, malware y técnicas de persistencia antes de la entrega.

### 🔹 Estrategias:

- Creo un **firmware malicioso para ESP32** (**CWE-494: Descarga de código sin verificación de integridad**).

- Diseño un ransomware que cifre archivos del backend y bloquee configuraciones. Con este ransomware bloquearía el acceso al sistema hasta que paguen un rescate.

- Inyecto comandos en la API (**CWE-77: Neutralización incorrecta de elementos especiales utilizados en un comando ('Inyección de comando')**)

## **3️⃣ Delivery (Entrega del Ataque)**

📩 **Objetivo:** Introducir el malware en la red de la víctima. 

### 🔹 Estrategias:

- Capturo tráfico con **Wireshark** para robar credenciales. (**CWE-319: Transmisión de información confidencial en texto claro**)

- Configuro una red Wi-Fi falsa para engañar a los dispositivos para que se conecten y robar información para interceptar tráfico (**CWE-346: Error de validación de origen**).

- Subo el firmware malicioso mediante la API vulnerable (**CWE-89: Inyección de SQL**)

- Distribuyo archivos PDF infectados a los e-mails de los administradores y pican el anzuelo, entran en una página falsa que creé (**CWE-601: Redirección de URL a un sitio no confiable ("Redirección abierta")**).

- Hago una inyección de prompt para que la IA tome decisiones incorrectas.


## 4️⃣ Exploitation (Ejecución del Ataque)  

💥 **Objetivo:** Aprovechar vulnerabilidades para comprometer el sistema.  

### 🔹 Estrategias:

- Ejecuto el ramsonware y cifro archivos críticos del backend (**CWE-922: Almacenamiento inseguro de información confidencial**).

- Elimino los respaldos accesibles desde el sistema.

- Manipulo los sensores y actuadores a través de comandos falsos y altero la base de datos para ocultar mi actividad.  

- Sobrecargo el tráfico MQTT con mensajes falsos, mando muchos mensajes basura para bloquear el sistema.

## 5️⃣ Installation (Persistencia en el Sistema)  

🔗 **Objetivo:** Asegurar acceso continuo y evitar detección.  

### 🔹 Estrategias:

- Para mantener saboteados los dispositivos bloqueo la posibilidad de actualizaciones, así evito que puedan impedir que puedan instalar una versión limpia del sistema.

- Cambio las credenciales de administración para evitar recuperación.

- Armo un código alternativo para mantener la manipulación del sistema (**CWE-912: Funcionalidad oculta**).

## 6️⃣ Command & Control (C2 – Gestión Remota del Ataque)  
🎮 **Objetivo:** Controlar el sistema comprometido de manera remota.  

### 🔹 Estrategias:

- Implemento un **DNS Tunneling** para mantener comunicación encubierta (**CWE-912: Funcionalidad oculta**) 

- Capturo eventos en el backend que indiquen intentos de mitigación.  

- Implemento mecanismos de auto-reinstalación en caso de detección.  


## 7️⃣ Actions on Objectives (Extorsión y Sabotaje)  
💰 **Objetivo:** Conseguir el pago del rescate y demostrar el control sobre el sistema.  

### 🔹 Estrategias:

- **Secuestro del Sistema**

  - Bloqueo  la climatización e iluminación.  
  - Envío mensaje a la interfaz de usuario indicando que el sistema está comprometido.  

- **Prueba de Control**
  - Le demuestro al dueño que tengo el control apagando y encendiendo luces o aire acondicionado.

- **Extorsión Financiera**
  - Exijo un pago en **Bitcoin** para restaurar el sistema.  
  - Amenazo con borrar todo en caso de no recibir respuesta.  



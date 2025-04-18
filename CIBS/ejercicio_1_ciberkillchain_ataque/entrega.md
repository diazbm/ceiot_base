# 💥 Cyber Kill Chain – Sabotaje y Extorsión de Sistema de Gestión Energética

## Alumno

👤 **Mariángel Díaz Balza**<br>
🏫 **Universidad de Buenos Aires**<br>
📲 **Especialización en Internet de las Cosas**<br>

## Sistema víctima

Sistema de ahorro de energía para oficinas usando IA y ESP32. Se utiliza el protocolo MQTT con el broker Mosquitto para recibir mediciones de temperatura, humedad y ocupación. Los datos con los que se nutrirá el sistema además de los mencionados anteriormente incluyen la información de una API de clima.

Se usa la API de OpenAI para recibir mediante json los parámetros y tomar decisiones a través de un prompt customizado, dichas decisiones serán enviadas a través de json a para que reles de 4 voltios modifiquen los parámetros.

A continuación se muestra un diagrama de las distintas capas que conforman la aplicación.

<img src="/CIBS/ejercicio_1_ciberkillchain_ataque/imagenes/diagramaTF.png">

## Objetivo del ataque

Comprometer el sistema de gestión energética, deshabilitar los controles de climatización e iluminación y exigir un rescate para restaurar el servicio.

## 1️⃣ Reconnaissance (Reconocimiento)

🔍 **Objetivo:** obtener información sobre la infraestructura del sistema, dispositivos IoT, APIs expuestas, credenciales y puntos de acceso.

### 🔹 Estrategias:

- Busco en repositorios públicos como **GitHub, GitLab y Bitbucket** para identificar credenciales y configuraciones expuestas. Se descubren sobre una API: endpoints, claves y parámetros críticos que permiten acceder a componentes sensibles del sistema. (**CWE-200: Exposición de Información Sensible**).

- Analizo el código fuente del front-end, detectando metadatos y comentarios en el HTML que revelan información confidencial (**CWE-615: Inclusión de información confidencial en los comentarios del código fuente**).

- Uso Shodan (es un buscador para encontrar dispositivos conectados a Internet) para identificar servidores MQTT, para determinar la ubicación y direcciones IP de dispositivos (**CWE-829: Inclusión de funcionalidad de una esfera de control no confiable**). Detecto fallos en la sanitización y validación de entradas.

### ¿Qué tengo?

**Capa física y de transporte**

- Nombres de los endpoints y tokens para poder ejecutarlos.
- Direcciones para consumir servidores MQTT.
- Fallos en la santización de los campos que se mandan por MQTT (parámetros vulnerables para poder ejecutar SSRF)


**Capa aplicativa**
 - Credenciales que me robé de github.
 - Información confindencial en el HTML, por ejemplo nombres de los roles, cantidad de roles y sus permisos.
 - HTML vulnerable que renderiza código que recibe desde el backend.
 - También detecto los nombres de las entidades que se mapean en el frontend, (devices, measurments, buildings, recommendations, LLM models, etc).
 - Mediante intercepción del tráfico del frontend descubro los emails de los usuarios logueados.


## 2️⃣ Weaponization (Preparación del Ataque)

🛠 **Objetivo:** peparar las herramientas del ataque aprovechando las vulnerabilidades encontradas.

### 🔹 Estrategias:

**Capa física y de transporte**

- Creo un firmware malicioso para ser instalado en los ESP32, es casi idéntico al que descubrí robando el código fuente, solo que lo suscribo a otro tópico que no es el productivo, construyo un respaldo que se va a quedar guardado en la memoria del dispositivo pero solo se instalará en caso de emergencia.

- Desarrollo un endpoint GET que provee de un binary code con el instalable de mi firwmware malicioso.

- Desarrollo una API Para suscribirme a las novedades de mi servidor MQTT para poder ejecutar y monitorear mi ataque.

- Creo un servidor MQTT clon del produtivo (mismo nombre) pero alojado en mi dominio (muy parecido al dominio productivo) con los mismos nombres de los tópicos y parámetros.

- Creo un script para automatizar tareas de climatización durante las etapas preliminares del ataque, consumiendo los parámetros reales que el backend víctima postea sobre MQTT.

**Capa aplicativa**  

- Armo un email de phising para enviar a los administradores del sistema.

- Creo un malware para conectarse a los servidores del sistema de forma remota desde las computadoras de los admins.

- Desarrollo un ransomware para instalar en el servidor backend y cifrar todos los datos.


## **3️⃣ Delivery (Entrega del Ataque)**

📩 **Objetivo:** introducir de forma oculta los componentes maliciosos en la red de la víctima. 

### 🔹 Estrategias:

**Capa física y de transporte**

- Por medio de requests maliciosas al  servidor MQTT real logro ejecutar un GET desde el ESP32 para descargar el firmware (Solo afecta a los ESP32 que reciben peticiones para el actuador)

- Con el firmware guardado en el dispositivo y utilizando estrategias de OTA (Over the air) ejecuto una instalación remota del firmware vulnerado, (Puedo ejecutar comandos remotamente inyectando requests en el servidor MQTT productivo)

**Capa aplicativa** 

- Una vez que alguno de los administradores acceda a los links maliciosos del email de phishing, automáticamente el malware se instalará en su computadora y establecerá una conexión oculta con el servidor productivo.

- Desde el malware se ejecuta un comando CURL GET en el servidor productivo para descargarse el ransomware.


## 4️⃣ Exploitation (Ejecución del Ataque)  

💥 **Objetivo:** aprovechar vulnerabilidades para comprometer el sistema.  

### 🔹 Estrategias:

**Capa física y de transporte**

- Desde postman y conectado al servidor MQTT fake posteo mensajes para ejecutar acciones en los ESP32 de forma sutil, moniteo que los cambios hayan sido efectivos mirando los mensajes que llegan en el tópico productivo (encender luces, cambiar la temperatura, etc).

**Capa aplicativa** 

- De forma automática ejecuto dentro del servidor la instalación del ransomware que dejará todo funcionando igual solo que estará cifrado.
 
- Desde el ransomware creo una nueva cuenta en el servidor y la expongo para poderme conectar con un tunel DNS.


## 5️⃣ Installation (Persistencia en el Sistema)  

🔗 **Objetivo:** Asegurar acceso continuo y evitar detección.  

### 🔹 Estrategias:

**Capa física y de transporte**

- Me aseguro de tener un comando dentro del dispositivo para que ante un trigger de flasheo del dispositivo instale el firmware alternativo que dejé guardado en memoria.

**Capa aplicativa** 

- Me aseguro que el malware no sea detectado dentro de la computadora del usuario administrador ejecutando al ataque cuando la pantalla esté bloqueada (el usuario no está usando la máquina)


## 6️⃣ Command & Control (C2 – Gestión Remota del Ataque)  
🎮 **Objetivo:** se mantiene el control remoto del sistema, incluso si la víctima intenta desconectarse de la red. 

### 🔹 Estrategias:

**Capa física y de transporte**

- Dentro del firmware malicioso dejo varios triggers para reestablecer la conexión a internet en caso de perderla usando otras redes wifi públicas que detecté en el edificio.

- Mediante reportes periódicos del firmaware monitoreo el ataque.

**Capa aplicativa** 

- Me conecto periódicamente a través del tunel DNS para controlar y monitorear el ataque. (CWE-912: Funcionalidad oculta)


## 7️⃣ Actions on Objectives (Extorsión y Sabotaje)  
💰 **Objetivo:** demostrar control sobre el sistema y conseguir el pago del rescate.

### 🔹 Estrategias:

- **Secuestro del Sistema**

  - Envío mensaje a la interfaz de usuario indicando que el sistema está comprometido.  

- **Prueba de Control**
  - Le demuestro al dueño que tengo el control apagando y encendiendo luces o aire acondicionado.

- **Extorsión Financiera y aprovechamiento**
  - Exijo un pago en **Bitcoin** para restaurar el sistema.  
  - Amenazo con borrar todo en caso de no recibir respuesta.  
  - Me quedo con las credenciales de acceso de openAI que son del usuario, sobre este tema no le comento nada ya que le sacaré provecho de otra manera.


## **Diagrama de la ciber kill chain (modo ataque)**

<img src="/CIBS/ejercicio_1_ciberkillchain_ataque/imagenes/Ataque.png">



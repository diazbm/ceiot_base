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

🔍 **Objetivo:** Obtener información sobre la infraestructura del sistema, dispositivos IoT, APIs expuestas, credenciales y puntos de acceso.

### 🔹 Estrategias:

- Busco en repositorios públicos como **GitHub, GitLab y Bitbucket** para identificar credenciales y configuraciones expuestas. Se descubren sobre una API: endpoints, claves y parámetros críticos que permiten acceder a componentes sensibles del sistema. (**CWE-200: Exposición de Información Sensible**).

- Analizo el código fuente del front-end, detectando metadatos y comentarios en el HTML que revelan información confidencial (**CWE-615: Inclusión de información confidencial en los comentarios del código fuente**).

- Uso Shodan (es un buscador para encontrar dispositivos conectados a Internet) para identificar servidores MQTT, para determinar la ubicación y direcciones IP de dispositivos (**CWE-829: Inclusión de funcionalidad de una esfera de control no confiable**). Detecto fallos en la sanitización y validación de entradas.


## 2️⃣ Weaponization (Preparación del Ataque)

🛠 **Objetivo:** Peparar las herramientas del ataque aprovechando las vulnerabilidades encontradas.

### 🔹 Estrategias:

- **Desarrollo de firmware malicioso para ESP32:**  

- Creo un firmware alterado que ignora la verificación de integridad, permitiendo la descarga y ejecución de código arbitrario en el dispositivo (**CWE-494: Descarga de código sin verificación de integridad**).

- Incorporo un payload oculto activable de forma remota para ampliar el control del dispositivo.

- **Inyección de comandos en la API:**  

- Desarrollo un método para inyectar comandos manipulados en la API, aprovechando la deficiente neutralización de caracteres especiales y permitiendo la ejecución de órdenes no autorizadas en el backend (**CWE-77: Neutralización incorrecta de elementos especiales utilizados en un comando ('Inyección de comando')**).

- **Diseño de un ransomware especializado:**  

- Programo un ransomware que, una vez insertado, cifre archivos críticos del sistema y bloquee el acceso.


## **3️⃣ Delivery (Entrega del Ataque)**

📩 **Objetivo:** Introducir de forma oculta los componentes maliciosos en la red de la víctima. 

### 🔹 Estrategias:

- Capturo tráfico con **Wireshark** para interceptar comunicaciones y robar credenciales en texto claro. (**CWE-319: Transmisión de información confidencial en texto claro**)

- Configuro una red Wi-Fi falsa para engañar a los dispositivos IoT y facilitar la inserción del firmware malicioso, aprovechando vulnerabilidades en la validación de redes (**CWE-346: Error de validación de origen**).

- Subo el firmware malicioso a través de la API vulnerable y se envían correos electrónicos con archivos infectados a administradores, utilizando técnicas de redirección a páginas falsas (**CWE-601: Redirección de URL a un sitio no confiable ("Redirección abierta")**).

- Inyecto comandos en el prompt de la API de OpenAI para modificar las decisiones automatizadas en favor del ataque.


## 4️⃣ Exploitation (Ejecución del Ataque)  

💥 **Objetivo:** Aprovechar vulnerabilidades para comprometer el sistema.  

### 🔹 Estrategias:

- Ejecuto el ramsonware y cifro archivos críticos del backend (**CWE-922: Almacenamiento inseguro de información confidencial**).

- Elimino o manipulo los respaldos no protegidos, dificultando la recuperación del sistema.

- Envío comandos falsos y altero la base de datos para ocultar mi actividad.  

- Sobrecargo el tráfico MQTT con mensajes falsos, mando muchos mensajes basura para bloquear el sistema.

## 5️⃣ Installation (Persistencia en el Sistema)  

🔗 **Objetivo:** Asegurar acceso continuo y evitar detección.  

### 🔹 Estrategias:

- Para mantener saboteados los dispositivos bloqueo la posibilidad de actualizaciones, así evito que puedan impedir que puedan instalar una versión limpia del sistema.

- Cambio las credenciales de administración para evitar recuperación.

- Armo un código alternativo para mantener la manipulación del sistema (**CWE-912: Funcionalidad oculta**).

## 6️⃣ Command & Control (C2 – Gestión Remota del Ataque)  
🎮 **Objetivo:** Se mantiene el control remoto del sistema, incluso si la víctima intenta desconectarse de la red. 

### 🔹 Estrategias:

- Implemento un **DNS Tunneling** lo que permite el intercambio de comandos e información a través de solicitudes DNS, evadiendo los sistemas de monitoreo. (**CWE-912: Funcionalidad oculta**) 

- Se prevé que la víctima podría desconectarse de la red como medida de mitigación, por lo que se configuran mecanismos para que el malware restablezca automáticamente la conexión al detectarse la reconexión. 

- Implemento reportes periódicos del estado del sistema y mecanismos de auto-reinstalación que reimplantan el malware si son eliminados.


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



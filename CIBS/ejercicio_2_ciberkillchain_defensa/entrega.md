# 💥 Cyber Kill Chain Defensiva – Defensa para el Sistema de Gestión Energética

## Alumno

👤 **Mariángel Díaz Balza**<br>
🏫 **Universidad de Buenos Aires**<br>
📲 **Especialización en Internet de las Cosas**<br>


## Enunciado

Desarrollar la defensa en función del ataque planteado en orden inverso, mencionar una medida de detección y una de mitigación, sólo lo más importante, considerar recursos limitados. No es una respuesta a un incidente, hay que detectar el ataque independientemente de la etapa.


## Resolución

## 7️⃣ Actions on Objectives (Extorsión y Sabotaje)

- **Medida de Detección:** tengo monitores en DataDog y NewRelic sobre todo el sistema que me permiten detectar anomalías en tiempos de respuesta y desviaciones en el tráfico.

- **Medida de Mitigación:** al detectar vulnerabilidades en el sistema y corroborar la explotación de alguna de ellas, aviso a mis clientes que sus sistemas de gestión de energía pasan a modo manual y desde mi consola de AWS hago un shut down del servidor EC2 y MQTT (saco a los clientes del medio) y recupero los ESP32 para analizarlos.


## 6️⃣ Command & Control (C2 – Gestión Remota del Ataque)

- **Medida de Detección:** **D3 - RTSD – Detección de sesión de terminal remota.** Monitoreo activo de patrones de sesión que me alertan cuando hay conexiones remotas no autorizadas en mi servidor.

- **Medida de Mitigación:** firewalls en el servidor que cortan las conexiones sospechosas, solo tengo habilitada una whitelist de direcciones IP desde las que me puedo conectar al servidor. 

## 5️⃣ Installation (Persistencia en el Sistema)

- **Medida de Detección:** **D3 – Monitoreo de la integridad de los archivos** y ante algún cambio disparo una alerta. 

- **Medida de Mitigación:** **M1033 - Limitar la instalación de software.** Dentro de mis sistemas (esp32, backend y frontend) implemento una restricción de origenes para poder ejecutar comandos GET o de instalación de software. 


## 4️⃣ Exploitation (Ejecución del Ataque)

- **Medida de Detección:** implemento alertas ante anomalías entre mediciones y actuaciones, utilizo la base de datos con históricos y tambien comparo contra curvas de semana anterior de mediciones para levantar anomalías.

- **Medida de Mitigación:** ante anomalías en las mediciones los sistemas alertan y después de un análisis se pasan a modo manual y se aislan.


## 3️⃣ Delivery (Entrega del Ataque)

- **Medida de Detección:** para evitar intrusiones configuro alertas que se disparen ante intentos de violación de la política de restricción de orígenes para la instalación de software en todas las capas.

- **Medida de Mitigación:** **M1017 – Capacitación de usuarios.** Ya que los sistemas no pueden instalar software de origenes no autorizados, capacito a mis colaboradores contra phishing y además en esta capacitación les pido que se instalen y configuren crowdstrike falcon.


## 2️⃣ Weaponization (Preparación del Ataque)

- **Medida de Detección:** **D3 – Análisis del contenido de archivos.** Monitoreo continuo del tráfico del servidor MQTT.

- **Medida de Mitigación:** tener toda la capa de transporte y comunicación segurizada con SSL y enviar los datos hasheados.


## 1️⃣ Reconnaissance (Reconocimiento)

- **Medida de Detección:** **D3 – Análisis del contenido de archivos.** Mediante un pipeline automatizado en GitHub se hace un análisis de código estático de todo el sourcecode cada vez que se quiere incorporar un nuevo feature o fix, si se detecta alguna vulnerabilidad no se permite mergear el código.

- **Medida de Mitigación:** **Código:** **M1056 – Pre-compromiso.** Dificultar el reconocimiento o el desarrollo de recursos por parte del adversario. Limitar la información expuesta públicamente y la superficie visible al atacante usando técnicas de obfuscado en el frontend, uso de server-side rendering, evitar usar local storage, implementar token csrf en todas las llamadas del cliente al servidor.

## Diagrama de la defensa

<img src="https://github.com/user-attachments/assets/ffd120b1-6913-4719-a35c-cbf19918ed05" />


# 💥 Cyber Kill Chain Defensiva – Defensa para el Sistema de Gestión Energética

## Objetivo de la Defensa

Se busca detectar de manera proactiva actividades maliciosas en cualquier fase del ataque y aplicar medidas básicas de mitigación adaptadas a recursos limitados. A continuación se detallan, en orden inverso al ataque, las medidas defensivas integradas con sus correspondientes códigos de MITRE ATT&CK tanto para **detección** como para **mitigación**.

---

## 7️⃣ Actions on Objectives (Extorsión y Sabotaje)

- **Medida de Detección:**
  - **Código:** **D3 – Análisis de transferencia de datos de usuario**  https://d3fend.mitre.org/technique/d3f:UserDataTransferAnalysis/
    **Descripción:** se implementa la monitorización continua en busca de comportamientos inusuales en activos críticos, por ejemplo, cambios súbitos en los parámetros de climatización e iluminación.  
    *(Basado en técnicas de detección de anomalías que permiten identificar desviaciones en el comportamiento esperado del sistema.)*

- **Medida de Mitigación:**
  - **Código:** **M1053 – Copia de seguridad de datos**  https://attack.mitre.org/mitigations/M1053/#:~:text=Take%20and%20store%20data%20backups,corporate%20network%20to%20prevent%20compromise 
    **Descripción:** se establecen y refuerzan políticas de respaldo de datos y configuraciones. Esta medida limita el impacto de la alteración o extorsión al asegurar la posibilidad de restaurar el sistema a un estado legítimo.  
    *(Medida que ayuda a minimizar el daño ante extorsión o sabotaje.)*

---

## 6️⃣ Command & Control (C2 – Gestión Remota del Ataque)

- **Medida de Detección:**
  - **Código:** **D3 - RTSD – Detección de sesión de terminal remota**  
    **Descripción:** se analiza el tráfico DNS y otros protocolos para detectar patrones anómalos, como DNS Tunneling, que pueden indicar la existencia de canales C2 encubiertos.  
    *(Técnica utilizada para identificar comunicaciones remotas maliciosas.)*

- **Medida de Mitigación:**
  - **Código:** **M1037 – Filtrar el tráfico de red**  https://attack.mitre.org/mitigations/M1037/#:~:text=Filter%20Network%20Traffic
    **Descripción:** se implementan filtros en firewalls y dispositivos perimetrales para bloquear tráfico hacia dominios e IPs sospechosos, interrumpiendo comunicaciones de control remoto.  
    *(Mitigación orientada a interrumpir la comunicación no autorizada.)*

---

## 5️⃣ Installation (Persistencia en el Sistema)

- **Medida de Detección:**
  - **Código:** **D3 – Monitoreo de la integridad de los archivos (FIM)**  https://misp-galaxy.org/mitre-d3fend/#:~:text=File%20Integrity%20Monitoring
    **Descripción:** se emplean soluciones que monitorizan los cambios en archivos y configuraciones críticas, permitiendo detectar modificaciones inesperadas que indiquen la instalación de componentes maliciosos.  
    *(Detección de alteraciones en la integridad de los archivos del sistema.)*

- **Medida de Mitigación:**
  - **Código:** **M1033 - Limitar la instalación de software**  https://attack.mitre.org/mitigations/M1033/#:~:text=Block%20users%20or%20groups%20from,installing%20unapproved%20software
    **Descripción:** bloquear que usuarios o grupos instalen software no aprobado. Restringiendo la instalación a aplicaciones de confianza, se dificulta que el adversario agregue herramientas de persistencia en los sistemas.

---

## 4️⃣ Exploitation (Ejecución del Ataque)

- **Medida de Detección:**
  - **Código:** **D3 – MBT - Seguimiento de límites de memoria**  https://misp-galaxy.org/mitre-d3fend/#:~:text=Memory%20Boundary%20Tracking
    **Descripción:** analiza la pila de llamadas (call stack) para identificar direcciones de retorno que apunten a ubicaciones de memoria inesperadas​, lo cual ayuda a detectar exploits de desbordamiento de memoria u otras técnicas de explotación en tiempo de ejecución.

- **Medida de Mitigación:**
  - **Código:** **M1050 - Protección contra exploits**  https://attack.mitre.org/mitigations/M1050/#:~:text=Exploit%20Protection
    **Descripción:** usar capacidades de protección que detecten y bloqueen condiciones indicativas de que se está intentando explotar una vulnerabilidad de software​. 

---

## 3️⃣ Delivery (Entrega del Ataque)

- **Medida de Detección:**
  - **Código:** **D3 – SRA - Análisis de la reputación del remitente**  https://misp-galaxy.org/mitre-d3fend/#:~:text=Sender%20Reputation%20Analysis
    **Descripción:** determina la reputación del remitente basándose en la información asociada a un mensaje (por ejemplo, un correo electrónico)​. Esto ayuda a identificar emails de phishing u otros vectores de entrega maliciosos mediante la evaluación de si el origen es confiable.

- **Medida de Mitigación:**
  - **Código:** **M1017 – Capacitación de usuarios**  https://attack.mitre.org/mitigations/M1017/#:~:text=Train%20users%20to%20be%20aware,techniques%20that%20involve%20user%20interaction
    **Descripción:** capacitar a los usuarios para que estén conscientes de intentos de acceso o manipulación por parte de un adversario, reduciendo el riesgo de éxito de spearphishing, ingeniería social u otras técnicas que dependen de la interacción del usuario​

---

## 2️⃣ Weaponization (Preparación del Ataque)

- **Medida de Detección:**
  - **Código:** **D3 – Análisis del contenido de archivos**  https://misp-galaxy.org/mitre-d3fend/#:~:text=File%20Content%20Analysis
    **Descripción:** se analiza el contenido de archivos (p.ej., firmware, scripts y payloads) en busca de firmas o indicadores asociados a código malicioso, permitiendo detectar intentos de preparar componentes armados.  
    *(Detección preventiva para identificar weaponization mediante análisis estático.)*

- **Medida de Mitigación:**
  - **Código:** **M1049 – Antivirus/Antimalware**  https://attack.mitre.org/mitigations/M1049/#:~:text=Antivirus%2FAntimalware
    **Descripción:** utilizar software antimalware para buscar mediante firmas o heurísticas la presencia de software malicioso. Las soluciones antivirus pueden detectar y poner en cuarentena archivos sospechosos automáticamente, impidiendo que malware ya preparado (weaponized) se ejecute en el sistema.

---

## 1️⃣ Reconnaissance (Reconocimiento)

- **Medida de Detección:**
  - **Código:** **D3 - ISVA – Análisis del volumen de sesiones entrantes**  
    **Descripción:** analiza el volumen de sesiones de red o intentos de conexión entrantes. Un número o frecuencia inusual de intentos de conexión hacia sistemas internos puede delatar actividades de reconocimiento (escaneo de puertos, enumeración de servicios) realizadas por un adversario.

- **Medida de Mitigación:**
  - **Código:** **M1056 – Pre-compromiso**  https://attack.mitre.org/mitigations/M1056/#:~:text=This%20category%20is%20used%20for,Reconnaissance%20and%20Resource%20Development%20techniques
    **Descripción:** categoría de mitigaciones aplicables antes de que el adversario logre acceso inicial. Cubre medidas previas al compromiso, por ejemplo las orientadas a dificultar el reconocimiento o el desarrollo de recursos por parte del adversario. (En la práctica, esto incluye prácticas de OPSEC como limitar la información expuesta públicamente y la superficie visible al atacante, ya que estas técnicas previas ocurren fuera del alcance directo de los controles empresariales).
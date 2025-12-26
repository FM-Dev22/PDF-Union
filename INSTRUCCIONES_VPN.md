# 🌐 Cómo compartir PeDeFinador 3000 en tu VPN

## Guía completa para hostear la aplicación en red local/VPN

### 📍 Ubicación de archivos
Los archivos están en: `C:\Users\francisco.vega\Documents\Projects\PeDiFicador_3000`

**Nota**: Cambia esta ruta por la ubicación real de tus archivos.

---

## 🚀 Métodos para compartir en VPN

### Método 1: Servidor HTTP con Python (Recomendado)

#### Paso 1: Navegar al directorio
```cmd
cd "C:\Users\francisco.vega\Documents\Projects\PeDiFicador_3000"
```

#### Paso 2: Iniciar servidor HTTP
```cmd
# Con Python 3 (recomendado)
python -m http.server 8080

# O con Python 2 (si no tienes Python 3)
python -m SimpleHTTPServer 8080
```

#### Paso 3: Obtener tu IP local
```cmd
ipconfig
```
Busca tu dirección IP en la sección "Adaptador de Ethernet" o "Adaptador de LAN inalámbrica"

#### Paso 4: Compartir la URL
- **Tu acceso local**: `http://localhost:8080`
- **Acceso desde VPN**: `http://TU_IP_LOCAL:8080`
- Ejemplo: `http://192.168.1.100:8080`

---

### Método 2: Servidor HTTP con Node.js

#### Paso 1: Instalar servidor HTTP global
```cmd
npm install -g http-server
```

#### Paso 2: Navegar al directorio y ejecutar
```cmd
cd "C:\Users\francisco.vega\Documents\Projects\PeDiFicador_3000"
http-server -p 8080 -a 0.0.0.0
```

#### Paso 3: Acceder desde VPN
- URL: `http://TU_IP_LOCAL:8080`

---

### Método 3: Servidor con PHP

#### Paso 1: Navegar al directorio
```cmd
cd "C:\Users\francisco.vega\Documents\Projects\PeDiFicador_3000"
```

#### Paso 2: Iniciar servidor PHP
```cmd
php -S 0.0.0.0:8080
```

#### Paso 3: Acceder desde VPN
- URL: `http://TU_IP_LOCAL:8080`

---

### Método 4: Usando Live Server (Visual Studio Code)

#### Paso 1: Instalar extensión
- Instala "Live Server" en VS Code

#### Paso 2: Configurar para acceso externo
1. Abre VS Code en la carpeta del proyecto
2. Ve a Configuración (Ctrl + ,)
3. Busca "Live Server"
4. Configura:
   - **Host**: `0.0.0.0`
   - **Port**: `8080`

#### Paso 3: Iniciar Live Server
- Clic derecho en `index.html` → "Open with Live Server"

---

## 🔧 Configuración del Firewall de Windows

Para que otros usuarios en tu VPN puedan acceder, necesitas permitir el tráfico en el puerto:

### Método rápido (PowerShell como Administrador):
```powershell
New-NetFirewallRule -DisplayName "PeDeFinador 3000" -Direction Inbound -Protocol TCP -LocalPort 8080 -Action Allow
```

### Método manual:
1. Abre "Windows Defender Firewall"
2. Clic en "Configuración avanzada"
3. Clic en "Reglas de entrada" → "Nueva regla"
4. Selecciona "Puerto" → "TCP" → "Puertos locales específicos" → "8080"
5. Selecciona "Permitir la conexión"
6. Aplica a todos los perfiles
7. Nombra la regla "PeDeFinador 3000"

---

## 📱 Cómo acceder desde otros dispositivos

### Para usuarios en tu VPN:

1. **Obtén tu IP local**:
   ```cmd
   ipconfig
   ```

2. **Comparte la URL**:
   - Formato: `http://TU_IP_LOCAL:8080`
   - Ejemplo: `http://192.168.1.100:8080`

3. **Los usuarios abren la URL en su navegador**:
   - Chrome, Firefox, Safari, Edge
   - Funciona en PC, Mac, móviles, tablets

---

## 🔍 Solución de problemas

### Error: "No se puede acceder al sitio"
- ✅ Verifica que el servidor esté ejecutándose
- ✅ Confirma que el firewall permita el puerto 8080
- ✅ Asegúrate de usar la IP correcta
- ✅ Verifica que ambos dispositivos estén en la misma VPN

### Error: "Conexión rechazada"
- ✅ Revisa que el puerto no esté siendo usado por otra aplicación
- ✅ Intenta con otro puerto (ej: 8081, 3000, 5000)
- ✅ Ejecuta el comando como administrador

### La aplicación no funciona correctamente
- ✅ Verifica que todos los archivos estén en la carpeta
- ✅ Asegúrate de que JavaScript esté habilitado
- ✅ Intenta en modo incógnito del navegador

---

## 🎯 Recomendaciones

### Para mejor rendimiento:
- **Puerto recomendado**: 8080 (fácil de recordar)
- **Método recomendado**: Python HTTP server (más estable)
- **Navegadores**: Chrome o Firefox (mejor compatibilidad)

### Para seguridad:
- Solo comparte la URL con usuarios de confianza
- El servidor solo funciona mientras esté ejecutándose
- Los archivos se procesan localmente en cada navegador

### Para facilidad de uso:
- Crea un archivo `.bat` para iniciar el servidor automáticamente
- Comparte un enlace directo con la IP ya configurada
- Considera usar un nombre de host local si tienes DNS interno

---

## 📋 Script de inicio automático

Crea un archivo `iniciar_servidor.bat` en la carpeta del proyecto:

```batch
@echo off
echo Iniciando PeDeFinador 3000...
echo.
cd /d "C:\projects\PeDiFicador_3000"
echo Servidor iniciado en: http://localhost:8080
echo.
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        echo Acceso desde VPN: http://%%b:8080
    )
)
echo.
echo Presiona Ctrl+C para detener el servidor
python -m http.server 8080
pause
```

**Uso**: Doble clic en `iniciar_servidor.bat` para iniciar automáticamente.

---

## ✨ Características de la aplicación

Una vez que los usuarios accedan a la aplicación, podrán:

### 📄 Unir PDFs
- Subir múltiples archivos PDF
- Arrastrar y soltar archivos
- Unir en el orden deseado
- Descargar PDF combinado

### 🖼️ Convertir WEBP a JPG
- Subir archivos WEBP
- Conversión con 95% de calidad
- Descarga individual de cada imagen
- Procesamiento por lotes

### 🔒 Seguridad
- **Procesamiento local**: Los archivos no se envían al servidor
- **Privacidad total**: Todo se procesa en el navegador del usuario
- **Sin almacenamiento**: Los archivos no se guardan en el servidor

---

¡Disfruta compartiendo PeDeFinador 3000 en tu VPN! 🎉

# PeDeFinador 3000 🔗

Una aplicación web moderna y fácil de usar para unir múltiples archivos PDF en un solo documento y convertir imágenes WEBP a JPG con máxima calidad.

## 🌟 Características

### 📄 Unión de PDFs
- **Interfaz intuitiva**: Diseño moderno y fácil de usar
- **Drag & Drop**: Arrastra y suelta archivos PDF directamente
- **Múltiples archivos**: Une tantos PDFs como necesites
- **Orden personalizable**: Reorganiza los archivos antes de unir

### 🖼️ Conversión WEBP a JPG
- **Conversión de alta calidad**: Mantiene el 95% de la calidad original
- **Procesamiento por lotes**: Convierte múltiples archivos a la vez
- **Descarga individual**: Cada imagen convertida se descarga por separado
- **Preservación de dimensiones**: Mantiene el tamaño original de las imágenes

### 🔒 Características generales
- **Procesamiento local**: Tus archivos no se envían a ningún servidor
- **Barra de progreso**: Visualiza el progreso del procesamiento
- **Responsive**: Funciona en dispositivos móviles y de escritorio
- **Sin instalación**: Funciona directamente en el navegador
- **Selector de modo**: Cambia fácilmente entre funciones

## 🚀 Cómo usar

### 📄 Para unir PDFs:
1. **Abrir la aplicación**: Abre el archivo `index.html` en tu navegador web
2. **Seleccionar modo**: Asegúrate de estar en el modo "📄 Unir PDFs"
3. **Seleccionar archivos**: 
   - Haz clic en "Seleccionar archivos PDF" para elegir archivos
   - O arrastra y suelta archivos PDF directamente en la zona indicada
4. **Revisar archivos**: Verifica que todos los archivos estén en la lista
5. **Unir PDFs**: Haz clic en "🔗 Unir PDFs" para comenzar el proceso
6. **Descargar**: Una vez completado, descarga tu PDF combinado

### 🖼️ Para convertir WEBP a JPG:
1. **Cambiar modo**: Haz clic en "🖼️ WEBP a JPG" en el selector de modo
2. **Seleccionar archivos**: 
   - Haz clic en "Seleccionar archivos WEBP" para elegir archivos
   - O arrastra y suelta archivos WEBP directamente en la zona indicada
3. **Revisar archivos**: Verifica que todos los archivos WEBP estén en la lista
4. **Convertir**: Haz clic en "🔄 Convertir a JPG" para comenzar la conversión
5. **Descargar**: Una vez completado, descarga cada imagen JPG individualmente

## 📋 Requisitos

- **Navegador moderno**: Chrome, Firefox, Safari, Edge (versiones recientes)
- **JavaScript habilitado**: La aplicación requiere JavaScript para funcionar
- **Archivos válidos**: 
  - Para PDFs: Solo acepta archivos con extensión .pdf
  - Para imágenes: Solo acepta archivos con extensión .webp
- **Canvas API**: Requerido para la conversión de imágenes (soportado en navegadores modernos)

## 🛠️ Tecnologías utilizadas

- **HTML5**: Estructura de la aplicación
- **CSS3**: Estilos y animaciones
- **JavaScript ES6+**: Lógica de la aplicación
- **PDF-lib**: Librería para manipulación de PDFs
- **Canvas API**: Para conversión de imágenes WEBP a JPG
- **File API**: Para manejo de archivos locales
- **Blob API**: Para generación y descarga de archivos

## 📁 Estructura del proyecto

```
PeDeFinador 3000/
├── index.html          # Página principal
├── styles.css          # Estilos de la aplicación
├── script.js           # Lógica JavaScript
└── README.md           # Este archivo
```

## 🔧 Instalación y uso

### Uso local simple
1. **Descargar**: Descarga todos los archivos del proyecto
2. **Abrir**: Abre `index.html` en tu navegador web favorito
3. **¡Listo!**: La aplicación está lista para usar

### Compartir en VPN/Red local

#### Método rápido (Script automático)
1. **Ejecutar**: Doble clic en `iniciar_servidor.bat`
2. **Compartir**: Usa la URL que aparece para VPN/Red local
3. **Acceder**: Otros usuarios pueden abrir la URL en su navegador

#### Método manual con Python
```cmd
cd C:\projects\PeDiFicador_3000
python -m http.server 8080
```

#### Otros métodos disponibles
```bash
# Con Node.js
npm install -g http-server
http-server -p 8080 -a 0.0.0.0

# Con PHP
php -S 0.0.0.0:8080
```

**📋 Consulta `INSTRUCCIONES_VPN.md` para guía completa de configuración**

## ✨ Características técnicas

### Funcionalidades implementadas

- ✅ Selección múltiple de archivos PDF
- ✅ Validación de tipos de archivo
- ✅ Drag & Drop con efectos visuales
- ✅ Previsualización de archivos seleccionados
- ✅ Eliminación individual de archivos
- ✅ Barra de progreso en tiempo real
- ✅ Combinación de PDFs preservando todas las páginas
- ✅ Descarga automática del resultado
- ✅ Sistema de notificaciones
- ✅ Manejo de errores
- ✅ Diseño responsive
- ✅ Verificación de compatibilidad del navegador

### Seguridad y privacidad

- 🔒 **Procesamiento local**: Todos los archivos se procesan en tu navegador
- 🔒 **Sin envío de datos**: Ningún archivo se envía a servidores externos
- 🔒 **Sin almacenamiento**: Los archivos no se guardan en el navegador
- 🔒 **Memoria limpia**: Los archivos se eliminan de la memoria al finalizar

## 🐛 Solución de problemas

### La aplicación no carga
- Verifica que JavaScript esté habilitado en tu navegador
- Asegúrate de que todos los archivos estén en la misma carpeta
- Intenta abrir la aplicación en modo incógnito

### Error al unir PDFs
- Verifica que los archivos sean PDFs válidos
- Algunos PDFs protegidos con contraseña pueden no funcionar
- Intenta con archivos PDF más pequeños

### El navegador no es compatible
- Usa una versión reciente de Chrome, Firefox, Safari o Edge
- Actualiza tu navegador a la última versión

## 📝 Notas adicionales

- **Límite de archivos**: No hay límite técnico, pero archivos muy grandes pueden ser lentos
- **Orden de páginas**: Los PDFs se combinan en el orden que aparecen en la lista
- **Calidad**: Se mantiene la calidad original de los PDFs
- **Metadatos**: Los metadatos originales pueden no preservarse

## 🤝 Contribuciones

Si encuentras algún error o tienes sugerencias de mejora, no dudes en reportarlo.

## 📄 Licencia

Este proyecto es de uso libre para fines educativos y personales.

---

**PeDeFinador 3000** - Desarrollado con ❤️ para simplificar la unión de PDFs

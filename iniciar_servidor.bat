@echo off
title PeDeFinador 3000 - Servidor Local
color 0A
echo.
echo ===============================================
echo          PeDeFinador 3000 - Servidor
echo ===============================================
echo.
echo Iniciando servidor web...
echo.

REM Cambiar al directorio del proyecto
cd /d "C:\Users\francisco.vega\Documents\Projects\PeDiFicador_3000"

REM Verificar que Python esté instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python no está instalado o no está en el PATH
    echo.
    echo Por favor instala Python desde: https://python.org
    echo.
    pause
    exit /b 1
)

echo Python detectado correctamente
echo.
echo Servidor iniciado en puerto 8080
echo.
echo ===============================================
echo           URLs de acceso:
echo ===============================================
echo.
echo Local: http://localhost:8080
echo.

REM Obtener y mostrar la IP local
echo Obteniendo IP local...
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4" ^| findstr /v "127.0.0.1"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        set IP=%%b
        set IP=!IP: =!
        if not "!IP!"=="" (
            echo VPN/Red local: http://!IP!:8080
        )
    )
)

echo.
echo ===============================================
echo.
echo La aplicación está lista para usar!
echo Comparte la URL de VPN/Red local con otros usuarios
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
echo ===============================================
echo.

REM Iniciar el servidor HTTP de Python
python -m http.server 8080

echo.
echo Servidor detenido.
pause

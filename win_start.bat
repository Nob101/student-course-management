@echo off
setlocal
echo [INFO] Pruefe Docker Status...



:: NEW: Prüfung ob .env überhaupt existiert, wenn nicht dann aus example kopieren
if not exist .env (
    if exist .env.example (
        echo [WARN] Keine .env gefunden. Erstelle .env ...
        copy .env.example .env >nul
    ) else (
        echo [ERROR] Weder .env noch .env.example gefunden!
        pause
        exit /b
    )
)

::Prüft ob Docker bereits läuft 
docker info >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] Docker Engine ist bereits aktiv.
    goto docker_ready
)

::  Docker ist nicht gestartet -> Startvorgang einleiten
echo [ERROR] Docker ist nicht gestartet! Versuche Docker Desktop zu starten...

:: Pfad zu Docker Desktop
set "DOCKER_PATH=C:\Program Files\Docker\Docker\Docker Desktop.exe"

if exist "%DOCKER_PATH%" (
    start "" "%DOCKER_PATH%"
    echo [INFO] Docker Desktop wurde aufgerufen.
) else (
    echo [ERROR] Docker Desktop wurde unter %DOCKER_PATH% nicht gefunden.
    echo Bitte starte Docker manuell oder passe den Pfad im Skript an.
    pause
    exit /b
)

::  Warteschleife, bis die Engine bereit ist
echo [INFO] Warte auf Docker Engine...
set /a counter=0

:wait_loop
set /a counter+=1

:: Abbruch nach 12 Versuchen (60 Sekunden)
if %counter% gtr 12 (
    echo [ERROR] Docker Engine konnte nicht zeitnah gestartet werden.
    echo [INFO] Aendere 'gtr 6' zu 'gtr 12' im Skript fuer 60s Wartezeit.
    pause
    exit /b
)

:: Sekunden warten vor dem nächsten Check
timeout /t 5 >nul

docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo . (Versuch %counter%/6 - Warte...)
    goto wait_loop
)

echo [SUCCESS] Docker Engine ist bereit!

::  Docker Compose Bereich (Layer-Cache)
:docker_ready
echo [INFO] Build and run Container...
docker compose up --build -d

:: Kurze Pause für den Start der Dienste (Express/DB)
timeout /t 5 >nul

:: Auto-Browser     => im app-modus  =>  start chrome --app=http://localhost:3000/html/start.html    ||     start msedge --app=http://localhost:3000/html/start.html
start http://localhost:3000/html/start.html

echo --------------------------
echo [SUCCESS] Anwendung laeuft!
echo [INFO] Container laufen im Hintergrund weiter
echo --------------------------


timeout /t 5 >nul
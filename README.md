# Kurs- & Schülerverwaltungssystem

**Disclaimer Übungsprojekt**

Dieses Repository enthält ein Management-System für Schüler und Kurse. Das Ziel war die Implementierung einer sauberen Architektur mit Trennung von Frontend, Backend und Datenbank.  ( Geschäftslogik und Datenbankzugriff mittels DAO-Pattern )

**DAO-Patterns (Data Access Object)**
**containerisierte NoSQL-Architektur**

Dieses Projekt wurde im Rahmen meiner Ausbildung zum Informatiker zu Übungszwecken erstellt. Es dient der Demonstration einer modernen Fullstack-Entwicklung und ist nicht für den produktiven Einsatz vorgesehen.


---

**Frontend**
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
**Backend**
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
**Infrastruktur & Database**
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)


---



### Key Features

* **Migration auf MongoDB:** Flexibles, dokumentenbasiertes Datenschema statt starrer Tabellen.
* **Mongoose ODM:** Typsichere Modellierung der Daten in JavaScript.
* **Docker Orchestrierung:** Vollständige Isolierung von Applikation und Datenbank.
* **DAO-Architektur:** Erleichtert die Wartbarkeit und Testbarkeit des Codes.

---

## Technologie Stack

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Backend:** Node.js, Express.js
* **Datenbank:** MongoDB via Mongoose ODM
* **Infrastruktur:** Docker & Docker Compose

---

## Features

* **Filtersuche**
* **Dashboard-Ansicht**
* **Automatische Datenbank-Initialisierung**

---

##  Testdaten (Seeding)

Das Projekt verfügt über einen automatisierten Seeding-Mechanismus. Beim ersten Start der Anwendung (wenn die MongoDB noch leer ist) werden automatisch Testdaten angelegt, um die Funktionalität sofort testen zu können.

**Enthaltene Testdaten:**
* **Kurs:** Musik_101 (Lehrer: John F.)
* **Schüler:** John Doe (SV-Nr: 1111039A)
* **Verknüpfung:** Der Schüler John Doe ist automatisch im Kurs Musik_101 eingeschrieben.

Die Logik hierfür befindet sich in `database/seed.js` und wird beim Serverstart 
in der `server.js` aufgerufen, sofern `schuelerCount === 0`.


---

## Quick Start (Dockerized)

Dank Docker ist keine lokale Installation von Node.js oder MongoDB erforderlich.

**Voraussetzungen:** Docker & Docker Desktop gestartet.

1.  git clone https://github.com/Nob101/student-course-management.git
2.  cp .env.example .env
3.  Im Projektverzeichnis folgenden Befehl ausführen:
    ```bash
    docker-compose up --build -d
    ```

---

##  Verzeichnisstruktur (MVC-Pattern)

```

project/
│
├── controller/          # Brains: Verarbeitet API-Requests & Validierung
│   ├── kursController.js
│   └── schuelerController.js
│
├── dao/                 # Data Access Objects: Mongoose-Logik (CRUD)
│   ├── kursDao.js
│   └── schuelerDao.js
│
├── database/            # Connection Logic: Mongoose-Initialisierung & seeding
│   └── database.js
│   └── seed.js
│
├── models/              # Mongoose Schemas: Definition der Datenstruktur
│   ├── kurs.js
│   └── schueler.js
│
├── public/              # Statische Dateien (Frontend)
│   ├── css/             # Stylesheets (Gojo-Blue Design & Animationen)
│   │   ├── nav_style.css
│   │   └── style.css
│   ├── html/            # Views
│   │   └── start.html
│   └── javascript/      # Modulare Client-side Logik
│   |   ├── animation.js  # UI-Effekte & Overlays
│   |   ├── apiService.js # API-Kommunikation (Fetch-Calls)
│   |   ├── main.js       # App-Initialisierung & Event-Listener
│   |   ├── utils.js      # Hilfsfunktionen
│   |   └── view.js       # DOM-Manipulation & UI-Updates
│   └── config.js      # API_BASE_URL 
│
├── routes/              # Express-Router: API-Endpunkt-Definitionen
│   ├── kursRouter.js
│   └── schuelerRouter.js
│
├── .dockerignore        # Optimiert den Docker-Build
├── .gitignore           # Verhindert Upload von node_modules & Secrets
├── .env.example           # Beispiel .env Datei   (Port & Path)
├── docker-compose.yml   # Orchestrierung von Node-App & MongoDB
├── Dockerfile           # Bauanleitung für das Node.js-Image (slim)
├── LICENSE              # Rechtliche Rahmenbedingungen (MIT)
├── package.json         # Projekt-Metadaten & Abhängigkeiten
├── package-lock.json    # Fixierte Versionsstände der npm-Pakete
└── server.js            # Entry Point: Express-Server Start & DB-Connect


```




# Kurs- & Schülerverwaltungssystem

**Disclaimer Übungsprojekt**

Dieses Repository enthält ein Management-System für Schüler und Kurse. Das Ziel war die Implementierung einer sauberen Architektur mit Trennung von Frontend, Backend und Datenbank.  (Geschäftslogik und Datenbankzugriff mittels DAO-Pattern)

**DAO-Patterns (Data Access Object)**
**containerisierte NoSQL-Architektur**

Dieses Projekt wurde im Rahmen meiner Ausbildung zum Informatiker zu Übungszwecken erstellt. Es dient der Demonstration einer modernen Fullstack-Entwicklung und ist nicht für den produktiven Einsatz vorgesehen.


---

## Neuerungen:  (v1.2.1)
* **CI/CD Pipeline:** Automatisierte GitHub Actions zur Überprüfung der Code-Qualität und Build-Stabilität.
* **Security & Quality:** Automatisierter `npm audit` und `npm ci` bei jedem Push, um Sicherheitslücken in Dependencies zu vermeiden.
* **Hybrid Docker-Setup:** Optimiertes Dockerfile für Production (Node 25-slim) mit Development-Overrides in Docker Compose (Nodemon).

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
4. Im Browser unter `http://localhost:3000/html/start.html` zugreifen


---

**Frontend**
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Backend**
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

**Infrastruktur & Database**
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)![CI Status](https://github.com/Nob101/student-course-management/actions/workflows/main.yml/badge.svg)



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
├── CONTRIBUTING.md        # Leitfaden für Branching & lokale Entwicklung 
├── docker-compose.yml   # Orchestrierung von Node-App & MongoDB
├── Dockerfile           # Bauanleitung für das Node.js-Image (slim)
├── LICENSE              # Rechtliche Rahmenbedingungen (MIT)
├── package.json         # Projekt-Metadaten & Abhängigkeiten
├── package-lock.json    # Fixierte Versionsstände der npm-Pakete
└── server.js            # Entry Point: Express-Server Start & DB-Connect

```

---

# English

# Student & Course Management System

**Student Project Disclaimer**
This repository contains a management system for students and courses. The primary goal was to implement a clean architecture with a strict separation of frontend, backend, and database logic (Business logic and database access via the DAO pattern).

**Key Architectural Features:**
* **DAO Pattern (Data Access Object)**
* **Containerized NoSQL Architecture**

This project was created for educational purposes as part of my computer science education. It serves as a demonstration of modern full-stack development and is not intended for production use.





---

##  Recent Updates: (v1.2.1)
* **Dependency Management:** Integrated GitHub Dependabot for automated weekly security audits.
* **Request Logging:** Custom middleware for logging HTTP requests (Method, URL, Timestamp) directly to the console.
* **Enhanced Health Monitoring:** Added Express App healthchecks via `curl` (including `curl` installation in Dockerfile).

---

## Quick Start (Dockerized)

Thanks to Docker, no local installation of Node.js or MongoDB is required.

**Prerequisites:** Docker & Docker Desktop must be running.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Nob101/student-course-management.git
    ```
2.  **Configuration:**
    ```bash
    cp .env.example .env
    ```
3.  **Start the application:** Run the following command in the project root:
    ```bash
    docker-compose up --build -d
    ```

---

## Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Backend:** Node.js (v22.14.0), Express.js
* **Database:** MongoDB via Mongoose ODM
* **Infrastructure:** Docker & Docker Compose

---

## Key Features

* **MongoDB Integration:** Flexible, document-based data schema.
* **Mongoose ODM:** Type-safe data modeling in JavaScript.
* **Docker Orchestration:** Full isolation of application and database.
* **DAO Architecture:** Enhances code maintainability and testability.
* **Automated Seeding:** The project includes a seeding mechanism (`database/seed.js`) that automatically populates the database with initial test data (students and courses) on the first start.

---

## Project Structure (MVC/DAO Pattern)

The project follows a modular structure to ensure a high level of organization:
* **`controller/`**: Handles API requests and validation.
* **`dao/`**: Data Access Objects containing the Mongoose/CRUD logic.
* **`models/`**: Mongoose schemas defining the data structures.
* **`public/`**: Static frontend files (Gojo-Blue design and modular JS).
* **`routes/`**: Definition of Express API endpoints.

---

##  Contributing
For information on how to run experiments locally or details regarding the branching strategy and pull requests, please refer to the [CONTRIBUTING.md](./CONTRIBUTING.md).


---





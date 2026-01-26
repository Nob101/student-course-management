# Projekt
Vielen Dank, dass du dir die Zeit nimmst, dich mit meinem Projekt auseinanderzusetzen.

## Lokale Entwicklungsumgebung
Um das Projekt lokal zu testen, stelle bitte sicher, dass Docker auf deinem System installiert ist.  `(Node Version: v22.14.0)`
Folge dann diesen Schritten:

1. Klone das Repository.
2. Erstelle eine `.env` Datei, basierend auf der `.env.example` Datei.
3. Starte den Container im Terminal des Root-Verzeichnisses `docker-compose up --build -d`.

## Branch-Strategie
Falls du das Projekt erweitern oder lokal Änderungen testen möchtest, empfehle ich, nicht direkt im `main`-Branch zu arbeiten. 
Erstelle stattdessen für jede Änderung einen eigenen Branch:

* `feature/name-des-features` für neue Funktionen.
* `fix/name-des-bugs` für Fehlerbehebungen.

Befehl: `git checkout -b feature/mein-neuer-branch`

## Pull Requests
Da dieses Projekt nur zu Übungszwecken dienen soll, ist es primär als Demonstration  gedacht. 
Wenn du dennoch Vorschläge einreichen möchtest:

1. Pushe deine Änderungen in deinen Branch. (oder fork)
2. Eröffne einen Pull Request (PR) gegen den `main`-Branch.
3. Beschreibe kurz, was du geändert hast.

---

# English Version: Contributing Guidelines
Thank you for taking the time to explore my project.

## Local Development Environment
To test the project locally, please ensure that Docker is installed on your system. Follow these steps: `(Node Version: v22.14.0)`

  1. Clone the repository to your local machine.
  2. Configuration: Create a `.env` file in the root directory based on the `.env.example` template.
  3. Start the containers: Run `docker-compose up --build -d` in your terminal from the root directory.

## Branching Strategy
If you want to experiment with the code or add features locally, I recommend not working directly in the ``main`` branch. Instead, create a dedicated branch for each change:

* `feature/name-of-feature` for new functionality.

* `fix/name-of-bug` for bug fixes.

Command: `git checkout -b feature/my-new-branch`

## Pull Requests
As this is a student project intended for demonstration purposes, it is primarily a showcase of my work. However, if you would like to submit suggestions:

  1. Push your changes to your branch (or a fork).
  2. Open a Pull Request (PR) against the main branch.
  3. Provide a brief and clear description of your changes and the reasoning behind them.


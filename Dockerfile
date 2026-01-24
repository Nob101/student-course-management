# Laden des Basis image (slim -> Lite version, welche standard Pakete für node hat)
# node:latest -> Full 1GB   (Alles)
# node:slim -> Mittel 150MB (bcrypt)
# node:alpine -> klein 50MB (Alpine-Linux)

FROM node:20-slim

# installieren der Abhängigkeiten zum Beispiel für bycript (c++ compiler und make als steurungsprogramm -> CS50)
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Erstellt Verzeichnis im Container und wecselt in diesen Pfad
WORKDIR /usr/src/app

# NUR package.json; falls Code geändert wird (Docker überspringt npm install wenn keine neuen Pakete existieren)
COPY package*.json ./

# Dependencies
RUN npm install
# Quellcode kopieren
COPY . .

#Port öffnen (Wichtig)
EXPOSE 3000
#  Startbefehl aus package.json inkl nodemon  -> verhindert rebuild
CMD ["npx", "nodemon", "server.js"]

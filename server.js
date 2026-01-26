
/**
 * Mongoose async 
 */
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { initDataBase } = require('./database/database');
const seedData = require('./database/seed');


const app = express();
const port = process.env.PORT || 3000;


// Routen
const schuelerRouter = require('./routes/schuelerRouter');
const kursRouter = require('./routes/kursRouter');



// middleware
app.use(cors());
app.use(express.json());  //request body notwendeig



// NEU: Cache vermeiden => Sensible Daten
/**
 * no-store => verbietet Browser das dauerhafte speichern (nur RAM)
 * no-cache => Browser darf Kopie behalten , Server muss aber gültigkeit bei jeder Anfrage Prüfen
 * must-revalidate => Falls Server nicht erreichbar
 * proxy-revalidate => Das selbe in Gtrün aber für Proxy
 * Pragma => Ältere Maschinen
 * Expires => Ablaufdatum = sofort
 * next() => schickt Anfrage weiter nach unten = 'Express-Wasserfall'
 */

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');

    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    next();
});




// statische Dateien aus Frontend
app.use(express.static('public'));     // falls direkt vom express-Server ausgeliefert wird

// routen   Bleiben gleich  
app.use('/schueler', schuelerRouter);
app.use('/kurse', kursRouter);

// NEU: Weiterleitung der ROOT-URL  -> erreichbar über localhost:3000
app.get('/', (req, res) => {
    res.redirect('/html/start.html');
});



// neue startfunktion    
async function startServer(){
    
    try{
        console.log('Verbinde mit MongoDB....')
     await initDataBase();

     console.log('....Datenbank erfolgreich initialisiert');
     
     await seedData();


        
            app.listen(port, '0.0.0.0', () => {
                console.log(`Server läuft auf ${port}`);
            });


    } catch(err){
        console.error("Error: start abort", err);
        process.exit(1);
        // Anwendung beenden
    }

}
 startServer();



// docker logs node_app



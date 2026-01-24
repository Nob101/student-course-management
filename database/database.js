// Lukas Atzmülller
/**
 * noSQL -> Collections und Dokumente
 * keine getDatabse() nötig -> mongoose verbindet intern/direkt
 * mongoose wandelt json automatisch in BSON um.
 */


// const bcrypt = require('bcrypt');



const mongoose = require('mongoose');

async function initDataBase(){
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/kursverwaltung';
   console.log("Versuche Verbindung zu:", mongoURI);

   
    try{ await mongoose.connect(mongoURI);
        console.log("Mit MongoDB verbunden...");

    }catch (err){
        console.error("MongoDB Verbindungsfehler:", err);
        process.exit(1);
    }
}

module.exports = {
    initDataBase

};


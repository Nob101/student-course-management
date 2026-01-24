/**
 * MongoDB Schemalos -> Mongoose erzwingt Struktur über Models (Anstelle SQL-Scripte -> SQLoader[PSP]);
 * String -> großes S -> Konstruktor-Funktion (Globale JacaScript-Klasse)
 */


const mongoose = require('mongoose');

const schuelerSchema = new mongoose.Schema({
    vorname: { type: String, required: true},
    nachname: {type: String, required: true},
    svnummer: { type: String, required: true, unique: true}  //NEU: Verhindert doppel einträge
});

module.exports = mongoose.model('Schueler', schuelerSchema);  //('interner Identifikator für mongoose', Instanz)  Schueler -> Schuelers


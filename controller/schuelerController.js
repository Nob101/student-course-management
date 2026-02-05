// Lukas Atzmüller

/**
 * 
 * 200      OK
 * 201      Created
 * 204      No Content
 * 400      Bad Request Client
 * 404      Res Not found
 * 500      Bad Request Server
 * 
 */

/**
 * Der Controller nimmt die HTTP-Anfragen entgegen, prüft die Daten (Validierung) und sagt dem DAO, was in der Datenbank zu tun ist. 
 * Danach schickt er eine passende Antwort mit einem Statuscode zurück.
 * 
 */


// Pfad speichern für zugriff auf fun/met
const schuelerDao = require('../dao/schuelerDao.js');

// Alle Schueler ausgeben
async function getAllSchueler(req, res){
    try {
        const alleSchueler = await schuelerDao.getAll();
        res.status(200).json(alleSchueler);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Schueler nach ID filtern /suchen
async function getSchuelerById(req,  res) {
  try {
        const id = req.params.id;                                     
        const schueler = await schuelerDao.getById(id);
        if (!schueler) {
            return res.status(404).json({ message: 'Schüler nicht gefunden' });
        }
        res.status(200).json(schueler);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


// NEU: mit svnummer
async function createSchueler(req, res){
    const {vorname, nachname, svnummer} = req.body;

    if(!vorname || !nachname || !svnummer){
        return res.status(400).json({
            message: 'Bitte Vor- und Nachname und 8-stellige SV-Nr angeben'
        });

    }

    // NEU: Prüfen ob SV-Nummer wirklich nur Nummer ist (RegEx)
    const nurZiffern = /^\d+$/;

    if(!nurZiffern.test(svnummer)) {
        return res.status(400).json({
            message: 'Fehler: Die SV-Nummer enthält ungültige Zeichen!'
        });
    }

    if(svnummer.length !==8){
        return res.status(400).json({
            message: 'Die SV ist nicht lang genug.'
        });
    }


    try   {
        //  das ganze Objekt  an DAO weiter reichen
        const neuerSchueler = await schuelerDao.create({ vorname, nachname, svnummer });
        res.status(201).json(neuerSchueler);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

async function deleteSchueler(req, res) {
    try {
        const id = req.params.id;
        const success = await schuelerDao.delete(id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Schüler nicht gefunden.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    }



module.exports ={
    getAllSchueler,
    getSchuelerById,
    createSchueler,
    deleteSchueler,

};
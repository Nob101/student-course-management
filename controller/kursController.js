// Lukas Atzmüller


/**
 * Der Controller nimmt die HTTP-Anfragen entgegen, prüft die Daten (Validierung) und sagt dem DAO, was in der Datenbank zu tun ist. 
 * Danach schickt er eine passende Antwort mit einem Statuscode zurück.
 * 
 * 
 */

// import der DAOs -> direkter Zugriff
const kursDao = require('../dao/kursDao.js');
const schuelerDao = require('../dao/schuelerDao.js');


// alle Kurse
async function getAllKurse(req, res){
    try {
        const alleKurse = await kursDao.getAll();
        res.status(200).json(alleKurse);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// kurs über ID
async function getKursById(req, res) {
  try {
        const id = req.params.id;
        const kurs = await kursDao.getById(id);
        if (!kurs) {

              // 404: Not Found, wenn der Kurs nicht existiert
            return res.status(404).json({ message: 'Kurs nicht gefunden' });
        }
        res.status(200).json(kurs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

// erstellen eines Kurses
async function createKurs(req,res){
    const { kursname, lehrer } = req.body;
    if (!kursname || !lehrer) {

        return res.status(400).json({ message: 'Kursname und Lehrer fehlen' });
    }
    try {
        const neuerKurs = await kursDao.create(kursname, lehrer);
        res.status(201).json(neuerKurs);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}




/**
 * Prüfen bevor es in die Datenbank geht!!!
 * verhindert fehlerhafte Eingaben
 * 
 */
async function addSchuelerToKurs(req , res){
    const { kursId } = req.params;
    const { schuelerId } = req.body;

    try {
        // Prüfen ob Schüler existiert (Prüfung auf Integer nicht mehr nötig, MongoDb nutzt HEX-Strings (ObjectId))
        const schueler = await schuelerDao.getById(schuelerId);
        if (!schueler) {

            return res.status(404).json({ message: 'Schüler existiert nicht' });
        }

        const aktualisierterKurs = await kursDao.addSchueler(schuelerId, kursId);
       res.status(200).json(aktualisierterKurs);
    } catch (err) {

        res.status(400).json({ message: err.message });
    }
}





//  Kurs löschen
async function deleteKurs(req, res){ 
    try {
        const success = await kursDao.delete(req.params.id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Kurs nicht gefunden' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}





// entfernt Schüler aus Kurs wieder
async function unenrollSchueler(req, res) {
       
       const { kursId, schuelerId } = req.params;
    try {
        const success = await kursDao.removeSchueler(kursId, schuelerId);
        if ( success ) {
            res.status(204).send();

        } else {
            res.status(404).json({ message: 'Kurs oder Schüler nicht gefunden' });
        }
    } catch ( err) {
        res.status(500).json({ message: err.message });
    }
}





module.exports ={
    getAllKurse,
    getKursById,
    createKurs,
    addSchuelerToKurs,
    deleteKurs,
    unenrollSchueler,
};




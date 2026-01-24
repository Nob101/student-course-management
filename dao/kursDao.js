// Lukas Atzmüller


const Kurs = require('../models/kurs');
const Schueler = require('../models/schueler');


function KursDao(){
   
}
// Alle Kurse inkl Schueler
KursDao.prototype.getAll = async function(){
    
    return await Kurs.find().populate('schueler');
}

/**
 * Einen Kurs per Id und 'pushed' schülerdaten dazu
 * Data Enrichment - Datenanreicherungen / Daten zusammenführen (.populate('schuelr'))
 */
KursDao.prototype.getById = async function(id){
    return await Kurs.findById(id).populate('schueler')
};



KursDao.prototype.create = async function(kursname, lehrer){
    
    const neuerKurs =  new Kurs({
        kursname: kursname,
        lehrer: lehrer,
        schueler: []  //start mit leerem Array
    });

    return await neuerKurs.save();
}


/**
 * Neuen Schüler zum Kurs hinzugfügen 
 * $addToSet verhindert Duplikate in der Datenbank
 * findByIdAndUpdate -> ALL IN ONE Werkzeug finden, ändern, speichern
 */
KursDao.prototype.addSchueler = async  function(schuelerId, kursId){
   

    return await Kurs.findByIdAndUpdate(
        kursId,
        { $addToSet: { schueler: schuelerId }
    },
    {new: true}  //gibt aktuelste Dokument zurück
    ).populate('schueler');
};




// Löscht einen  Kurs
KursDao.prototype.delete = async function(id) {
    const result = await Kurs.findByIdAndDelete(id);
    return result !== null;
};



/**
 * Schüler nur abmelden mit $pull
 */
KursDao.prototype.removeSchueler = async function(kursId, schuelerId) {
   const updateKurs = await Kurs.findByIdAndUpdate(
    kursId,
    {$pull: { schueler: schuelerId}},
    {new: true}
   );
   return updateKurs !== null;
};

module.exports = new KursDao();



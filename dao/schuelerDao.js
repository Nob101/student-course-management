// Lukas Atzmüller

/**
 * Mongoose arbeitet async
 * -> models/Schueler
 */

const Schueler = require('../models/schueler');
const Kurs = require('../models/kurs');

function SchuelerDao(){
    
}


// Methode um alle Schueler zu holen MongoDB
SchuelerDao.prototype.getAll = async function(){
   
    return await Schueler.find(); //holt Alle Schuelr
};


SchuelerDao.prototype.getById =  async function (id){
        return await Schueler.findById(id);
};

// NEU: data als Sammelstelle anstatt 0> { vorname, nachname, svnummer}
SchuelerDao.prototype.create = async function(data) {
 const newSchueler = new Schueler(data);
 return await newSchueler.save();
};


// SCR: https://mongoosejs.com/docs/queries.html
// Methode in Mongoose -> löscht ein Dokument direkt über die ID
SchuelerDao.prototype.delete = async  function(id){
    const result = await Schueler.findByIdAndDelete(id);

    return result !== null;
};



// NEU: Holt alle Kurse, in denen ein bestimmter Schüler eingeschrieben ist.

SchuelerDao.prototype.getKurseBySchuelerId = async function(schuelerId) {
   return await Kurs.find({schueler: schuelerId});
};




// module exportieren    gängige praxis (backend) singleton pattern -> spart resourcen
module.exports = new SchuelerDao();




// Wie schueler.js


/**
 * Embedding -> Einbetten von Referenzen im Kurs (Besitzer der Daten)
 */

const mongoose = require('mongoose');

const kursSchema = new mongoose.Schema({
    kursname: { type: String, required: true},
    lehrer: {type: String, required: true},
    //N:M durch Object ID in einem Array -> Schueler (Anstelle eines INTEGER [MOngoDB-Referenz 12-Byte-Binärwert])
    schueler: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Schueler'
    }]
});

module.exports = mongoose.model('Kurs', kursSchema);


/**
 * ref: ist der join Ersatz/ virtueller Foreign Key 'Die IDs im Array gehören zu "Schueler"  -> .populate() lädt alle Schuelöer'
 */



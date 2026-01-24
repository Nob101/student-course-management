// Lukas


// express router
const express = require('express');
const router = express.Router();
const kursController = require('../controller/kursController.js');

router.get('/', kursController.getAllKurse);
router.get('/:id', kursController.getKursById);

router.post('/:kursId/schueler', kursController.addSchuelerToKurs);  

router.post('/', kursController.createKurs);
router.delete('/:id', kursController.deleteKurs);
router.delete('/:kursId/schueler/:schuelerId', kursController.unenrollSchueler);  //wichitg   Welcher Schüler soll aus welchem Kurs gelöscht werden N:M beziehungen 

module.exports = router;


// Bei Express zählt der erste treffer [First Match Filter]


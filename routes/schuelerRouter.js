// Lukas Atzmüller



const express = require('express');
const router = express.Router();
const schuelerController = require('../controller/schuelerController.js');

router.get('/', schuelerController.getAllSchueler);
router.get('/:id', schuelerController.getSchuelerById);

router.post('/', schuelerController.createSchueler);
router.delete('/:id', schuelerController.deleteSchueler);

module.exports = router;



const express = require('express');
const router = express.Router();
const FonctionnaireController = require('../controllers/fonctionnaireController');

router.get('/', FonctionnaireController.getAllFonctionnaires);
router.post('/new_fonctionnaire', FonctionnaireController.createFonctionnaire);
router.put('/:id', FonctionnaireController.updateFonctionnaire);
router.delete('/:id', FonctionnaireController.deleteFonctionnaire);

module.exports = router;

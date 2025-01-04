const express = require('express');
const router = express.Router();
const ProprietaireController = require('../controllers/proprietaireController');

router.get('/', ProprietaireController.getAllProprietaires);
router.post('/new_proprietaire', ProprietaireController.createProprietaire);
router.put('/:id', ProprietaireController.updateProprietaire);
router.delete('/:id', ProprietaireController.deleteProprietaire);

module.exports = router;

const express = require('express');
const router = express.Router();
const energieController = require('../controllers/energieController');

// Route pour ajouter une consommation énergétique
router.post('/new_energie', energieController.ajouterConsommation);

// Route pour supprimer une consommation énergétique
router.delete('/:id', energieController.supprimerConsommation);

module.exports = router;

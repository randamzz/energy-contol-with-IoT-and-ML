const express = require('express');
const router = express.Router();
const tacheController = require('../controllers/TacheController');

// Routes for CRUD operations
router.get('/', tacheController.getAllTaches);
router.post('/new_tache', tacheController.createTache);
router.put('/:id', tacheController.updateTache);
router.delete('/:id', tacheController.deleteTache);

module.exports = router;
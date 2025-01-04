const express = require('express');
const router = express.Router();
const AnomalieController = require('../controllers/anomalieController');

router.get('/', AnomalieController.getAllAnomalies);
router.post('/new_anomalie', AnomalieController.createAnomalie);
router.put('/:id', AnomalieController.updateAnomalie);
router.delete('/:id', AnomalieController.deleteAnomalie);

module.exports = router;

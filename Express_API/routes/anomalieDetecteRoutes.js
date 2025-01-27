const express = require('express');
const router = express.Router();
const AnomalieDetecteController = require('../controllers/AnomalieDetecteController');

router.get('/', AnomalieDetecteController.getAllAnomaliesDetected);


module.exports = router;

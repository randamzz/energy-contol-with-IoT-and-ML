const express = require('express')
const router = express.Router() ;
const batimentController = require('../controllers/batimentController') ;

//definire les route 
router.get('/',batimentController.getAllBatiments) ;
router.post('/new_batiment',batimentController.createBatiment) ;
router.post('/consommation_mensuelle', batimentController.getConsommationMensuelle);
router.get('/top2', batimentController.getTopBatimentsConsommationFaible);
router.get('/top3', batimentController.getTop3BatimentsConsommationFaible);
router.get('/profile/:id', batimentController.getProfileConsommation);
module.exports= router ;

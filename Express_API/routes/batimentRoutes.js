const express = require('express')
const router = express.Router() ;
const batimentController = require('../controllers/batimentController') ;

//definire les route 
router.get('/',batimentController.getAllBatiments) ;
router.post('/new_batiment',batimentController.createBatiment) ;
module.exports= router ;

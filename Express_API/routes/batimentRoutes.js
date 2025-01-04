const express = require('express')
const router = express.Router() ;
const batimentController = require('../controllers/batimentController') ;

//definire les route 
router.get('/',batimentController.getAllBatiments) ;
router.post('/new_batiment',batimentController.createBatiment) ;
router.put('/:id', batimentController.updateBatiment);
router.delete('/:id', batimentController.deleteBatiment);
module.exports= router ;

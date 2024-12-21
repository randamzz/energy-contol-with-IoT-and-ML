const mongoose = require('mongoose') ;
const EnergySchema =new mongoose.Schema({

}) ;
const Energy = mongoose.model('Energy',EnergySchema) ;
module.exports= Energy ;
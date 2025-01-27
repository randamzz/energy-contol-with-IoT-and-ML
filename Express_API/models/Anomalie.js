const mongoose = require('mongoose') ;

const AnomalieSchema =new mongoose.Schema({
    nom: { type: String, required: true },
    seuil_min: { type: Number, required: true },
    seuil_max: { type: Number, required: true },
    description: { type: String },
    conseil: { type: [String], default: [] },
}) ;

const Anomalie = mongoose.model('Anomalie',AnomalieSchema) ;
module.exports= Anomalie ;
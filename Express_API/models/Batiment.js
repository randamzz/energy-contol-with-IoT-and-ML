const mongoose = require('mongoose') ;
const BatimentSchema =new mongoose.Schema({
    // id_batiment:{type:Number , require:true} ,
    adresse: { type: String, required: true },
    coordonnées_x: { type: Number, required: true },
    coordonnées_y: { type: Number, required: true },
    id_propriétaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Proprietaire', required: true },
    id_energie: { type: mongoose.Schema.Types.ObjectId, ref: 'Energie' },
    classement: { type: String },
    surface: { type: Number },
    nombre_de_machine: { type: Number},

}) ;
const Batiment = mongoose.model('Batiment',BatimentSchema) ;
module.exports= Batiment ;
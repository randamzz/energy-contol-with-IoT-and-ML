const mongoose = require('mongoose') ;
const FactureSchema =new mongoose.Schema({
    montant:{type:Number , require:true} ,
    date_emission:{type:date} ,
    id_batiment: { type: mongoose.Schema.Types.ObjectId, ref: 'Batiment', required: true }, 
}) ;
const Facture = mongoose.model('Facture',FactureSchema) ;
module.exports= Facture ;
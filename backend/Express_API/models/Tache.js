const mongoose = require('mongoose') ;

const TacheSchema =new mongoose.Schema({
    titre: { type: String, required: true },
    date_debut: { type: Date, required: true },
    date_fin: { type: Date},
    description: { type: String },
    realise: { type: Boolean, default: false },

}) ;

const Tache = mongoose.model('Tache',TacheSchema) ;
module.exports= Tache ;
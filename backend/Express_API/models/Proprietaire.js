const mongoose = require('mongoose') ;
const ProprietaireSchema =new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    adresse: { type: String, required: true },
    mot_de_passe: { type: String, required: true },
    CIN: { type: String, required: true, unique: true },
    batiments: { type: mongoose.Schema.Types.ObjectId, ref: 'Batiment' },

}) ;
const Proprietaire = mongoose.model('Proprietaire',ProprietaireSchema) ;
module.exports= Proprietaire ;
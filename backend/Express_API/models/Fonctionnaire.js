const mongoose = require('mongoose') ;
const FonctionnaireSchema =new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    adresse: { type: String, required: true },
    mot_de_passe: { type: String, required: true },
    CIN: { type: String, required: true, unique: true },
    departement: { type: String, required: true },
    coordonnées_x: { type: Number, required: true },
    coordonnées_y: { type: Number, required: true },
    taches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tache' }],

}) ;
const Fonctionnaire = mongoose.model('Fonctionnaire',FonctionnaireSchema) ;
module.exports= Fonctionnaire ;
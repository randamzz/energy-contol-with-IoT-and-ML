const mongoose = require('mongoose') ;
const AdministrateurSchema =new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    adresse: { type: String, required: true },
    mot_de_passe: { type: String, required: true },
    CIN: { type: String, required: true, unique: true },
    supervise: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Fonctionnaire' }],
}) ;
const Administrateur = mongoose.model('Administrateur',AdministrateurSchema) ;
module.exports= Administrateur ;
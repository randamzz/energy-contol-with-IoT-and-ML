const mongoose = require('mongoose')

const BatimentSchema = new mongoose.Schema({
adresse: {
    type: String,
    required: true,
  },
  classement: {
    type: String,
    required: true,
  },
  consommation: {
    type: Number,
    required: true,
  },
  // Lien avec le propriétaire (via Personne)
//   idProprietaire: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Personne',
//   },
})

const Batiment = mongoose.model('Batiment',BatimentSchema) ;
module.exports =Batiment ;
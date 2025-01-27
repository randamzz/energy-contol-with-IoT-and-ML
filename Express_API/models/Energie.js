const mongoose = require('mongoose');

// Modèle Energie
const EnergieSchema = new mongoose.Schema({
    id_batiment: { type: mongoose.Schema.Types.ObjectId, ref: 'Batiment', required: true },
    consommation_bruite: { type: Number, required: true },  // Consommation énergétique brute
    date: { type: Date, required: true }  
});

const Energie = mongoose.model('Energie', EnergieSchema);
module.exports = Energie;
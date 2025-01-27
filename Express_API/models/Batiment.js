const mongoose = require('mongoose');

const BatimentSchema = new mongoose.Schema({
    adresse: { type: String, required: true },
    coordonnées_x: { type: Number, required: true }, // Coordonnée X (latitude)
    coordonnées_y: { type: Number, required: true }, // Coordonnée Y (longitude)
    id_propriétaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Proprietaire' }, // Référence au propriétaire
    id_energie: { type: mongoose.Schema.Types.ObjectId, ref: 'Energie' }
});

const Batiment = mongoose.model('Batiment', BatimentSchema);
module.exports = Batiment;
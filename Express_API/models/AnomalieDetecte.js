const mongoose = require('mongoose');

const AnomalieDetecteSchema = new mongoose.Schema({
    adresse: { type: String, required: true },
    nomAnomalie: { type: String, required: true },
    consommationDetectee: { type: Number, required: true },
    dangerLevel : { type: Number, defualt:5 },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AnomalieDetecte', AnomalieDetecteSchema);

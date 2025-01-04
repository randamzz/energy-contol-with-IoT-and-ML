const Anomalie = require('../models/Anomalie');

// GET all anomalies
const getAllAnomalies = async (req, res) => {
    try {
        const anomalies = await Anomalie.find();
        res.status(200).json(anomalies);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des anomalies', err });
    }
};

// CREATE a new anomaly
const createAnomalie = async (req, res) => {
    const { nom, seuil, description, conseil } = req.body;

    if (!nom || !seuil) {
        return res.status(400).json({ message: 'Le nom et le seuil sont obligatoires.' });
    }

    try {
        const newAnomalie = new Anomalie({
            nom,
            seuil,
            description,
            conseil
        });
        const savedAnomalie = await newAnomalie.save();
        res.status(201).json(savedAnomalie);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'anomalie', err });
    }
};

// UPDATE an anomaly by ID
const updateAnomalie = async (req, res) => {
    try {
        const updatedAnomalie = await Anomalie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAnomalie) {
            return res.status(404).json({ message: 'Anomalie non trouvée' });
        }
        res.status(200).json(updatedAnomalie);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'anomalie', err });
    }
};

// DELETE an anomaly by ID
const deleteAnomalie = async (req, res) => {
    try {
        const deletedAnomalie = await Anomalie.findByIdAndDelete(req.params.id);
        if (!deletedAnomalie) {
            return res.status(404).json({ message: 'Anomalie non trouvée' });
        }
        res.status(200).json({ message: 'Anomalie supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'anomalie', err });
    }
};

module.exports = { getAllAnomalies, createAnomalie, updateAnomalie, deleteAnomalie };

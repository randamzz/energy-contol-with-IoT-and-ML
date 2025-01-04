const Fonctionnaire = require('../models/Fonctionnaire');

// GET all fonctionnaires
const getAllFonctionnaires = async (req, res) => {
    try {
        const fonctionnaires = await Fonctionnaire.find();
        res.status(200).json(fonctionnaires);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des fonctionnaires', err });
    }
};

// CREATE a new fonctionnaire
const createFonctionnaire = async (req, res) => {
    const { nom, prenom, telephone, adresse, mot_de_passe, CIN, departement, coordonnées_x, coordonnées_y, taches } = req.body;

    if (!nom || !prenom || !telephone || !adresse || !mot_de_passe || !CIN || !departement || !coordonnées_x || !coordonnées_y) {
        return res.status(400).json({ message: 'Tous les champs obligatoires doivent être renseignés.' });
    }

    try {
        const newFonctionnaire = new Fonctionnaire({
            nom,
            prenom,
            telephone,
            adresse,
            mot_de_passe,
            CIN,
            departement,
            coordonnées_x,
            coordonnées_y,
            taches
        });
        const savedFonctionnaire = await newFonctionnaire.save();
        res.status(201).json(savedFonctionnaire);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création du fonctionnaire', err });
    }
};

// UPDATE a fonctionnaire by ID
const updateFonctionnaire = async (req, res) => {
    try {
        const updatedFonctionnaire = await Fonctionnaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFonctionnaire) {
            return res.status(404).json({ message: 'Fonctionnaire non trouvé' });
        }
        res.status(200).json(updatedFonctionnaire);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du fonctionnaire', err });
    }
};

// DELETE a fonctionnaire by ID
const deleteFonctionnaire = async (req, res) => {
    try {
        const deletedFonctionnaire = await Fonctionnaire.findByIdAndDelete(req.params.id);
        if (!deletedFonctionnaire) {
            return res.status(404).json({ message: 'Fonctionnaire non trouvé' });
        }
        res.status(200).json({ message: 'Fonctionnaire supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression du fonctionnaire', err });
    }
};

module.exports = { getAllFonctionnaires, createFonctionnaire, updateFonctionnaire, deleteFonctionnaire };

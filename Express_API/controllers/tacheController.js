const Tache = require('../models/Tache');

// GET all tasks
const getAllTaches = async (req, res) => {
    try {
        const taches = await Tache.find();
        res.status(200).json(taches);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des tâches', err });
    }
};

// CREATE a new task
const createTache = async (req, res) => {
    const { titre, date_debut, date_fin, description, realise } = req.body;

    if (!titre || !date_debut) {
        return res.status(400).json({ message: 'Le titre et la date de début sont obligatoires.' });
    }

    try {
        const newTache = new Tache({
            titre,
            date_debut,
            date_fin,
            description,
            realise
        });
        const savedTache = await newTache.save();
        res.status(201).json(savedTache);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création de la tâche', err });
    }
};

// UPDATE a task by ID
const updateTache = async (req, res) => {
    try {
        const updatedTache = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTache) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json(updatedTache);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la tâche', err });
    }
};

// DELETE a task by ID
const deleteTache = async (req, res) => {
    try {
        const deletedTache = await Tache.findByIdAndDelete(req.params.id);
        if (!deletedTache) {
            return res.status(404).json({ message: 'Tâche non trouvée' });
        }
        res.status(200).json({ message: 'Tâche supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la tâche', err });
    }
};

module.exports = { getAllTaches, createTache, updateTache, deleteTache };

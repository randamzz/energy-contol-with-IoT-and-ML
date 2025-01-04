const Batiment = require('../models/Batiment');

// GET Batiments
const getAllBatiments = async (req, res) => {
    try {
        const batiments = await Batiment.find();
        res.status(200).json(batiments);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des bâtiments', err });
    }
};

// POST Batiment
const createBatiment = async (req, res) => {
    const { adresse,coordonnées_x,coordonnées_y,id_propriétaire,id_energie, classement, surface,nombre_de_machine } = req.body;
    try {
        const newBatiment = new Batiment({ adresse,coordonnées_x,coordonnées_y, id_propriétaire, id_energie ,classement, surface,nombre_de_machine});
        await newBatiment.save();
        res.status(201).json(newBatiment);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création du bâtiment', err });
    }
};


const updateBatiment= async (req, res) => {
    try {
        const updatedBatiment= await Batiment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBatiment) {
            return res.status(404).json({ message: 'Batiment non trouvée' });
        }
        res.status(200).json(updatedBatiment);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la batiment', err });
    }
};


const deleteBatiment= async (req, res) => {
    try {
        const deletedBatiment= await Batiment.findByIdAndDelete(req.params.id);
        if (!deletedTache) {
            return res.status(404).json({ message: 'Batiment non trouvée' });
        }
        res.status(200).json({ message: 'Batiment supprimée avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la batiment', err });
    }
};

module.exports = { getAllBatiments, createBatiment ,updateBatiment,deleteBatiment };

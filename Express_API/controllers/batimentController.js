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
    const { adresse, classement, consommation } = req.body;
    try {
        const newBatiment = new Batiment({ adresse, classement, consommation });
        await newBatiment.save();
        res.status(201).json(newBatiment);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création du bâtiment', err });
    }
};

module.exports = { getAllBatiments, createBatiment };

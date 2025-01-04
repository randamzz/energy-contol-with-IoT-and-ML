const Proprietaire= require("../models/Proprietaire")

const getAllProprietaires = async (req,res) => {
    try {
        const proprietaires = await Proprietaire.find() ;
        res.status(200).json(proprietaires);

    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des proprietaires', err });
        
    }
}


const createProprietaire = async (req, res) => {
    const { nom, prenom, telephone, adresse, mot_de_passe, CIN,batiments} = req.body;

    if (!nom || !prenom || !telephone || !adresse || !mot_de_passe || !CIN ) {
        return res.status(400).json({ message: 'Tous les champs obligatoires doivent être renseignés.' });
    }

    try {
        const newProprietaire = new Proprietaire({
            nom,
            prenom,
            telephone,
            adresse,
            mot_de_passe,
            CIN,
            batiments
        });
        const savedProprietaire = await newProprietaire.save();
        res.status(201).json(savedProprietaire);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la création du proprietaire', err });
    }
};

const updateProprietaire = async (req, res) => {
    try {
        const updatedProprietaire = await Fonctionnaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProprietaire) {
            return res.status(404).json({ message: 'Proprietaire non trouvé' });
        }
        res.status(200).json(updatedProprietaire);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du proprietaire', err });
    }
};

const deleteProprietaire = async (req, res) => {
    try {
        const deletedProprietaire = await Proprietaire.findByIdAndDelete(req.params.id);
        if (!deletedProprietaire) {
            return res.status(404).json({ message: 'Proprietaire non trouvé' });
        }
        res.status(200).json({ message: 'Proprietaire supprimé avec succès' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la suppression du proprietaire', err });
    }
};

module.exports = { getAllProprietaires, createProprietaire, updateProprietaire, deleteProprietaire };

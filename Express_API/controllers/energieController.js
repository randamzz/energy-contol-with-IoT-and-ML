const Energie = require('../models/Energie');

// Fonction pour ajouter une consommation énergétique
const ajouterConsommation = async (req, res) => {
  try {
    const { id_batiment, consommation_bruite } = req.body;

    // Créer un nouveau document de consommation énergétique
    const nouvelleConsommation = new Energie({
      id_batiment,
      consommation_bruite,
      date: Date.now() // La date est définie automatiquement si non fournie
    });

    // Enregistrer la consommation dans la base de données
    await nouvelleConsommation.save();

    return res.status(201).json({
      message: 'Consommation énergétique ajoutée avec succès.',
      consommation: nouvelleConsommation
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de l\'ajout de la consommation énergétique.',
      error: error.message
    });
  }
};

// Fonction pour supprimer une consommation énergétique
const supprimerConsommation = async (req, res) => {
  try {
    const consommation = await Energie.findByIdAndDelete(req.params.id);
    if (!consommation) {
      return res.status(404).json({ message: 'Consommation non trouvée.' });
    }
    return res.status(200).json({
      message: 'Consommation énergétique supprimée avec succès.'
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Erreur lors de la suppression de la consommation énergétique.',
      error: error.message
    });
  }
};

module.exports = {
  ajouterConsommation,
  supprimerConsommation
};

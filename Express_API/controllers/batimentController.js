const twilio = require('twilio');
require('dotenv').config();

const Batiment = require('../models/Batiment');
const Energie = require('../models/Energie');


const getProfileConsommation = async (req, res) => {
    const { id } = req.params;  

    try {
        // Récupérer les détails du bâtiment
        const batiment = await Batiment.findById(id);
        if (!batiment) {
            return res.status(404).json({ message: 'Bâtiment non trouvé' });
        }

        // Récupérer la consommation énergétique du bâtiment
        const consommation = await Energie.aggregate([
            {
                $match: { id_batiment: id }  // Filtrer les consommations par l'ID du bâtiment
            },
            {
                $group: {
                    _id: "$id_batiment",
                    consommation_totale: { $sum: "$consommation_bruite" },
                    consommation_moyenne: { $avg: "$consommation_bruite" }
                }
            }
        ]);

        if (consommation.length === 0) {
            return res.status(404).json({ message: 'Aucune consommation trouvée pour ce bâtiment' });
        }

        const consommationDetails = consommation[0];

        // Calcul du coût énergétique
        const tarifEnergie = 0.25;
        const coutEnergetique = consommationDetails.consommation_totale * tarifEnergie;

        //  Calcul de l'impact environnemental
        // Supposons qu'une unité de consommation correspond à 0.4 kg de CO2 par kWh consommé
        const emissionCO2 = consommationDetails.consommation_totale * 0.4; // kg CO2
        const emissionCO2_message = `Your house emits ${emissionCO2.toFixed(2)} kg of CO2 this month.`;
        const optimisation = consommationDetails.consommation_totale > 1000 
            ? "Suggested optimization: Install energy-efficient equipment, such as LED lights and Class A energy devices, and improve the thermal insulation of the house."
            :"Correct energy consumption. To improve efficiency, consider using solar panels or enhancing insulation."


        consommation_moyenne = (consommationDetails.consommation_moyenne / 30).toFixed(2);
        // Construction du profil de consommation
        const profile = {
            adresse: batiment.adresse,
            consommation_totale: consommationDetails.consommation_totale,  //kWh 
            consommation_moyenne: consommation_moyenne, // par joure en KWh
            cout_energetique: coutEnergetique.toFixed(2),
            emission_CO2: emissionCO2_message, 
            optimisation_suggeree: optimisation,
        };

        res.status(200).json(profile);
    } catch (err) {
        console.error('Erreur :', err);
        res.status(500).json({ message: 'Erreur lors de la récupération du profil de consommation', err });
    }
};



// Fonction pour obtenir la consommation mensuelle pour chaque bâtiment
const getConsommationMensuelle = async (req, res) => {
    const { mois, annee } = req.body;  // Mois et année passés dans la requête (format numérique, ex: 12 pour décembre, 2024 pour l'année)
    
    try {
        const debutMois = new Date(annee, mois - 1, 1);  // Premier jour du mois
        const finMois = new Date(annee, mois, 0);        // Dernier jour du mois
        
        // Récupérer les consommations de chaque bâtiment pour le mois
        const consommations = await Energie.aggregate([
            {
                $match: {
                    date: { $gte: debutMois, $lte: finMois }  // Filtrer les consommations du mois demandé
                }
            },
            {
                $group: {
                    _id: "$id_batiment",  // Groupement par bâtiment
                    consommation_totale: { $sum: "$consommation_bruite" }  // Calcul de la consommation totale pour chaque bâtiment
                }
            },
            {
                $sort: { consommation_totale: 1 }  // Trier les bâtiments par consommation croissante
            },
            {
                $limit: 3  // Limiter aux 3 premiers bâtiments ayant la plus faible consommation
            }
        ]);

        // Obtenir les détails des bâtiments (nom, adresse, etc.)
        const batimentsAvecConsommation = await Batiment.find({
            _id: { $in: consommations.map(c => c._id) }
        });

        res.status(200).json({
            batiments: batimentsAvecConsommation,
            consommations: consommations
        });
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors du calcul de la consommation mensuelle', err });
    }
};



// GET Batiments
const getAllBatiments = async (req, res) => {
    try {
        const batiments = await Batiment.find();
        res.status(200).json(batiments);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des bâtiments', err });
    }
};




const getTop3BatimentsConsommationFaible = async (req, res) => {
    console.log('Route /top3 appelée'); // Log pour vérifier que la route est appelée
    try {
        // Déterminez le mois et l'année courants
        const now = new Date();
        console.log('Date courante :', now); // Vérifier la date actuelle

        const mois = now.getMonth(); // Mois courant (0 pour janvier)
        const annee = now.getFullYear(); // Année courante

        const debutMois = new Date(annee, mois, 1);  // Premier jour du mois courant
        const finMois = new Date(annee, mois + 1, 0); // Dernier jour du mois courant
        console.log('Période :', debutMois, '-', finMois); // Vérifier la période calculée

        // Étape 1 : Récupérer les consommations des bâtiments pour le mois courant
        const consommations = await Energie.aggregate([
            {
                $match: {
                    date: { $gte: debutMois, $lte: finMois }  // Filtrer les consommations du mois demandé
                }
            },
            {
                $group: {
                    _id: "$id_batiment",  // Groupement par bâtiment
                    consommation_totale: { $sum: "$consommation_bruite" }  // Calcul de la consommation totale
                }
            },
            {
                $match: {
                    consommation_totale: { $gt: 0 }  // Filtrer pour ne garder que les bâtiments ayant de la consommation
                }
            },
            {
                $sort: { consommation_totale: 1 }  // Trier par consommation croissante
            },
            {
                $limit: 3  // Limiter aux 3 premiers bâtiments ayant la plus faible consommation
            }
        ]);
        console.log('Consommations agrégées :', consommations); // Log des consommations agrégées

        // Étape 2 : Récupérer les détails des bâtiments correspondants
        const batimentsAvecConsommation = await Batiment.find({
            _id: { $in: consommations.map(c => c._id) } // Filtrer par les IDs obtenus
        });
        console.log('Bâtiments trouvés :', batimentsAvecConsommation); // Log des bâtiments trouvés

        res.status(200).json({
            batiments: batimentsAvecConsommation,
            consommations
        });
    } catch (err) {
        console.error('Erreur :', err); 
        res.status(500).json({ message: 'Erreur lors de la récupération des bâtiments à faible consommation', err });
    }
};



// POST Batiment
const createBatiment = async (req, res) => {
    // Déstructuration des champs nécessaires depuis le corps de la requête
    const { adresse, coordonnées_x, coordonnées_y, id_propriétaire, id_energie } = req.body;

    try {
        // Création du nouveau bâtiment avec les champs requis
        const newBatiment = new Batiment({
            adresse,
            coordonnées_x,
            coordonnées_y,
            id_propriétaire,
            id_energie
        });

        // Enregistrement du bâtiment dans la base de données
        await newBatiment.save();

        // Retourner le bâtiment créé en réponse
        res.status(201).json(newBatiment);
    } catch (err) {
        // Si une erreur se produit, on retourne l'erreur
        res.status(500).json({ message: 'Erreur lors de la création du bâtiment', err });
    }
};

const getTopBatimentsConsommationFaible = async (req, res) => {
    console.log('Route /top2 appelée'); // Ajoutez ce log
    try {
        // Déterminez le mois et l'année courants
        const now = new Date();
        console.log('Date courante :', now); // Vérifier la date actuelle

        const mois = now.getMonth(); // Mois courant (0 pour janvier)
        const annee = now.getFullYear(); // Année courante

        const debutMois = new Date(annee, mois, 1);  // Premier jour du mois courant
        const finMois = new Date(annee, mois + 1, 0); // Dernier jour du mois courant
        console.log('Période :', debutMois, '-', finMois); // Vérifier la période calculée

        // Étape 1 : Récupérer les consommations des bâtiments pour le mois courant
        const consommations = await Energie.aggregate([
            {
                $match: {
                    date: { $gte: debutMois, $lte: finMois }  // Filtrer les consommations du mois demandé
                }
            },
            {
                $group: {
                    _id: "$id_batiment",  // Groupement par bâtiment
                    consommation_totale: { $sum: "$consommation_bruite" }  // Calcul de la consommation totale
                }
            },
            {
                $match: {
                    consommation_totale: { $gt: 0 }  // Filtrer pour ne garder que les bâtiments ayant de la consommation
                }
            },
            {
                $sort: { consommation_totale: 1 }  // Trier par consommation croissante
            },
            {
                $limit: 3  // Limiter aux 3 premiers bâtiments ayant la plus faible consommation
            }
        ]);
        console.log('Consommations agrégées :', consommations); // Log des consommations agrégées

        // Étape 2 : Récupérer les détails des bâtiments correspondants
        const batimentsAvecConsommation = await Batiment.find({
            _id: { $in: consommations.map(c => c._id) } // Filtrer par les IDs obtenus
        });
        console.log('Bâtiments trouvés :', batimentsAvecConsommation); // Log des bâtiments trouvés

        res.status(200).json({
            batiments: batimentsAvecConsommation,
            consommations
        });
    } catch (err) {
        console.error('Erreur :', err); 
        res.status(500).json({ message: 'Erreur lors de la récupération des bâtiments à faible consommation', err });
    }
};

module.exports = {
    getTopBatimentsConsommationFaible,
    getTop3BatimentsConsommationFaible, 
    getAllBatiments,
    createBatiment,
    getConsommationMensuelle,
    getProfileConsommation,
};


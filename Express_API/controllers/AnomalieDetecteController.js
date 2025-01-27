const twilio = require('twilio');
require('dotenv').config();

const AnomalieDetecte = require('../models/AnomalieDetecte'); 
const Batiment = require('../models/Batiment');
const Energie = require('../models/Energie');
const Anomalie = require('../models/Anomalie');
const Proprietaire = require('../models/Proprietaire');

// Initialisation Twilio
const SID = "AC9c88caa34a497d807373dd4ec3571536";
const AUTH_TOKEN = "72ccc76a9f7329836a646ee2b6d8b202";
const client = twilio(SID, AUTH_TOKEN);

// Fonction pour envoyer une notification via Twilio
const envoyerNotification = async (message) => {
    try {
        const messageSent = await client.messages.create({
            from: 'whatsapp:+14155238886',
            body: message,
            to: "whatsapp:+212630334473",
        });
        return true;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du SMS:', error.message || error);
        return false;
    }
};

const verifierConsommationEnergie = async () => {
    const now = new Date(); 
    const formattedTime = now.toISOString().replace('T', ' ').split('.')[0];
    console.log(`Début de la vérification des consommations énergétiques... [${formattedTime}]`);
        try {
        // Récupérer tous les bâtiments
        const batiments = await Batiment.find();

        for (const batiment of batiments) {
            const consommation = await Energie.findOne({ id_batiment: batiment._id }).sort({ date: -1 });
            if (!consommation) {
                continue;
            }
            const anomalies = await Anomalie.find();
            for (const anomalie of anomalies) {
                if (consommation.consommation_bruite < anomalie.seuil_min || consommation.consommation_bruite > anomalie.seuil_max) {
                    console.log(`Anomalie détectée pour le bâtiment : ${batiment.adresse}`);

                    // Créer un objet AnomalieDetecte
                    const nouvelleAnomalie = new AnomalieDetecte({
                        adresse: batiment.adresse,
                        nomAnomalie: anomalie.description,
                        consommationDetectee: consommation.consommation_bruite ,
                        dangerLevel:5 ,
                    });
                    await nouvelleAnomalie.save();
                    console.log("Anomalie enregistrée ");

                    // Notifier le propriétaire
                    const proprietaire = await Proprietaire.findById(batiment.id_propriétaire);
                    const msg = `Hello, this is the Energy Track team. \n\nWe would like to inform you that your building located at ${batiment.adresse} is experiencing an issue: ${anomalie.description}. \n\nDescription: ${anomalie.description}.\n\nHere are some recommendations to check before our team comes to assist you: ${anomalie.conseil}.`;
                    if (proprietaire && proprietaire.telephone) {
                        envoyerNotification(msg);
                    } else {
                        console.log(`Numéro de téléphone du propriétaire manquant pour le bâtiment : ${batiment.adresse}`);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Erreur lors de la vérification des consommations énergétiques :', error);
    }
};

// GET all anomalies
const getAllAnomaliesDetected = async (req, res) => {
    try {
        const anomaliesDetected = await AnomalieDetecte.find().sort({ dateDetection: -1 }).limit(4);
        res.status(200).json(anomaliesDetected);
    } catch (err) {
        res.status(500).json({ message: 'Erreur lors de la récupération des anomalies detecte', err });
    }
};
module.exports={verifierConsommationEnergie ,getAllAnomaliesDetected }
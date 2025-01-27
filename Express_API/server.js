const express = require('express') ;
const dotenv = require('dotenv') ;
const connectDB = require('./config/db') ;
const cors = require('cors') ;


//importer routes 
const anomalieRoutes=require('./routes/anomalieRoutes')
const batimentRoutes =require('./routes/batimentRoutes')
const fonctionnaireRoutes =require('./routes/FonctionnaireRoutes')
const proprietaireRoutes =require('./routes/proprietaireRoutes')
const tacheRoutes=require('./routes/tacheRoutes')
const energieRoutes=require('./routes/energieRoutes')
const anomalieDetecteRoutes=require('./routes/anomalieDetecteRoutes')


// Planifier la tâche cron pour exécuter la vérification toutes les 30 minutes

// const { verifierConsommationEnergie } =require('./controllers/AnomalieDetecteController')
// const cron = require('node-cron');
// const AnomalieDetecte = require('./models/AnomalieDetecte');
// cron.schedule('* * * * *', () => {
//   console.log('Exécution de la vérification des consommations énergétiques...');
//   verifierConsommationEnergie();  
// });


dotenv.config() // charger les var d env 

const app = express() // cree application 

app.use(express.json()) // Middleware pour parser les données JSON

const corsOptions = {
    origin: '*', // Autorise toutes les origines
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Autorise ces méthodes HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Autorise ces en-têtes
};

app.use(cors(corsOptions));

connectDB() // connexion a BD 

//Definire tt les routes

app.use('/api/batiments', batimentRoutes) // donc par ex : http//localehost:5000/api/batiments/new_batiment
app.use('/api/anomalie',anomalieRoutes)
app.use('/api/fonctionnaire',fonctionnaireRoutes)
app.use('/api/proprietaire',proprietaireRoutes)
app.use('/api/taches',tacheRoutes)
app.use('/api/energies',energieRoutes)
app.use('/api/anomalie_detected',anomalieDetecteRoutes)

anomalieDetecteRoutes
//demare serveur 
const PORT =process.env.PORT || 5000 ;
app.listen(PORT,() => {
    console.log('Serveur is running on port '+PORT) ;
}) ;
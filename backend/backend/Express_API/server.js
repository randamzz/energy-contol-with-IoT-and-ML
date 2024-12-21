const express = require('express') ;
const dotenv = require('dotenv') ;
const connectDB = require('./config/db') ;
const cors = require('cors') ;

//importer routes 
const batimentRoutes =require('./routes/batimentRoutes')


dotenv.config() // charger les var d env 

const app = express() // cree application 

app.use(express.json()) // Middleware pour parser les données JSON
app.use(cors()) ; // Middleware pour gérer les requêtes CORS
connectDB() // connexion a BD 

//Definire tt les routes 
app.use('/api/batiments', batimentRoutes) // donc par ex : http//localehost:5000/api/batiments/new_batiment

//demare serveur 
const PORT =process.env.PORT || 5000 ;
app.listen(PORT,() => {
    console.log('Serveur is running on port '+PORT) ;
}) ;
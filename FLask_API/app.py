from flask import Flask, request, jsonify
import os
import pandas as pd
import joblib
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Dossier contenant les modèles
models_directory = 'models'

# Fonction pour charger le modèle
def load_model(model_name):
    model_path = os.path.join(models_directory, model_name)
    if os.path.exists(model_path):
        model = joblib.load(model_path)
        return model
    else:
        return None


# Route pour la prédiction des cout energitiques 
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Récupérer les données envoyées par l'utilisateur dans le corps de la requête
        data = request.get_json()
        # Vérifier que la clé "features" existe et contient des données
        if 'features' not in data or not data['features']:
            return jsonify({'error': 'Aucune donnée de caractéristiques fournie'}), 400

        # Convertir la liste de caractéristiques en DataFrame
        features = pd.DataFrame(data['features'])

        # Charger les modèles
        model_consumption = load_model('model_consumption.pkl')
        model_cost = load_model('model_cost.pkl')

        if model_consumption is None or model_cost is None:
            return jsonify({'error': 'Un ou plusieurs modèles non trouvés'}), 404

        # Prédire avec les deux modèles
        consumption_predictions = model_consumption.predict(features)
        cost_predictions = model_cost.predict(features)

        # Retourner les prédictions sous forme de liste dans la réponse
        predictions = []
        for i in range(len(consumption_predictions)):
            predictions.append({
                'consumption_prediction': consumption_predictions[i].tolist(),
                'cost_prediction': cost_predictions[i].tolist()
            })
        return jsonify({'predictions': predictions}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True,host="0.0.0.0", port=5001)

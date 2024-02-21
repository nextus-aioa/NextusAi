const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// Utilisez vos variables d'environnement pour stocker les valeurs sensibles
const cognitiveServicesKey = process.env.COGNITIVE_SERVICES_KEY;
// Votre point de terminaison Azure Cognitive Services
const endpoint = "https://eastus.api.cognitive.microsoft.com/";

app.post('/synthesizeSpeech', async (req, res) => {
  // Assurez-vous que l'URL est correcte et correspond à l'API de synthèse vocale que vous souhaitez utiliser
  const url = `${endpoint}texttospeech/v3.1/synthesize`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': cognitiveServicesKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body) // Le corps de la requête contient les données de synthèse vocale
  });

  // Vérifiez si la réponse est en audio et ajustez la gestion en conséquence
  if(response.headers.get("content-type")?.includes("audio")) {
    const audioData = await response.arrayBuffer();
    res.send(Buffer.from(audioData, 'binary'));
  } else {
    const data = await response.json();
    res.send(data);
  }
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

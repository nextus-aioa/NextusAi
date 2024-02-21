const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

const cognitiveServicesKey = process.env.COGNITIVE_SERVICES_KEY;
const endpoint = "Votre_Endpoint_Cognitive_Services"; // Remplacez par votre endpoint

app.post('/synthesizeSpeech', async (req, res) => {
  const response = await fetch(`${endpoint}/texttospeech/v3.0/synthesize`, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': cognitiveServicesKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });
  const data = await response.json();
  res.send(data);
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));

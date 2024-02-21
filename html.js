document.getElementById('speakButton').addEventListener('click', () => {
  const text = document.getElementById('textToSpeechInput').value;
  fetch('/synthesizeSpeech', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text })
  })
  .then(response => response.json())
  .then(data => {
    // Traiter la réponse - par exemple, jouer le fichier audio retourné
  })
  .catch(error => console.error('Erreur:', error));
});

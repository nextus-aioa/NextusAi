const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

function sendMessage() {
    const userMessage = userInput.value;
    displayMessage(userMessage, "user");
    fetchResponse(userMessage);
    userInput.value = ""; // Réinitialiser l'entrée de l'utilisateur
}

function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.className = sender;
    chatBox.appendChild(messageElement);
}

async function fetchResponse(message) {
    const response = await fetch("https://api.mistralai.com/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 7a2tv0IrqkF2qbZVwk4kqMrUhAc8VNRJ" // Remplacez par votre clé API
        },
        body: JSON.stringify({ message: message })
    });

    if (!response.ok) {
        displayMessage("Désolé, je ne peux pas répondre en ce moment.", "bot");
        return;
    }

    const data = await response.json();
    displayMessage(data.reply, "bot"); // Assurez-vous que `data.reply` correspond au chemin de la réponse attendue de l'API
}

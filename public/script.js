const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const body = document.body;

// Dark Mode Toggle
const toggleDarkMode = () => {
  body.classList.toggle('dark-mode');
};

// Add message to chat window
function addMessage(sender, message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', `${sender}-message`);

  // Add robot icon for AI messages
  if (sender === 'ai' || sender === 'SoulSync') {
    messageElement.innerHTML = `
      <span class="icon"><i class="fas fa-robot"></i></span>
      <p>${message}</p>
    `;
  } else {
    // User messages don't need the icon
    messageElement.innerHTML = `<p>${message}</p>`;
  }

  chatWindow.appendChild(messageElement);
  chatWindow.scrollTop = chatWindow.scrollHeight; // Auto-scroll
}

// Send user message
sendBtn.addEventListener('click', async () => {
  const userMessage = userInput.value.trim();
  if (userMessage) {
    addMessage('user', userMessage);
    userInput.value = '';

    // Send message to backend (AI)
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });
    const data = await response.json();
    addMessage('ai', data.reply); // Use 'ai' as the sender for chatbot responses
  }
});

// Dark mode toggle (optional)
document.addEventListener('keydown', (e) => {
  if (e.key === '0') toggleDarkMode();
});

// Smooth scrolling for CTA button
document.querySelector('.cta-button').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#chat-section').scrollIntoView({
    behavior: 'smooth',
  });
});
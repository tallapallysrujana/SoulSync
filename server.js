const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files (HTML, CSS, JS)

// Mock AI response (replace with actual AI API call)
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Call an AI API (e.g., OpenAI GPT)
  const aiResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: userMessage}],
  }, {
    headers: {
      'Authorization': 'Bearer OPENAI_API_KEY',
    },
  });

  const reply = aiResponse.data.choices[0].message.content;
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
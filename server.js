const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const SYSTEM = `You are an Akinator-style genie. Identify any character (real or fictional) by asking yes/no questions.
Respond ONLY with valid JSON, no markdown, no extra text.
Formats:
- {"action":"question","question":"Is your character a real person?"}
- {"action":"guess","name":"Harry Potter","emoji":"⚡","description":"The boy who lived","confidence":92}
- {"action":"giveup"}
Strategy: Start broad (real/fictional, alive/dead, gender, field) then narrow down. Guess when 80%+ confident, usually after 8-15 questions.`;

app.post('/api/ask', async (req, res) => {
  const { history = [] } = req.body;
  const apiKey = process.env.GROQ_KEY || req.headers['x-api-key'];

  if (!apiKey) return res.status(400).json({ error: 'Missing API key' });

  const userContent = history.length === 0
    ? 'The game is starting. Ask your first question.'
    : 'Q&A so far:\n\n' + history.map(h => `Q: ${h.q}\nA: ${h.a}`).join('\n\n') + '\n\nWhat next?';

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 200,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'user', content: userContent }
        ],
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    const raw = data.choices?.[0]?.message?.content?.trim()
      .replace(/^```(?:json)?\n?|\n?```$/g, '').trim();

    res.json(JSON.parse(raw));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`\n🧞 Akinator proxy running at http://localhost:${PORT}\n`));

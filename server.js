const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const SYSTEM = `You are the Akinator genie. Identify any character (real or fictional) by asking yes/no questions.
Respond ONLY with valid JSON, no markdown, no extra text.
Formats:
- {"action":"question","question":"Is your character a real person?"}
- {"action":"guess","name":"Harry Potter","emoji":"⚡","description":"The boy who lived","confidence":92}
- {"action":"giveup"}
Strategy: Start broad (real/fictional, alive/dead, gender, field) then narrow down. Guess when ≥80% confident, usually after 8–15 questions.`;

app.post('/api/ask', async (req, res) => {
  const { history = [] } = req.body;
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) return res.status(400).json({ error: 'Missing X-Api-Key header' });

  const userContent = history.length === 0
    ? 'The game is starting. Ask your first question.'
    : 'Q&A so far:\n\n' + history.map(h => `Q: ${h.q}\nA: ${h.a}`).join('\n\n') + '\n\nWhat next?';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 200,
        system: SYSTEM,
        messages: [{ role: 'user', content: userContent }],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    const raw = (data.content || []).map(b => b.text || '').join('').trim()
      .replace(/^```(?:json)?\n?|\n?```$/g, '').trim();

    res.json(JSON.parse(raw));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`\n🧞 Akinator proxy running at http://localhost:${PORT}\n`));

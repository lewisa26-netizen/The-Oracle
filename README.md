# 🔮 The Oracle

An AI-powered guessing game. Think of any character — real or fictional — and the Oracle will figure out who it is through a series of yes/no questions.

**[▶ Play now](https://the-oracle-ip6c.onrender.com)**

Powered by [Groq](https://groq.com) + Llama 3.3 70B.

## How to play

Go to the link above and think of any character. Answer the Oracle's yes/no questions honestly and it'll guess who you're thinking of — usually within 10–15 questions.

Works with anyone: celebrities, athletes, politicians, fictional heroes, villains, anime characters, historical figures — anyone.

> **Note:** The site may take ~30 seconds to load if it hasn't been visited recently (free hosting sleeps after inactivity).

## Running locally

You'll need [Node.js](https://nodejs.org) and a free [Groq API key](https://console.groq.com).

```bash
npm install
npm start
```

Then open `public/index.html` in your browser.

Add your Groq key as an environment variable:
```
GROQ_KEY=your_key_here
```

## Tech

- Node.js + Express (proxy server)
- Groq API + Llama 3.3 70B (AI backbone)
- Vanilla HTML/CSS/JS (frontend)
- Hosted on [Render](https://render.com)

## License

MIT — made by [lewisa26-netizen](https://github.com/lewisa26-netizen)

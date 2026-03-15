# 🔥 RoastBot 3000 — Project Documentation

> *"Because your ideas deserve brutal honesty, not polite lies."*

---

## 📌 What Is This App?

**RoastBot 3000** is an AI-powered startup idea critic chatbot. You pitch your idea, and the bot roasts it — scoring your concept from 1 to 10, breaking down what's good, what's terrible, who your competitors are, and how you could actually make it work.

The bot adapts its savagery based on idea quality:
- Score 1–3 → Full Gordon Ramsay mode 🔥
- Score 4–6 → Playful sarcasm 😏
- Score 7–10 → Reluctant impressed approval 😤👏

---

## 🚨 What Problem Does It Solve?

### The Real Problem: Ideas That Die in Your Head

Most people have great ideas — but those ideas never go anywhere because:

| Problem | What Usually Happens |
|---|---|
| No honest feedback | Friends say "wow that's great!" to avoid awkwardness |
| No validation framework | You don't know what questions to ask about your own idea |
| Fear of judgment | You never pitch it to anyone who might actually critique it |
| Analysis paralysis | Too many ideas, no way to quickly filter which ones are worth pursuing |

**RoastBot solves this by being the brutally honest friend you wish you had** — available 24/7, never sugarcoats, and always gives you something actionable to work with.

---

## 👤 Who Is This For?

| User Type | Why They Need RoastBot |
|---|---|
| **Student entrepreneurs** | Quick idea validation before investing time into a project |
| **Indie hackers / solo founders** | No co-founder to sanity-check ideas with |
| **Workshop / hackathon participants** | Fast feedback loop during ideation phase |
| **Creative professionals** | Validate side project ideas without pitching to a boss |
| **Anyone with a notes app full of "someday" ideas** | Finally get a verdict on what's worth pursuing |

**Primary target user:** Young builders (18–30) with lots of ideas and no structured way to evaluate them.

---

## 💡 Why I Built This

> *"I have a lot of ideas that just get stuck in my head."*

That quote is the entire reason this app exists. The problem isn't a lack of ideas — it's a lack of a **trusted, honest filter**.

Most idea validation tools are either:
- Too formal (business model canvas, investor pitch decks)
- Too vague ("just validate with customers!")
- Too slow (waiting for feedback from mentors or peers)

RoastBot is **fast, fun, and ruthlessly honest** — lowering the barrier to idea validation so more ideas either get killed quickly or get refined into something real.

**Secondary motivation:** Learning how to integrate LLMs (Gemini AI) into a real full-stack application with a structured prompt engineering approach.

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 18+ | Runtime environment |
| **Express.js** | 4.18 | HTTP server & routing |
| **@google/generative-ai** | 0.21.0 | Gemini AI SDK |
| **cors** | 2.8.5 | Cross-origin request handling |
| **dotenv** | 16.4.5 | Environment variable management |
| **nodemon** | 3.1.0 | Auto-restart in development |

### Frontend
| Technology | Purpose |
|---|---|
| **HTML5** | Structure |
| **CSS3** | Styling (dark theme, animations) |
| **Vanilla JavaScript** | Interactivity & API calls |
| **Google Fonts** | Bebas Neue + DM Sans typography |

### AI
| Configuration | Value | Reason |
|---|---|---|
| **Model** | `gemini-2.5-flash` | Fast response, higher free quota |
| **Temperature** | `0.9` | High creativity for varied roast styles |
| **topP** | `0.95` | Diverse token sampling |
| **topK** | `40` | Balanced vocabulary selection |
| **maxOutputTokens** | `8192` | Prevents JSON truncation |

### Testing
| Tool | Purpose |
|---|---|
| **Postman** | API endpoint testing & documentation |

---

## 📁 Project Structure

```
roast-my-idea/
├── backend/
│   ├── server.js          # Express server + Gemini AI logic
│   ├── package.json       # Node dependencies
│   ├── .env               # API keys (never commit this!)
│   └── .env.example       # Template for environment variables
├── frontend/
│   └── index.html         # Complete single-file frontend
├── .gitignore
├── 1.png                  # UI preview
├── 2.png                  # UI preview
└── README.md
```
[1.png] [2.png] [3.png]
---

## 🚀 How to Use It

### Prerequisites
- Node.js v18 or higher installed
- A free Gemini API key from [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/roast-my-idea.git
cd roast-my-idea
```

---

### Step 2 — Install Dependencies

```bash
cd backend
npm install
```

---

### Step 3 — Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and fill in your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

---

### Step 4 — Start the Server

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

You should see:
```
🔥 RoastBot 3000 Server is LIVE
📡 Port: 3000
🤖 Gemini AI: Connected
```

---

### Step 5 — Open the App

Open `frontend/index.html` directly in your browser.

> ⚠️ Make sure your backend is running on port 3000 before opening the frontend.

---

## 📮 API Reference

### `GET /api/health`
Check if the server is running.

**Response:**
```json
{
  "status": "RoastBot 3000 is online and ready to destroy dreams 🔥"
}
```

---

### `POST /api/roast`
Submit an idea for roasting.

**Request Body:**
```json
{
  "idea": "An app that uses AI to match people with their perfect houseplant"
}
```

**Response:**
```json
{
  "success": true,
  "idea": "An app that uses AI to match people with their perfect houseplant",
  "result": {
    "roast": "Oh wow, another AI matchmaking app — but for PLANTS. Because what the world really needed was a Tinder for succulents.",
    "score": 6,
    "score_label": "Quirky But Survivable",
    "strengths": [
      "Plant care is a massive, growing market",
      "Clear niche with passionate hobbyist communities"
    ],
    "weaknesses": [
      "Retention problem — you buy the plant once, then what?",
      "AI adds complexity without clear necessity here"
    ],
    "competitors": [
      {
        "name": "PictureThis",
        "url": "https://www.picturethisai.com",
        "note": "Already does AI plant identification with 50M+ users"
      }
    ],
    "survival_tip": "Add a subscription care reminder + plant journal feature to solve the retention problem.",
    "verdict": "Niche enough to survive, but needs a recurring revenue hook or it's a one-download wonder."
  }
}
```

---

### `POST /api/followup`
Continue the conversation about the idea.

**Request Body:**
```json
{
  "message": "What if I added a plant trading marketplace feature?",
  "conversation_history": [
    { "role": "user", "content": "Roast this idea: ..." },
    { "role": "model", "content": "{ ...previous roast... }" }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "NOW we're talking! A plant trading marketplace adds community AND recurring activity. That's your retention fix right there. Think Depop but for plants — that's actually fundable."
}
```

---

## 🧪 Testing with Postman

1. Open Postman and create a new collection called `RoastBot 3000`
2. Set base URL to `http://localhost:3000`
3. Create three requests:

| Method | Endpoint | Body |
|---|---|---|
| GET | `/api/health` | None |
| POST | `/api/roast` | `{ "idea": "your idea here" }` |
| POST | `/api/followup` | `{ "message": "...", "conversation_history": [] }` |

4. Set `Content-Type: application/json` header on POST requests

---

## ⚠️ Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `404 model not found` | Wrong model name | Use `gemini-2.0-flash` |
| `429 Too Many Requests` | Free tier quota hit | Wait 1 minute or upgrade API plan |
| `JSON parse error` | Gemini truncated response | Increase `maxOutputTokens` to `8192` |
| `Bot malfunction` | Gemini returned non-JSON | Add stricter JSON cleaning in server.js |
| Frontend can't reach backend | CORS blocked | Ensure `app.use(cors({ origin: "*" }))` |

---

## 🔮 Potential Future Features

- [ ] Idea history — save and revisit past roasts
- [ ] Shareable roast cards with generated images
- [ ] Side-by-side idea comparison mode
- [ ] Weekly idea challenge with community voting

---

## 👨‍💻 Author

Built as a Final Project for AI Workshop  
Stack: Node.js · Express · Gemini AI · Vanilla JS

---

## 📄 License

MIT License — do whatever you want with it, just don't blame me if your idea gets destroyed 🔥

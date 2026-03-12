# 🔥 RoastBot 3000

> A brutally honest AI startup idea critic powered by **Google Gemini AI**, built with **Node.js + Express**.

![RoastBot Banner](https://img.shields.io/badge/Powered%20By-Gemini%20AI-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey?style=for-the-badge)

---

## 📸 Preview

Submit your startup idea → Get roasted, scored, and given real feedback instantly.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔥 **Adaptive Roasting** | Savagery level adjusts based on idea quality (1–10 score) |
| 📊 **Idea Score** | Score from 1–10 with a funny label (e.g. *"Dead on Arrival"*) |
| ✅ **Strengths & Weaknesses** | Honest breakdown of your idea |
| ⚔️ **Competitor Analysis** | Real competitors who'll eat your lunch |
| 🧠 **Survival Tip** | One actionable pivot/improvement suggestion |
| 💬 **Chat Follow-up** | Multi-turn conversation to dig deeper |
| 📋 **Share Roast** | Copy your roast result to clipboard |

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **AI Model:** Google Gemini 1.5 Flash
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **API Testing:** Postman

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/roast-my-idea.git
cd roast-my-idea
```

### 2. Setup Backend
```bash
cd backend
npm install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```
Edit `.env` and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

> 🔑 Get your free Gemini API key at: https://aistudio.google.com/app/apikey

### 4. Start the server
```bash
npm start
# or for development with auto-reload:
npm run dev
```

### 5. Open the app
Open `frontend/index.html` in your browser, or visit `http://localhost:3000`

---

## 📮 API Endpoints

### `GET /api/health`
Check if server is running.

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
  "idea": "An app that uses AI and blockchain to remind you to drink water"
}
```

**Response:**
```json
{
  "success": true,
  "idea": "An app that uses AI and blockchain to remind you to drink water",
  "result": {
    "roast": "Ah yes, the water reminder app with BLOCKCHAIN...",
    "score": 2,
    "score_label": "Dead on Arrival",
    "strengths": ["Health focus is evergreen", "Simple concept is easy to explain"],
    "weaknesses": ["Market is saturated", "Blockchain adds zero value here"],
    "competitors": [
      {
        "name": "WaterMinder",
        "url": "https://waterminder.com",
        "note": "Already does this without the blockchain nonsense"
      }
    ],
    "survival_tip": "Drop the blockchain, niche down to a specific medical condition like kidney stones",
    "verdict": "Delete the blockchain, find a niche, then maybe we'll talk."
  }
}
```

---

### `POST /api/followup`
Continue conversation about the idea.

**Request Body:**
```json
{
  "message": "Okay but what if I target athletes?",
  "conversation_history": [...]
}
```

**Response:**
```json
{
  "success": true,
  "response": "Athletes? Now THAT's a pivot worth exploring..."
}
```

---

## 🧪 Testing with Postman

1. Import the collection or create requests manually
2. Base URL: `http://localhost:3000`
3. All POST requests use `Content-Type: application/json`

### Example Postman Collection:
```
GET  http://localhost:3000/api/health
POST http://localhost:3000/api/roast     → body: { "idea": "your idea here" }
POST http://localhost:3000/api/followup  → body: { "message": "follow up question", "conversation_history": [] }
```

---

## 🎛️ Gemini AI Parameters

| Parameter | Value | Reason |
|---|---|---|
| `model` | `gemini-1.5-flash` | Fast response, cost-efficient |
| `temperature` | `0.9` | High creativity for varied roasts |
| `topP` | `0.95` | Diverse token sampling |
| `topK` | `40` | Balanced vocabulary |
| `maxOutputTokens` | `1024` | Enough for full structured response |

---

## 📁 Project Structure

```
roast-my-idea/
├── backend/
│   ├── server.js          # Main Express server + Gemini AI logic
│   ├── package.json       # Dependencies
│   ├── .env.example       # Environment variables template
│   └── .env               # Your actual env (not committed)
├── frontend/
│   └── index.html         # Single-file frontend (HTML + CSS + JS)
├── .gitignore
└── README.md
```

---

## 👨‍💻 Author

Built for AI Workshop Final Project  
Powered by Google Gemini AI 🤖

---

## 📄 License

MIT License

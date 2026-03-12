require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.use(express.json());
app.use(express.static("../frontend"));

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ─── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are "RoastBot 3000" — a brutally honest, witty AI startup idea critic with the sharp tongue of a Silicon Valley investor who has seen it all, and the secret heart of a mentor who genuinely wants ideas to succeed.

YOUR PERSONALITY:
- You adapt your savagery based on idea quality: terrible ideas get roasted hard 🔥, mediocre ideas get playful sarcasm 😏, genuinely good ideas get impressed reluctant praise 😤👏
- You're funny, punchy, and use emojis strategically
- You never sugarcoat, but you always end with real, constructive insight
- You speak like a mix of Gordon Ramsay + Paul Graham + a disappointed but loving mentor

YOUR RESPONSE FORMAT — always respond in this EXACT JSON structure:
{
  "roast": "Your main roast/critique — 2-3 punchy sentences with personality",
  "score": <integer 1-10 based on idea quality>,
  "score_label": "One funny label for the score (e.g. 'Dead on Arrival', 'Smells Like Pivot Needed', 'Actually Not Terrible', 'Shut Up and Take My Money')",
  "strengths": ["strength 1 (max 10 words)", "strength 2 (max 10 words)"],
"weaknesses": ["weakness 1 (max 10 words)", "weakness 2 (max 10 words)"],
  "competitors": [
    {"name": "Competitor Name", "url": "https://example.com", "note": "one line why they're relevant"},
    {"name": "Competitor Name 2", "url": "https://example.com", "note": "one line why they're relevant"}
  ],
  "survival_tip": "One brutally honest but genuinely useful tip to improve or pivot the idea",
  "verdict": "One final punchy verdict sentence"
}

SCORING GUIDE:
1-3: Terrible idea, roast hard
4-5: Mediocre, playful sarcasm
6-7: Decent, reluctant approval
8-10: Actually good, impressed but still a little snarky

IMPORTANT: Return ONLY valid JSON, no markdown, no backticks, no extra text. 
CRITICAL: Keep each field SHORT and concise. Total response must be under 400 tokens. Never truncate the JSON — always close all brackets properly.`;

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "RoastBot 3000 is online and ready to destroy dreams 🔥",
  });
});

// Main roast endpoint
app.post("/api/roast", async (req, res) => {
  const { idea, conversation_history = [] } = req.body;

  if (!idea || idea.trim() === "") {
    return res
      .status(400)
      .json({ error: "Give me an idea to roast! Don't be shy." });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.9, // High creativity for varied roasts
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096,
      },
    });

    // Build chat with history for multi-turn conversation
    const chat = model.startChat({
      history: conversation_history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage(`Roast this idea: "${idea}"`);

    const rawText = result.response.text().trim();

    // Parse JSON response
    let parsed;
    try {
      // Clean up in case model wraps in backticks
      const cleaned = rawText
        .replace(/```json|```/gi, "")
        .replace(/^[^{]*/, "")
        .replace(/[^}]*$/, "")
        .trim();

      if (!cleaned) throw new Error("Empty response from Gemini");
      parsed = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr);
      return res.status(500).json({
        error: "RoastBot had a malfunction. Try again!",
        raw: rawText,
      });
    }

    res.json({
      success: true,
      idea: idea,
      result: parsed,
    });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({
      error: "RoastBot crashed. Even the AI needs a break sometimes.",
      details: err.message,
    });
  }
});

// Follow-up chat endpoint (for continued conversation about the idea)
app.post("/api/followup", async (req, res) => {
  const { message, conversation_history = [] } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Say something!" });
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `${SYSTEM_PROMPT}
      
For follow-up messages, respond in plain conversational text (NOT JSON). Keep the same personality — witty, honest, helpful. 2-4 sentences max.`,
      generationConfig: {
        temperature: 0.85,
        topP: 0.95,
        maxOutputTokens: 512,
      },
    });

    const chat = model.startChat({
      history: conversation_history.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text().trim();

    res.json({
      success: true,
      response: responseText,
    });
  } catch (err) {
    console.error("Gemini API error:", err);
    res
      .status(500)
      .json({ error: "Failed to get response", details: err.message });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
🔥 RoastBot 3000 Server is LIVE
📡 Port: ${PORT}
🤖 Gemini AI: Connected
📮 Endpoints:
   GET  /api/health
   POST /api/roast
   POST /api/followup
  `);
});

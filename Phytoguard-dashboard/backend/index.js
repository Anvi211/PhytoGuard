import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";

dotenv.config();

/* =========================
   HELPER FUNCTION
========================= */
function convertDriveLink(url) {
  if (!url) return url;

  const match = url.match(/\/d\/([^/]+)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=download&id=${match[1]}`;
  }

  return url;
}

/* =========================
   FIREBASE INITIALIZATION
========================= */
const serviceAccount = JSON.parse(
  fs.readFileSync("./firebaseKey.json", "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://plantcaresystem-1e3e3-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.database();

/* =========================
   EXPRESS SETUP
========================= */
const app = express();
app.use(cors());
app.use(express.json());

console.log(
  "OpenRouter key loaded:",
  process.env.OPENROUTER_API_KEY ? "YES" : "NO"
);

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("Plant Pest Detection Backend Running ✅");
});

/* =========================
   DETECT FROM FIREBASE
========================= */
app.post("/api/detect-from-firebase", async (req, res) => {
  try {
    console.log("📡 Reading latest image from Firebase...");

    const snapshot = await db.ref("PlantSystem/mlResult").once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "No data found in mlResult" });
    }

    const data = snapshot.val();
    const keys = Object.keys(data);

    if (keys.length === 0) {
      return res.status(404).json({ error: "No records found" });
    }

    // ✅ Only process latest entry
    const latestKey = keys[keys.length - 1];
    const item = data[latestKey];

    // ✅ Skip if already processed
    if (item.recommendation) {
      console.log("⏭ Already processed");
      return res.json({
        message: "Latest image already processed ✅",
        key: latestKey
      });
    }

    const rawImageUrl = item?.image_url;

    if (!rawImageUrl) {
      return res.status(400).json({ error: "image_url missing" });
    }

    const imageUrl = convertDriveLink(rawImageUrl);
    console.log("🖼 Processing:", imageUrl);

    const detectedDisease = "Early Blight";

    const prompt = `
You are an agriculture expert.

Disease detected: ${detectedDisease}

1. Brief explanation
2. Chemical pesticides
3. Organic pesticides
4. Dosage
5. Safety precautions

Respond clearly with headings.
`;

    /* =========================
       OPENROUTER API CALL
    ========================= */

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000); // 20 sec timeout

    const aiResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: prompt }]
        }),
        signal: controller.signal
      }
    );

    clearTimeout(timeout);

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("❌ OpenRouter error:", errorText);
      return res.status(500).json({ error: "AI request failed" });
    }

    const aiData = await aiResponse.json();

    const recommendation =
      aiData?.choices?.[0]?.message?.content || "No AI response";

    /* =========================
       SAVE RESULT TO FIREBASE
    ========================= */

    await db.ref(`PlantSystem/mlResult/${latestKey}`).update({
      image_url: imageUrl,
      detectedDisease,
      recommendation,
      timestamp: Date.now()
    });

    console.log("✅ AI result saved to Firebase");

    res.json({
      message: "Latest image processed successfully ✅",
      key: latestKey
    });

  } catch (err) {
    console.error("🔥 FULL ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = 5050;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
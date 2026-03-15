import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import twilio from "twilio";

const app = express();
app.use(cors());
app.use(express.json());

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.post("/send-sms", async (req, res) => {
  const { message, to } = req.body;

  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to,
    });

    res.status(200).json({ success: true, sid: response.sid });
  } catch (error) {
    console.error("Twilio Error:", error.message);
    res.status(500).json({ success: false });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT);
});
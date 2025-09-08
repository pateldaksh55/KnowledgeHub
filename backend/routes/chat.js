import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const client = new Groq({
  apiKey: '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', // Update with your actual key
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const chatCompletion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // updated to supported model
      messages: [
        { role: "system", content: "You are a helpful AI tutor." },
        { role: "user", content: message },
      ],
    });

    res.json({
      reply: chatCompletion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;

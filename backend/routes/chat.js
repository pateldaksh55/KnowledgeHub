import express from "express";
import Groq from "groq-sdk";

const router = express.Router();

const client = new Groq({
  apiKey: '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',
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const chatCompletion = await client.chat.completions.create({
      model: "llama3-70b-8192", // free Groq model
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

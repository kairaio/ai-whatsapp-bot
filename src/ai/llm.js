import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY_AI || "");

export async function generateAIResponse(history) {
  if (!process.env.API_KEY_AI) {
    const lastMessage = history[history.length - 1]?.content || "";
    return `[Demo Mode] Bot menerima pesan: "${lastMessage}". (Konfigurasi API_KEY_AI diperlukan.)`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
    });

    const result = await chat.sendMessage(history[history.length - 1].content);
    return result.response.text();
  } catch (error) {
    console.error("[Gemini Error]", error);
    return "Maaf, sistem AI sedang mengalami gangguan.";
  }
}

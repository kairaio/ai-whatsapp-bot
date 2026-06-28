import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const client = apiKey
  ? new OpenAI({ apiKey })
  : null;

/**
 * Menghasilkan respons AI menggunakan OpenAI GPT-5
 * @param {Array} history
 */
export async function generateAIResponse(history) {
  if (!client || !apiKey) {
    const lastMessage = history[history.length - 1]?.content || "";

    return `[Demo Mode] Bot menerima pesan: "${lastMessage}". (Konfigurasi OPENAI_API_KEY diperlukan.)`;
  }

  try {
    const messages = [
      {
        role: "system",
        content:
          "Anda adalah asisten virtual WhatsApp yang ramah, profesional, membantu, dan menjawab dalam bahasa yang digunakan pengguna."
      },
      ...history
    ];

    const response = await client.responses.create({
      model: "gpt-5",
      input: messages
    });

    return response.output_text || "Maaf, saya tidak dapat menjawab saat ini.";

  } catch (error) {
    console.error("[OpenAI Error]", error);
    return "Maaf, sistem AI sedang mengalami gangguan.";
  }
}

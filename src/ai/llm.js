import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Inisialisasi Google Gen AI menggunakan API Key dari file .env
const apiKey = process.env.API_KEY_AI;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Menghasilkan respons menggunakan Google Gemini AI asli
 * @param {Array} history - Riwayat percakapan [{role: 'user'|'assistant', content: '...'}]
 */
export async function generateAIResponse(history) {
  // Pengaman jika API Key tidak terpasang (Sangat bagus untuk keamanan Portofolio Publik)
  if (!ai || !apiKey || apiKey.includes('masukkan_api_key_ai')) {
    const lastMessage = history[history.length - 1].content;
    return `[Demo Mode] Bot menerima pesan: "${lastMessage}". (Konfigurasi API Key diperlukan untuk respons pintar).`;
  }

  try {
    // 1. Format ulang riwayat chat agar sesuai dengan standar Google Gemini API
    const contents = history.map(chat => ({
      role: chat.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: chat.content }]
    }));

    // 2. Berikan instruksi dasar (System Instruction) agar bot bertindak profesional
    const systemInstruction = "Anda adalah asisten virtual WhatsApp pintar yang ramah, profesional, dan membantu untuk operasional bisnis.";

    // 3. Panggil model Gemini terbaru (gemini-2.5-flash) yang sangat cepat dan efisien
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Membuat respons terasa natural tapi tetap terarah
      }
    });

    return response.text || "Maaf, saya tidak menangkap maksud Anda.";

  } catch (error) {
    console.error('[Gemini AI Error]:', error);
    return "Maaf, sistem AI sedang mengalami gangguan teknis sejenak.";
  }
}

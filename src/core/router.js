import { getUserContext } from './context.js';
import { generateAIResponse } from '../ai/llm.js';

export function handleIncomingMessage(sock) {
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const jid = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (!text) return;

    console.log(`[Pesan Masuk] ${jid}: ${text}`);

    const userContext = getUserContext(jid);
    userContext.history.push({ role: 'user', content: text });

    const aiReply = await generateAIResponse(userContext.history);

    userContext.history.push({ role: 'assistant', content: aiReply });

    await sock.sendMessage(jid, { text: aiReply });
  });
}

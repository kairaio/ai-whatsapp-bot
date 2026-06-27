import makeWASocket, { useMultiFileAuthState } from '@whiskeysockets/baileys';

export async function createClient(deviceId) {
  const { state, saveCreds } = await useMultiFileAuthState(`./auth-${deviceId}`);

  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true, 
    syncFullHistory: false,
  });

  sock.ev.on('creds.update', saveCreds);

  return sock;
}

export function getUserContext(userId) {
  if (!global.userContexts) {
    global.userContexts = {};
  }
  if (!global.userContexts[userId]) {
    global.userContexts[userId] = {
      history: [],
      lastInteraction: Date.now()
    };
  }
  return global.userContexts[userId];
}

import dotenv from 'dotenv';
import qrcode from 'qrcode-terminal';
import { createClient } from './src/core/context.js';
import { handleIncomingMessage } from './src/core/router.js';

dotenv.config();

async function startBot() {
  console.log('=== Menyambungkan ke Sistem WhatsApp ===');
  try {
    const sock = await createClient('main-bot');

    sock.ev.on('connection.update', (update) => {
      const { connection, qr } = update;

      // MENANGKAP DAN MENCETAK QR SECARA MANUAL
      if (qr) {
        console.log('\n[WhatsApp] DIBAWAH INI ADALAH QR CODE ANDA, SILAKAN SCAN:');
        qrcode.generate(qr, { small: true });
      }

      if (connection === 'open') {
        console.log('[WhatsApp] Bot sukses terhubung dan siap digunakan!');
        handleIncomingMessage(sock);
      }

      if (connection === 'close') {
        console.log('[WhatsApp] Koneksi terputus, mencoba menyambungkan ulang...');
        startBot();
      }
    });
  } catch (error) {
    console.error('Terjadi error pada startup:', error);
  }
}

startBot();

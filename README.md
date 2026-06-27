<div align="center">

# 🤖 WhatsApp AI Core (Enterprise Stack)
   
[![Node.js Version](https://img.shields.io/badge/Node.js-v24.14.0-green.svg?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![Engine](https://img.shields.io/badge/Engine-Baileys_v5-orange.svg?style=for-the-badge&logo=whatsapp)](https://github.com/WhiskeySockets/Baileys)
[![Model](https://img.shields.io/badge/Model-Gemini_2.5_Flash-blue.svg?style=for-the-badge&logo=google-gemini)](https://aistudio.google.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg?style=for-the-badge)](https://github.com/kairaio)

<p align="center">
  <b>Arsitektur backend production-ready untuk otomatisasi layanan pelanggan dan agen penjualan berbasis kecerdasan buatan.</b>
</p>

---
</div>

## 📑 Daftar Isi
* [Gambaran Umum](#-gambaran-umum)
* [Matriks Fitur & Kapabilitas](#-matriks-fitur--kapabilitas)
* [Arsitektur Direktori](#-arsitektur-direktori)
* [Spesifikasi Teknis](#-spesifikasi-teknnis)
* [Instalasi & Penyebaran](#-instalasi--penyebaran)
* [Kebijakan Lisensi & Hak Cipta](#-kebijakan-lisensi--hak-cipta)

---

## 🔍 Gambaran Umum

Sistem ini dirancang untuk menjembatani komunikasi *real-time* WhatsApp melalui soket terisolasi dengan model bahasa besar (**Large Language Model**). Mengutamakan skalabilitas, retensi memori per pengguna (*stateful context*), serta proteksi ketat terhadap kredensial komersial untuk kebutuhan portofolio industri.

---

## 📊 Matriks Fitur & Kapabilitas

| Fitur Utama | Deskripsi Teknis | Status |
| :--- | :--- | :---: |
| **Multi-Device Connection** | Sinkronisasi soket tanpa ketergantungan konstan pada perangkat utama via Baileys. | 🟢 Active |
| **Contextual AI Brain** | Integrasi native SDK `@google/genai` menggunakan model hemat daya & latensi rendah `gemini-2.5-flash`. | 🟢 Active |
| **Isolated Session Registry** | Pemisahan penyimpanan berkas autentikasi (`auth-*`) berbasis *file-system* independen. | 🟢 Active |
| **Dynamic History Routing** | Pengelolaan memori percakapan beruntun (*array session storage*) per *User JID*. | 🟢 Active |

---

## 📂 Arsitektur Direktori

Desain struktural mengadopsi prinsip pemisahan tanggung jawab (*Separation of Concerns*):

```text
├── src/
│   ├── core/
│   │   ├── context.js      # Manajemen status enkapsulasi & inisialisasi soket
│   │   └── router.js       # Interseptor pesan masuk dan distribusi muatan
│   └── ai/
│       └── llm.js          # Driver integrasi Google Generative AI
├── .env.example            # Blueprint konfigurasi variabel lingkungan
├── .gitignore              # Proteksi perimeter untuk token & API Key rahasia
├── index.js                # Titik masuk utama instruksi runtime
├── package.json            # Manifestasi dependensi & dependensi pengembangan
└── README.md               # Dokumentasi teknis sistem
```

## ⚙️ Spesifikasi Teknis

* **Runtime Environment:** Node.js `>= 24.x.x`
* **Format Sistem Modul:** ECMAScript Modules (ESM) (`"type": "module"`)
* **Protokol Komunikasi:** WebSocket via `@whiskeysockets/baileys`
* **Infrastruktur AI:** Google Gen AI SDK (`@google/genai`)

## 🚀 Instalasi & Penyebaran

```
git clone [https://github.com/kairaio/ai-whatsapp-bot.git](https://github.com/kairaio/ai-whatsapp-bot.git)
cd ai-whatsapp-bot
npm install
```
Buat file bernama `.env` pada direktori root aplikasi:
```
PORT=3000
API_KEY_AI=masukkan_token_gemini_ai_studio_anda
```
```
# Menjalankan bot di lingkungan pengembangan
node index.js
```
 ### **PROPRIETARY & COMMERCIAL LICENSE NOTICE**
 
 **© 2026 Kaira. Hak Cipta Dilindungi Undang-Undang.**
 
Seluruh kode sumber, pola arsitektur, dan dokumentasi yang terdapat dalam repositori ini merupakan hak milik intelektual sah dari **Kaira**.
 
 * **Restriksi Penggunaan:** Repositori ini dipublikasikan secara terbuka eksklusif sebagai instrumen portofolio teknis dan bukti kompetensi rekayasa perangkat lunak.
 * **Larangan Keras:** Dilarang mendistribusikan ulang, mereplikasi, memodifikasi, memperjualbelikan, atau memanfaatkan aset kode ini untuk kepentingan komersial entitas lain tanpa persetujuan tertulis formal dari pemilik hak cipta.
 * **Penegakan Hukum:** Pelanggaran terhadap ketentuan ini akan diproses secara hukum berdasarkan undang-undang perlindungan hak kekayaan intelektual yang berlaku.

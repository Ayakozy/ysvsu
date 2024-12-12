const fs = require('fs');
const path = require('path');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    const userbotDir = './system/userbot/';
    
    // Mengambil semua folder di dalam direktori userbot
    const folders = fs.readdirSync(userbotDir).filter(file => 
        fs.statSync(path.join(userbotDir, file)).isDirectory()
    );

    // Mengurutkan folder secara alfabetis
    folders.sort();

    // Memeriksa apakah ada folder
    if (folders.length === 0) {
        conn.reply(m.chat, 'Tidak ada user bot yang ditemukan.', m);
    } else {
        // Membuat daftar folder dengan urutan numerik dan simbol @ di pinggir kanan
        const userBotList = folders.map((folder, index) => `${index + 1}. @${folder.split('@')[0]}`).join('\n');
        conn.reply(m.chat, `*LIST USER BOT*\n\n${userBotList}`, m);
    }
}

handler.command = handler.help = ['listjadibot'];
handler.tags = ['jadibot'];

module.exports = handler;
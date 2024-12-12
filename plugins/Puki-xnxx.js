const axios = require("axios");
const fs = require('fs');

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `• *Example :* ${usedPrefix}${command} steepmom`;   
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    let kemii = await fetch(`https://api.lolhuman.xyz/api/xnxxsearch?apikey=${global.lolkey}&query=${text}`)
    var res = await kemii.json()
    var result = res.result
    let responseText = `*XNXX - SEARCH - RESULT*\n\n`;
    result.forEach((track, index) => {
        responseText += `*${index + 1}.* ${track.title}\n`;
        responseText += '```Uploader : ```' + `${track.uploader}\n`;
        responseText += '```Views : ```' + `${track.views}\n\n`;
    });
    responseText += `Reply to this message with the number to get the video link.`;
    const { key } = await conn.reply(m.chat, responseText, m);
    conn.xnxxplay[m.sender] = { result, key };
};

handler.before = async (m, { conn }) => {
    conn.xnxxplay = conn.xnxxplay ? conn.xnxxplay : {};
    if (m.isBaileys || !(m.sender in conn.xnxxplay)) return;
    const { result, key } = conn.xnxxplay[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    const inputNumber = Number(choice);
    if (inputNumber >= 1 && inputNumber <= result.length) {
        const selectedTrack = result[inputNumber - 1];
        try {            
            let kemii = await fetch(`https://skizo.tech/api/xnxxdl?url=${encodeURIComponent(selectedTrack.link)}&apikey=${global.xzn}`)
            let res = await kemii.json()  
            conn.sendFile(m.chat, res.url, 'xnxx.mp4', '', m) 
            // Delete number list
            conn.sendMessage(m.chat, { delete: key });
            delete conn.xnxxplay[m.sender];
        } catch (error) {
            console.error('Error downloading and sending audio:', error);
            await conn.reply(m.chat, 'Error.', m);
        }
    } else {
        await conn.reply(m.chat, "Umm", m);
    }
};

handler.help = ['xnxx *<text>*'];
handler.tags = ['premium'];
handler.command = /^xnxx$/i;
handler.limit = true;
handler.premium = true
module.exports = handler;
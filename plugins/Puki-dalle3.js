let fetch = require('node-fetch')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} dog.`, m)
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    const requestBody = {
        prompt: text
    };
    const response = await fetch('https://api.itsrose.life/image/bing_create_image', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `${global.rose}`
    }
    });
    const hasil = await response.json();
    for (let i of hasil.result.images) {
    await conn.sendFile(m.chat, i, 'dalle3.jpg', done, m)
    }
};
handler.help = ["create *<text>*"]
handler.tags = ["diffusion","ai"]
handler.command = ["create"]
handler.premium = false

module.exports = handler
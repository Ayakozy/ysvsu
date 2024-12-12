let axios = require('axios');

let handler = async (m, { conn, usedPrefix, command, text }) => {
  if (!text) return conn.reply(m.chat, '• *Example :* .ai hello', m)
  let Puki = await conn.reply(m.chat, '```Sedang mencari jawaban...🔍```', m)
  let hasil = await openai(text)
  await conn.sendMessage(m.chat, { text: `${hasil.result}`.trim(), edit: Puki })
}
handler.command = /^ai$/i
handler.help = ['ai *<text>*']
handler.tags = ['tools','ai']
handler.register = false
handler.limit = true

module.exports = handler

async function openai(text) {
  try {
    const { data } = await axios.get(`https://tools.betabotz.org/tools/openai?q=${text}`, {
      headers: {
        'accept': 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return 'Internal Server Error!';
  }
}
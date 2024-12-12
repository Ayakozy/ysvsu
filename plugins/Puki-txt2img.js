const fetch = require('node-fetch')

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} 1girl, solo, ponytail, blush.`, m)
	conn.chatRead(m.chat)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  let url = `https://aemt.me/ai/text2img?text=${encodeURIComponent(text)}`
  let image = (await (await fetch(url)).buffer()).toString('base64')
  conn.sendFile(m.chat, `data:image/jpeg;base64,${image}`, 'freefire.jpg', '```Prompt:```' + ' `'+text+'`', m)
}

handler.help = ['txt2img *<text>*'];
handler.command = /^txt2img$/i;
handler.tags = ['internet','ai'];
handler.register = true;
handler.premium = false;
handler.limit = true;

module.exports = handler;
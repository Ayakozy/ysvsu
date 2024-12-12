let xfar = require('xfarr-api');
let handler = async (m, { usedPrefix, command, conn, text }) => {
  if (!text) return conn.reply(m.chat, `• *Example :* ${usedPrefix}${command} kikuchanj`, m)
  conn.sendMessage(m.chat, {
      react: {
          text: '🕒',
          key: m.key,
      }
  })
  xfar.Pinterest(text).then(async data => {
    conn.sendFile(m.chat, data.url, 'pin.jpg', '```Result from: ```'+' `'+text+'`', m);
  });
};
handler.help = ['pinterest *<text>*'];
handler.tags = ['internet', 'downloader'];
handler.command = /^(pinterest|pin)$/i
module.exports = handler;
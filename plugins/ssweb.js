var fs = require('fs');
var path = require('path');
var fetch = require('node-fetch');
var handler = async (m, { conn, command, args }) => {
  if (!args[0]) return conn.reply(m.chat, 'Input URL!', m);
  if (args[0].match(/xnxx\.com|hamster\.com|nekopoi\.care/i)) {
    return conn.reply(m.chat, 'Link tersebut dilarang!', m);
  }
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
    let ss = `https://api.apiflash.com/v1/urltoimage?access_key=80145ab3eded44bdb0dbb14ee209f3b8&wait_until=page_loaded&url=${args[0]}`
    conn.sendFile(m.chat, ss, '', done, m)
}
handler.help = ['ssweb','sspc'];
handler.tags = ['tools'];
handler.command = ['ssweb', 'sspc', 'ss',]

handler.limit = true;
handler.fail = null;

module.exports = handler;

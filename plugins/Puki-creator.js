let { MessageType } = require('@whiskeysockets/baileys')
let PhoneNumber = require('awesome-phonenumber')
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let list = [{
      displayName: "Costumer - Service",
      vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:Puki\nFN:Puki\nitem1.TEL;waid=${nomorown}:${nomorown}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:dcode.Puki@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:http://github.com/decode-Puki\nitem3.X-ABLabel:Internet\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`,
      }]    
   conn.sendMessage(m.chat, {
            contacts: {
                displayName: `Puki`,
                contacts: list
            }
        }, { quoted: m })
}
handler.help = ['owner']
handler.tags = ['info']

handler.command = /^(owner)$/i

module.exports = handler
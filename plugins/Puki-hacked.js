const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@whiskeysockets/baileys")

let handler = async (m, { conn, args, text, usedPrefix: _p, command, isROwner }) => {

switch (command) {
case "hacked": {
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let teks = `GRUP TELAH DIRETAS BY PUKI!!`
const { generateProfilePicture } = require("../lib/functions.js")
const { img } = await generateProfilePicture("https://telegra.ph/file/5bb3481b58c555383db7a.jpg")
await conn.query({ tag: "iq",  attrs: { to: m.chat, type:"set", xmlns: "w:profile:picture"}, content: [{ tag: "picture", attrs: { type: "image" }, content: img }]})
await conn.groupUpdateSubject(m.chat, "THE GROUP HAS BEEN HACKED")
await conn.groupUpdateDescription(m.chat, teks)
await conn.reply('Done Kang')
}
break
}
}
handler.help = [
"hacked"
]
handler.help = ['hacked']
handler.tags = ['premium','bug']
handler.command = /^(hacked)$/i
handler.group = true
handler.premium = true
module.exports = handler
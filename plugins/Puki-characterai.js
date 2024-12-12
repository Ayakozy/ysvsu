let fetch = require('node-fetch')
let handler = async(m, { conn, text , command }) => {
if (command == 'rimuru') {
if (!text) return conn.reply(m.chat, `.${command} hallo rimuru`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=rimuru`)
let Puki = await res.json()
conn.reply(m.chat, `${Puki.result}`, m)
}
if (command == 'Puki') {
if (!text) return conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=Puki`)
let Puki = await res.json()
conn.reply(m.chat, `${Puki.result}`, m)
}
if (command == 'jokowi') {
if (!text) return conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=jokowi`)
let Puki = await res.json()
conn.reply(m.chat, `${Puki.result}`, m)
}
if (command == 'megawati') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=megawati`)
let Puki = await res.json()
conn.reply(m.chat, `${Puki.result}`, m)
}
if (command == 'yaemiko') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=yaemiko`)
let Puki = await res.json()
conn.reply(m.chat, `${Puki.result}`, m)
}
if (command == 'kiku') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=kiku`)
let Puki = await res.json()
conn.reply(m.chat, `${Puki.result}`, m)
}
if (command == 'paimon') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=paimon`)
let Puki = await res.json()
conn.reply(m.chat, `${Puki.result}`, m)
}
if (command == 'putin') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=putin`)
let Puki = await res.json()
conn.reply(m.chat, `${Puki.result}`, m)
}
if (command == 'lisa') {
if (!text) conn.reply(m.chat, `.${command} hallo`, m)
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let res = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${text}&name=lisa`)
let Puki = await res.json()
conn.reply(m.chat, `${Puki.result}`, m)
}
}
handler.help = ['rimuru','Puki','jokowi','megawati','yaemiko','paimon','kiku','putin','lisa'].map(v => v + ' *<teks>*')
handler.command = /^rimuru|Puki|jokowi|megawati|yaemiko|paimon|kiku|putin|lisa$/i
handler.tags = ['ai']
handler.limit = true

module.exports = handler
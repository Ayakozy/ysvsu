let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  if (!text) return conn.reply(m.chat, '• *Example :* .heroml balmond', m)
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    let Puki = await fetch(`https://api.yanzbotz.my.id/api/cari/hero?query=${text}`)
    let res = await Puki.json()
    let capt = `乂  *H E R O  M L*\n\n`
    capt += `	◦	*Release* : ${res.result.release}\n`
    capt += `	◦	*Role* : ${res.result.role}\n`
    capt += `	◦	*Specialty* : ${res.result.specialty}\n`
    capt += `	◦	*Lane* : ${res.result.lane}\n`
    capt += `	◦	*Price* : ${res.result.price}\n`
    capt += `	◦	*Durability* : ${res.result.gameplay_info.durability}\n`
    capt += `	◦	*Offense* : ${res.result.gameplay_info.offense}\n`
    capt += `	◦	*Gender* : ${res.result.story_info_list.gender}\n\n`

    conn.sendFile(m.chat, res.result.hero_img, 'heroml.jpg', `${capt}`, m)
}
handler.help = ['heroml'].map(v => v + ' *<name>*')
handler.tags = ['internet']
handler.command = /^(heroml)$/i

module.exports = handler
let fetch = require('node-fetch')
let uploadImage = require('../lib/uploadImage.js')

let handler = async (m, { conn, usedPrefix, command, text }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return conn.reply(m.chat, `Send/Reply Images with the caption *.${command}*`, m)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  let media = await q.download()
  let url = await uploadImage(media)
  let hasil = await fetch(`https://skizo.tech/api/aimirrorvip?&apikey=${global.xzn}&url=${url}&filter=naruto`)
  let res = await hasil.json()
  let Puki = `_◦ Status_ : ${res.draw_status}
_◦ Time Clear_ : ${res.time_processing}
_◦ Image To_ : ${res.your_choice_filter}`
  await conn.sendFile(m.chat, res.generated_image_addresses, 'naruto.jpg', Puki, m)
}

handler.help = ['jadinaruto *<image>*']
handler.tags = ['convert']
handler.premium = false
handler.command = /^(jadinaruto)$/i
handler.register = true
handler.limit = true
handler.private = false

module.exports = handler
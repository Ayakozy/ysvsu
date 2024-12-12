let fetch = require('node-fetch')
let handler = async function (m, { conn, args, usedPrefix, command }) {
      let users = global.db.data.users[m.sender]
      let name = await conn.getName(m.sender)
      if (users.registered === true) return conn.reply(m.chat, '```✅ Nomor Kamu Udah Terverifikasi```', m)
      if (!args || !args[0]) return conn.reply(m.chat, `• *Example :* .${command} ${global.email}`, m)
      await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})     
      if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ig.test(args[0])) return conn.reply(m.chat, '```🚩 Email Tidak Ada, Harap Gunakan Email Asli !```', m)
      let code = `${getRandomInt(100, 900)}-${getRandomInt(100, 900)}`
      let kemii = conn.user.jid.split("@")[0]
      users.codeExpire = new Date * 1
      users.code = code
      users.email = args[0]
        await fetch("https://send.api.mailtrap.io/api/send/", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 46fae2154055e6df3901c95919531b2a",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "from": {
                        "email": "notifier@boyne.dev",
                        "name": `${global.wm}`
                    },
                    "to": [{
                        "email": args[0],
                        "name": `${name}`
                    }],
                    "subject": "Email Verification",
                    "html": `<div
        style="width: 600px; height: 500px;margin: auto;font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
        <div
            style="line-height: 2; letter-spacing: 0.5px; position: relative; padding: 10px 20px; width: 540px;min-height: 360px; margin: auto; border: 1px solid #DDD; border-radius: 14px;">
            <tt>Halo <b>${name} 👋🏻</b></tt>
            <p>
                Konfirmasi Emailmu Supaya Dapat Menggunakan Fitur Bot, Klik <b>Verifikasi Akun</b> untuk konfirmasi akun mu, Dalam 3 menit tautan itu akan hangus
            </p>
          <div align="center">
            <img src="https://raw.githubusercontent.com/innng/innng/master/assets/kyubey.gif" width="200px" alt="kii">
           </div>
            <a style="cursor: pointer;text-align: center; display: block; width: 160px; margin: 30px auto; padding: 10px 10px; border: 1px solid #00FFFA; border-radius: 14px; color: white; text-decoration: none; font-size: 1rem; font-weight: 500; background-color: blue;"
                href="https://wa.me/${kemii}?text=${code}">Verifikasi Akun</a>
            <span style="display: block;">Jika Kamu Tidak Melakukan Tindakan Itu,
Silakan Abaikan <br>Email Ini
<br>
<br>
Jika Kamu Memiliki Masalah, Silahkan Hubungin Saya Via <span
                    style="color: #4D96FF;"><a href="https://api.whatsapp.com/send?phone=6283877118785">WhatsApp</a></span></span>
            <span style="display: block;"><br>By,<br>KiiCode</span>
        </div>
    </div>
    `,
                    "category": "Notification"
                })
            })
            .then(response => response.json())
         return conn.reply(m.sender, '```✅ Email verifikasi Sudah Terkirim \nCek Email Untuk Melanjutkan Verifikasi!```', m)
    }
handler.help = ['reg *<email>*']
handler.tags = ['start']

handler.command = /^(reg|regmail)$/i
handler.private = false

module.exports = handler

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
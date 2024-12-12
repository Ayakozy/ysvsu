let fetch = require('node-fetch')

let handler = async (m, { conn, isOwner, usedPrefix, command, args, text }) => {
if (!text) return m.reply(`• *Example :* ${usedPrefix}${command} 10000`)
if (text < 10000) return m.reply('```Minimal Deposit Rp 10.000```')
conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
let user = global.db.data.users[m.sender];
let Puki = await (await fetch("https://api.neoxr.eu/api/topup-ovo?number=085141316864&amount=" + text)).json();
let buffer = await Buffer.from(Puki.data.qr_image, "base64");
let teks = 'Info Pembayaran\n\n'
teks += 'Pembayaran Sebelum : ' + `${Puki.data.expired_at}\n\n`
teks += '• ID Pembayaran : ' + `${Puki.data.id}\n`
teks += '• Total Pembayaran : ' + `${Puki.data.price_format}\n\n`
teks += 'Note : \n'
teks += '• Kode QR hanya valid untuk 1 kali transfer.\n'
teks += '• Setelah pembayaran harap, tunggu 30 detik.\n'
teks += '• Jika pembayaran berhasil, status akan diperbarui otomatis\n'
teks += '• Untuk bantuan lebih lanjut, hubungi *.owner*\n\n'
let { key } = await conn.sendFile(m.chat, buffer, 'deposit.jpg', teks, m)
let topup = await (await fetch(`https://api.neoxr.eu/api/topup-check?id=${Puki.data.id}&code=${Puki.data.code}`)).json();
if (topup.data.status === "SUCCEEDED") {
user.saldo += text
let ss = '```Pembayaran succes anda menerima saldo sejumlah : ```' + `Rp. ${toRupiah(text)}`
await conn.reply(m.chat, ss, key)
}
}
handler.help = ['deposit *<amount>*']
handler.tags = ['store','main']

handler.command = /^(deposit|depo)$/i
handler.register = true
handler.limit = 5
module.exports = handler

function toRupiah(angka) {
var saldo = '';
var angkarev = angka.toString().split('').reverse().join('');
for (var i = 0; i < angkarev.length; i++)
if (i % 3 == 0) saldo += angkarev.substr(i, 3) + '.';
return '' + saldo.split('', saldo.length - 1).reverse().join('');
}
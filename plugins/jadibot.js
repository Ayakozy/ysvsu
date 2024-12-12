let baileys = require("@whiskeysockets/baileys");
let { useMultiFileAuthState, DisconnectReason } = baileys;
let NodeCache = require("node-cache");
let Pino = require("pino");
let simple = require('../lib/simple');
let fs = require("fs");

if (!(global.conns instanceof Array)) global.conns = [];

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
    conn.reply(m.chat, '```Tunggu Sedang Menyiapkan Code Jadibot...```', m);
    let conns = global.conn;
    let user = global.db.data.users[m.sender];

    let authFile = 'system/userbot/' + m.sender;
    let isInit = !fs.existsSync(authFile);
    let { state, saveCreds } = await useMultiFileAuthState(authFile);
    let msgRetryCounterCache = new NodeCache();

    const config = {
        logger: Pino({ level: "fatal" }).child({ level: "fatal" }),
        printQRInTerminal: false,
        mobile: false,
        auth: state,
        browser: ["Ubuntu", "Chrome", "20.0.04"],
        markOnlineOnConnect: true,
        generateHighQualityLinkPreview: true,
        msgRetryCounterCache,
        defaultQueryTimeoutMs: undefined
    };

    conn = simple.makeWASocket(config);
    let ev = conn.ev;

    let pairingSent = false; // Flag untuk memastikan pesan pairing hanya dikirim sekali
    let connectionAttempts = 0; // Menghitung jumlah percobaan koneksi

    if (!conn.authState.creds.registered) {
        setTimeout(async () => {
            let codek = await conn.requestPairingCode(parseInt(m.sender.replace(/[^0-9]/g, "")));
            codek = codek?.match(/.{1,4}/g)?.join("-") || codek;
            conns.reply(m.sender, codek, m);
            console.log("code anda adalah: " + codek);
            pairingSent = true; // Tandai bahwa pesan pairing telah dikirim
        }, 3000);
    }

    async function connectionUpdate(update) {
        const { connection, lastDisconnect } = update;
        console.log(update);
        
        if (connection === 'connecting') {
            console.log(`🔄 Menghubungkan...`);
        } else if (connection === 'open') {
            if (!isConnected) { // Hanya kirim pesan jika belum terhubung sebelumnya
                conns.reply(m.sender, '```✅ Tersambung```', m);
                isConnected = true; // Tandai bahwa sudah terhubung
                connectionMessageSent = true; // Tandai bahwa pesan koneksi telah dikirim
            }
            global.conns.push(conn);
            reconnectMessageSent = false; // Reset pesan menyambung ulang
        } else if (connection === 'close') {
            connectionAttempts++; // Increment percobaan koneksi
            if (connectionAttempts < 2) {
                if (!reconnectMessageSent) {
                    conns.reply(m.sender, '```⏱️ Koneksi terputus & mencoba menyambung ulang...```', m);
                    reconnectMessageSent = true; // Tandai bahwa pesan menyambung ulang telah dikirim
                }
                isConnected = false; // Reset status koneksi
                // Coba sambung ulang
                reloadHandler(true);
            } else {
                conns.reply(m.sender, '```❌ Koneksi gagal setelah 2 percobaan. Menghapus folder...```', m);
            }
        }

        if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
            console.log(reloadHandler(true));
        }
    }


    const reloadHandler = function (restatConn) {
        let Handler = require('../handler');
        let handler = require('../handler');
        if (Object.keys(Handler || {}).length) handler = Handler;
        if (restatConn) {
            try { conn.ws.close(); } catch { }
            conn = {
                ...conn,
                ...simple.makeWASocket(config)
            };
        }
        if (!isInit) {
            // Pastikan handler terdaftar sebelum mencoba untuk menghapusnya
            if (conn.handler) conn.ev.off('messages.upsert', conn.handler);
            if (conn.onParticipantsUpdate) conn.ev.off('group-participants.update', conn.onParticipantsUpdate);
            if (conn.connectionUpdate) conn.ev.off('connection.update', conn.connectionUpdate);
            if (conn.credsUpdate) conn.ev.off('creds.update', conn.credsUpdate);
        }

        conn.welcome = 'Hai, @user!\nSelamat datang di grup *@subject*\n\n@desc';        conn.bye = 'Selamat tinggal @user!';
        conn.spromote = '@user sekarang admin!';
        conn.sdemote = '@user sekarang bukan admin!';
        conn.handler = handler.handler.bind(conn);
        conn.onParticipantsUpdate = handler.participantsUpdate.bind(conn);
        conn.connectionUpdate = connectionUpdate.bind(conn);
        conn.credsUpdate = saveCreds.bind(conn);

        conn.ev.on('messages.upsert', conn.handler);
        conn.ev.on('group-participants.update', conn.onParticipantsUpdate);
        conn.ev.on('connection.update', conn.connectionUpdate);
        conn.ev.on('creds.update', conn.credsUpdate);
   isInit = false
   return true
}
    reloadHandler()   
}
handler.help = ['jadibot *<number>*']
handler.tags = ['jadibot']
handler.command = /^jadibot$/i
handler.premium = false
handler.limit = false
handler.owner = false
handler.private = false
module.exports = handler
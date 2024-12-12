let NeoApi = require("@neoxr/wb");
let b = new NeoApi();
let fs = require('fs');
let fetch = require('node-fetch');
let moment = require('moment-timezone');

let handler = m => m;
handler.all = async function (m) {
    let name = await conn.getName(m.sender);
    let pp = global.thumb;
    try {
        pp = await this.profilePictureUrl(m.sender, 'image');
    } catch (e) {
    } finally {
        global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"]);
        global.fetch = require('node-fetch');
        global.Scraper = {
           Bard: require("../lib/scrape/bardie"),
           Ai: require("../lib/scrape/ai")
        }
       
        global.Func = b.Function;
        global.axios = require('axios');

        const _uptime = process.uptime() * 1000;

        global.fkontak = {
            "key": {
                "participants": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
            },
            "message": {
                "contactMessage": {
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        };
    }
};

module.exports = handler;

function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH');
    let res = "malam Sek";
    if (time >= 4) {
        res = "Selamat pagi 🌅";
    }
    if (time > 10) {
        res = "Selamat siang kak ⛅";
    }
    if (time >= 15) {
        res = "selamat sore kak 🌄";
    }
    if (time >= 18) {
        res = "selamat malam kak 🌌";
    }
    return res;
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())];
}
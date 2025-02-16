const axios = require("axios");
const fs = require('fs');
const canvafy = require('canvafy');

const handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) throw `• *Example :* ${usedPrefix}spotif terlambat untuk berdusta`;   
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    const result = await searchSpotify(text);
    const title = result.name
    let responseText = `*SPOTIFY - SEARCH - RESULT*\n\n`;
    result.forEach((track, index) => {
        responseText += `*${index + 1}.* ${track.name}\n`;
        responseText += '```Artist : ```' + `${track.artists}\n`;
        responseText += '```Popularity : ```' + `${track.popularity}%\n\n`;
    });
    responseText += `Reply to this message with the number to get the song link.`;    
    const { key } = await conn.reply(m.chat, responseText, m);   
    conn.spotifPlay[m.sender] = { result, key, title };
};

handler.before = async (m, { conn }) => {
    conn.spotifPlay = conn.spotifPlay ? conn.spotifPlay : {};
    if (m.isBaileys || !(m.sender in conn.spotifPlay)) return;
    const { result, key, title } = conn.spotifPlay[m.sender];
    if (!m.quoted || m.quoted.id !== key.id || !m.text) return;
    const choice = m.text.trim();
    const inputNumber = Number(choice);
    if (inputNumber >= 1 && inputNumber <= result.length) {
        const selectedTrack = result[inputNumber - 1];
        try {
            const start = new Date();
            let url = `https://raiden-api.up.railway.app/api/downloader/spotify?url=${encodeURIComponent(selectedTrack.link)}`;

            let res = await axios.get(url);
            if (!res.data.status === "success") throw res.data.message;

            let audioLink = res.data.data;
            const timeTaken = ((new Date() - start) / 1000).toFixed(2) + ' seconds';

            const durationInSeconds = Math.floor(selectedTrack.duration_ms / 1000);
            const minutes = Math.floor(durationInSeconds / 60);
            const seconds = durationInSeconds % 60;
            const durationText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            const thumbnail = selectedTrack.image;                       
            await conn.sendMessage(m.chat, {
            document: myfile, 
            mimetype: minety, 
            pageCount: 2023,
            fileName: `Duration ${durationText} ( Second )`,
            fileLength: 100000000000000,
            caption: '```Selamat Menikmati Kak...```', 
            contextInfo: {
            forwardingScore: 2023, 
            isForwarded: false,
            externalAdReply: {
            title: '© Kiku-Wabot v5.0.3 (Public Bot)',
            body: 'Kemii',
            mediaType: 1,
            thumbnailUrl: thumbnail,
            containsAutoReply: true,
            renderLargerThumbnail: true,
            showAdAttribution: false,
            }}}, { quoted: m })
            let doc = {
            audio: {
            url: `${audioLink}`
            },
            mimetype: 'audio/mpeg',
            fileName: `${title}`,
            }
            await conn.sendMessage(m.chat, doc, { quoted: m });

            // Delete number list
            conn.sendMessage(m.chat, { delete: key });
            delete conn.spotifPlay[m.sender];
        } catch (error) {
            console.error('Error downloading and sending audio:', error);
            await conn.reply(m.chat, 'An error occurred while downloading and sending audio.', m);
        }
    } else {
        await conn.reply(m.chat, "Invalid sequence number. Please select a number corresponding to the list above.", m);
    }
};

handler.help = ['spotify *<text>*'];
handler.tags = ['music'];
handler.command = /^spotify$/i;
handler.limit = true;
module.exports = handler;

async function searchSpotify(query) {
    try {
        const access_token = await getAccessToken();
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const data = response.data;
        const tracks = data.tracks.items.map(item => ({
            name: item.name,
            artists: item.artists.map(artist => artist.name).join(', '),
            popularity: item.popularity,
            link: item.external_urls.spotify,
            image: item.album.images[0].url,
            duration_ms: item.duration_ms,
        }));
        return tracks;
    } catch (error) {
        console.error('Error searching Spotify:', error);
        throw 'An error occurred while searching for songs on Spotify.';
    }
}

async function getAccessToken() {
    try {
        const client_id = 'acc6302297e040aeb6e4ac1fbdfd62c3';
        const client_secret = '0e8439a1280a43aba9a5bc0a16f3f009';
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
        const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${basic}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const data = response.data;
        return data.access_token;
    } catch (error) {
        console.error('Error getting Spotify access token:', error);
        throw 'An error occurred while obtaining Spotify access token.';
    }
}
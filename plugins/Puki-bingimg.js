let axios = require("axios")

const handler = async (m, { conn, text, usedPrefix, command }) => {
        if (!text) throw `• *Example :* ${usedPrefix}${command} Puki`;
        conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})

        const startTime = Date.now(); // Record the start time

        const bingImageData = await getBingImage(text);

        for (let i = 0; i < bingImageData.length; i++) {
            const image = bingImageData[i];
            await conn.sendFile(
                m.chat,
                image,
                `kyaaaa_${i}.jpg`,
                done,
                m
            );
        }

        const endTime = Date.now(); // Record the end time
        const processingTime = (endTime - startTime) / 1000; // Calculate processing time in seconds

};

handler.help = ["bingimage *<text>*"];
handler.tags = ['ai'];
handler.premium = false
handler.command = /^(bingimage|bingimg)$/i;

module.exports = handler

async function getBingImage(query) {
    try {
        const response = await axios.get(`https://raiden-api.up.railway.app/api/ai/bingimage?q=1girl${query}`);
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw 'Failed to get image data from API.';
    }
}

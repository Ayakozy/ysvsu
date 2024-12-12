const cron = require('node-cron')
let handler = m => m
handler.all = async (m, { conn, text, usedPrefix, command }) => {
 await cron.schedule('20 14 * * *', () => {
            let user = Object.keys(global.db.data.users)
            let limitUser = isPrem ?  "UNLIMITED" : 10000
      for (let jid of user) global.db.data.users[jid].limit = limitUser
            m.reply('Reseted Limit')
        }, {
            scheduled: true,
            timezone: "Asia/Jakarta"
        })
}

module.exports = handler
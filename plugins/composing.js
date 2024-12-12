async function before(m, {
    isOwner,
    conn
}) {
    if (m.isBaileys || !m.text) return false;

    if ( !m.chat.endsWith("g.us") && !isOwner ) {
        if (m.isCommand || m.text) return conn.sendPresenceUpdate("composing", m.chat)
    } else {
     await conn.sendPresenceUpdate("composing", m.chat)
    }
}

module.exports = {
    before,
}
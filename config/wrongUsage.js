module.exports = (message, prefix) => {
    return message.channel.send(`Attenzione! Usa così il comando: \`${prefix}quote ID (#canale | ID)\` o \`${prefix}quote [link]\``)
        .catch(console.error);
}
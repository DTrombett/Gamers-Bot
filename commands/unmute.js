module.exports = {
  name: 'unmute',
  description: "Smuta un membro nel server!",
  async execute(message, args, client, db) {
    try {
      if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      if (!args[0]) return message.channel.send('Devi specificare il membro da smutare!')
        .catch(console.error);
      var target = await client.findMember(message, args.join(' '));
      if (target === null) return;
      if (!target) return message.channel.send("Non ho trovato questo membro!")
        .catch(console.error);
      if (target.roles.highest.position > message.member.roles.highest.position && message.guild.ownerID != message.author.id) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      if (target.user.id == message.guild.ownerID) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      if (!target.manageable) return message.channel.send("Non ho abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      let muteRole = message.guild.roles.cache.find(rr => rr.name.toLowerCase() === "muted") || message.guild.roles.cache.find(rr => rr.name.toLowerCase() === 'mutato');
      if (!muteRole) return message.channel.send('Non ho trovato il ruolo "Muted"')
        .catch(console.error);
      if (!target.roles.cache.has(muteRole.id)) return message.reply("Questo membro non è mutato!")
        .catch(console.error);
      let mute = await target.roles.remove(muteRole.id)
        .catch(console.error);
      if (!mute) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      message.channel.send(`**${target.user.tag}** è stato smutato!`)
        .catch(console.error);
    } catch (err) {
      console.error(err, message);
    }
  }
};
module.exports = {
  name: 'mute',
  description: "Silenzia un membro nel server!",
  async execute(message, args, client, db) {
    try {
      if (!message.guild || !message.guild.available) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      var target = await client.findMember(message, args.join(' '));
      if (target === null) return;
      if (!target) return message.channel.send("Non ho trovato questo membro!")
        .catch(console.error);
      if (!target.manageable) return message.channel.send("Non ho abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      if (target.user.id == message.author.id) return message.channel.send("Non puoi mutare te stesso!")
        .catch(console.error);
      if (target.user.id == message.guild.ownerID) return message.channel.send("Non hai abbastanza permessi per mutare questo membro!")
        .catch(console.error);
      if (target.roles.highest.position > message.member.roles.highest.position && message.guild.ownerID != message.author.id) return message.channel.send("Questo membro ha un ruolo più alto del tuo!")
        .catch(console.error);
      let muteRole = message.guild.roles.cache.find(rr => rr.name === "Muted");
      if (target.roles.cache.find(r => r.name === "Muted")) return message.reply("Questo membro è già mutato!")
        .catch(console.error);
      var error;
      target.roles.add(muteRole.id)
        .catch(err => {
          message.channel.send('Si è verificato un errore!')
            .catch(console.error);
          console.error(err, message);
          error = true;
        });
      if (error) return;
      message.channel.send(`**${target.user.tag}** è stato mutato!`)
        .catch(console.error);
    } catch (error) {
      console.log(error, message);
    }
  }
};
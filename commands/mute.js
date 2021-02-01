const { escapeMarkdown } = require('discord.js');

module.exports = {
  name: 'mute',
  description: "Silenzia un membro nel server!",
  help: 'Silenzia un utente nel server assegnandogli il ruolo muted. Il membro potrà comunque scrivere se i permessi nel canale sono impostati male.',
  usage: ' {@utente | username | ID}',
  examples: ['@DTrombett#2000', ' Trombett', ' 597505862449496065'],
  aliases: ['silent', 'shh'],
  execute: async function(message, args, client, prefix) {
    try {
      if (!message.guild.available) return client.error('Guild unavailable.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      var target = await client.findMember(message, args.join(' '));
      if (target === null) return;
      if (!target) return message.channel.send("Non ho trovato questo membro!")
        .catch(console.error);
      if (target.bot) return message.channel.send('Non puoi mutare un bot!')
        .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.hasPermission('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      if (!target.manageable) return message.channel.send('Non ho abbastanza permessi per mutare questo membro!')
        .catch(console.error);
      let muteRole = message.guild.roles.cache.find(rr => rr.name === "Muted");
      if (target.roles.cache.find(r => r.name === "Muted")) return message.reply("Questo membro è già mutato!")
        .catch(console.error);
      let m = target.roles.add(muteRole.id)
        .catch(err => client.error(err, message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error));
      if (!m) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!target.user.tag) return client.error('Target tag unavailable.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      return message.channel.send(`**${escapeMarkdown(target.user.tag)}** è stato mutato!`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};
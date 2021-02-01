module.exports = {
  name: 'ban',
  description: "Banna un membro!",
  help: 'Banna un utente permanente dal server tramite ID, username o menzione. Potrà rientrare solo dopo che un moderatore disattivi il ban dalle impostazioni server o tramite il comando `unban`.',
  usage: ' {@utente | username | ID}',
  examples: [' @DTrombett#2000', ' Trombett', ' 597505862449496065'],
  aliases: ['bann'],
  execute: async function(message, args, client, prefix) {
    try {
      if (!message.author.tag) return client.error('Author tag undefined.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!message.guild.available) return client.error('Guild unavailable.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Mi dispiace ma non hai abbastanza permessi per eseguire questa azione.")
        .catch(console.error);
      var target = await client.findMember(message, args.join(' '));
      if (target === null) return;
      if (!target) return message.channel.send('Non ho trovato questo membro.')
        .catch(console.error);
      if (target.bot) return message.channel.send('Non puoi bannare un bot!')
        .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.permissions.has('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      if (!target.bannable) return message.channel.send('Non ho abbastanza permessi per bannare questo membro!')
        .catch(console.error);
      let banned = await target.ban({ days: 7, reason: `Banned by ${message.author.tag}` })
        .catch(err => client.error(err, message));
      if (!banned) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!target.user.tag) return client.error('Target tag undefined.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      return message.channel.send(`**${target.user.tag}** è stato bannato correttamente!`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};
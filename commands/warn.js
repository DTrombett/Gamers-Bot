const { escapeMarkdown } = require('discord.js');

module.exports = {
  name: 'warn',
  description: 'Avverti un utente!',
  help: 'Usa questo comando per avvertire un utente. Gli avvertimenti verranno salvati e potrai successivamente ricontrollarli',
  usage: ' {@utente | username | ID}',
  aliases: [],
  examples: [' @DTrombett#2000', ' Trombett', ' 597505862449496065'],
  execute: async function(message, args, client, prefix) {
    try {
      if (!message.guild.available) return client.error('Guild is unavailable.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Non hai abbastanza permessi per eseguire questa azione!')
        .catch(console.error);
      if (!args[0]) return message.channel.send('Devi specificare il membro da avvertire!')
        .catch(console.error);
      var member = await client.findMember(message, args.join(' '));
      if (member === null) return;
      if (!member) return message.channel.send('Non ho trovato questo membro!')
        .catch(console.error);
      if (target.bot) return message.channel.send('Non puoi avvertire un bot!')
        .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.hasPermission('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      let warn = client.getMemberVar('warn', member);
      if (!warn) return client.error('Failed to get warns of the user.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      warn = client.setMemberVar('warn', warn + 1, member);
      if (!warn) return client.error('Failed to warn the user.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      var a = warn == 1 ? 'avvertimento' : 'avvertimenti';
      return message.channel.send(`Ho avvertito **${escapeMarkdown(member.user.tag)}**! Ora ha **${warn}** ${a}.`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};
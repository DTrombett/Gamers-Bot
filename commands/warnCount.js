const { escapeMarkdown } = require('discord.js');

module.exports = {
  name: 'warncount',
  description: 'Controlla il numero di avvertimenti di un membro',
  help: 'Usa questo comando per controllare quanti avvertimenti ha un utente. Puoi anche resettarli tramite l\'apposito comando.',
  usage: ' (@utente | username | ID)',
  aliases: ['warns'],
  examples: ['', ' @DTrombett#2000', ' Trombett', ' 597505862449496065'],
  execute: async function(message, args, client, prefix) {
    try {
      if (!message.guild.available) return client.error('Guild is unavailable.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      var member = await client.findMember(message, args.join(' '), true);
      if (member === null) return;
      if (!member) return message.channel.send('Non ho trovato questo membro!')
        .catch(console.error);
      var warns = client.getMemberVar('warn', member);
      let avv = warns == 1 ? 'avvertimento' : 'avvertimenti';
      if (!member.user.tag) return client.error('Failed to get member tag.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      return message.channel.send(`**${escapeMarkdown(member.user.tag)}** ha **${warns}** ${avv}.`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};
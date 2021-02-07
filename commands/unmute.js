const { escapeMarkdown } = require('discord.js');

module.exports = {
  name: 'unmute',
  description: "Smuta un membro nel server!",
  help: 'Disattiva il mute ad ad un membro levando il ruolo muted.',
  usage: ' {@utente | username | ID}',
  aliases: ['smute'],
  examples: [' @DTrombett#2000', ' Trombett', ' 597505862449496065'],
  execute: async function(message, args, client, prefix) {
    try {
      if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      if (!args[0]) return message.channel.send('Devi specificare il membro da smutare!')
        .catch(console.error);
      var target = await client.findMember(message, args.join(' '));
      if (target === null) return;
      if (!target) return message.channel.send("Non ho trovato questo membro!")
        .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.hasPermission('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      var muteRole = message.guild.roles.cache.find(rr => rr.name.toLowerCase() === "muted") || message.guild.roles.cache.find(rr => rr.name.toLowerCase() === 'mutato');
      var has = target.roles.cache.has(muteRole.id);
      if (!target.manageable) return !has ? message.channel.send('Non ho abbastanza permessi per smutare questo membro!')
        .catch(console.error) : (client.resetVar('muted', 'member', target), message.channel.send(`**${escapeMarkdown(target.user.tag)}** è stato smutato!`));
      if (!muteRole) return message.channel.send('Non ho trovato il ruolo "Muted"')
        .catch(console.error);
      if (!has && !client.getMemberVar('muted', target)) return message.reply("Questo membro non è mutato!")
        .catch(console.error);
      if (!target.user.tag) return client.error('Failed to get target tag.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      var mute;
      if(has) mute = await target.roles.remove(muteRole.id)
        .catch(err => client.error(err, message));
      if (!mute && has) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      client.resetVar('muted', 'member', target);
      return message.channel.send(`**${escapeMarkdown(target.user.tag)}** è stato smutato!`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};
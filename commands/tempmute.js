const ms = require('ms');
const { escapeMarkdown } = require('discord.js');

module.exports = {
  name: 'tempmute',
  description: "Silenzia un membro nel server per un periodo di tempo!",
  help: 'Silenzia un membro assegnandogli il ruolo muted in modo che non possa più scrivere per un certo periodo di tempo. Il membro potrà comunque scrivere se i permessi per i ruoli non sono impostati correttamente.',
  usage: ' {@utente | username | ID} {tempo}',
  aliases: [],
  examples: ['@DTrombett#2000 5m', ' Trombett 2h', ' 597505862449496065 40m'],
  execute: async function(message, args, client, prefix) {
    try {
      if (!message.guild.available) return client.error('Guild is unavailable.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!args[1]) return message.channel.send('Devi specificare il membro da mutare!')
        .catch(console.error);
      var time = args.pop();
      if (!isNaN(time)) time = time + 's';
      if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      if (!ms(time)) return message.channel.send("Devi scrivere la durata del mute!");
      var target = await client.findMember(message, args.join(' '));
      if (target === null) return;
      if (!target) return message.channel.send("Non ho trovato questo membro!")
        .catch(console.error);
      if (target.bot) return message.channel.send('Non puoi mutare un bot!')
        .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.hasPermission('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      if (!target.manageable) return message.channel.send('Non ho abbastanza permessi per bannare questo membro!')
        .catch(console.error);
      let muteRole = message.guild.roles.cache.find(rr => rr.name.toLowerCase() === "muted") || message.guild.roles.cache.find(rr => rr.name.toLowerCase() === 'mutato');
      if (!muteRole) return message.channel.send('Devi prima creare un ruolo da assegnare agli utenti mutati!')
        .catch(console.error);
      if (target.roles.cache.find(r => r.name == "Muted")) return message.reply("Questo membro è già mutato!")
        .catch(console.error);
      let formal = ms(ms(time));
      if (!target.user.tag) return client.error('Failed to get target tag.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!formal) return client.error('Failed to convert time.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      var muted = await target.roles.add(muteRole.id)
        .catch(err => client.error(err, message));
      if (!muted) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      message.channel.send(`**${escapeMarkdown(target.user.tag)}** è stato mutato per ${formal}`)
        .catch(console.error);
      return setTimeout(function() {
        target.roles.remove(muteRole.id)
          .catch(console.error);
      }, ms(time));
    } catch (error) {
      client.error(error, message);
    }
  }
};
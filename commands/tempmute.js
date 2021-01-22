const ms = require('ms');

module.exports = {
  name: 'tempmute',
  description: "Silenzia un membro nel server per un periodo di tempo!",
  async execute(message, args, client, db) {
    try {
      if (!message.guild.available) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!args[1]) return message.channel.send('Devi scrivere il membro da mutare!')
        .catch(console.error);
      var time = args.pop();
      if (isNaN(time)) time = time + 's';
      if (!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
        .catch(console.error);
      if (!ms(time)) return message.channel.send("Devi scrivere la durata del mute!");
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
      let muteRole = message.guild.roles.cache.find(rr => rr.name.toLowerCase() === "muted") || message.guild.roles.cache.find(rr => rr.name.toLowerCase() === 'mutato');
      if (!muteRole) return message.channel.send('Devi prima creare un ruolo da assegnare agli utenti mutati!')
        .catch(console.error);
      if (target.roles.cache.find(r => r.name == "Muted")) return message.reply("Questo membro è già mutato!")
        .catch(console.error);
      var muted = await target.roles.add(muteRole.id)
        .catch(console.error);
      if (!muted) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      message.channel.send(`**${target.user.tag}** è stato mutato per ${ms(ms(time))}`)
        .catch(console.error);
      setTimeout(function() {
        target.roles.remove(muteRole.id)
          .catch(console.error);
      }, ms(time));
    } catch (error) {
      console.log(error, message);
    }
  }
};
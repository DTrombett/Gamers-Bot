const { MessageEmbed } = require('discord.js');

var commandObject = {
  name: 'avatar',
  description: "Guarda l'avatar di un utente!",
  help: 'Usa questo comando per visualizzare l\'avatar di qualsiasi utente tramite l\'ID, username o menzione!',
  usage: ' (@utente | username | ID )',
  aliases: ['pfp'],
  examples: ['', ' @DTrombett#2000', ' Trombett', ' 597505862449496065'],
  time: 2000,
  execute: async (message, args, client, prefix) => {
    try {
      if (!message.author.tag)
        return client.error('Author tag undefined.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      if (!message.guild.available)
        return client.error('Guild unavailable.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      var member = await client.findMember(message, args.join(' '), true, client);
      if (member === null)
        return;
      if (!member)
        return message.channel.send('Non ho trovato nessun utente!')
          .catch(console.error);
      const user = member.user || member;
      const avatar = user.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 4096
      });
      var color = member.displayHexColor || message.guild.roles.highest.color;
      let name = member.displayName || user.username;
      if (!name || !color || !avatar)
        return client.error('Content failed to load.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      const avatarEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle('Avatar di ' + name)
        .setURL(avatar)
        .setImage(avatar)
        .setFooter(`Requested by ${message.author.tag}`);
      return message.channel.send(avatarEmbed)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;
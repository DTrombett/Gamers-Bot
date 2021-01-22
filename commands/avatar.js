const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "avatar",
  description: "Guarda l'avatar di un utente!",
  async execute(message, args, client, db) {
    try {
      if (!message.author.tag) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      var date = message.createdTimestamp;
      var member = await client.findMember(message, args.join(' '), true, client);
      if (member === null) return;
      if (!member) return message.channel.send('Non ho trovato nessun utente!')
        .catch(console.error);
      const user = member.user || member;
      const avatar = user.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 4096
      });
      var color = member.displayHexColor;
      if (!color) {
        let guild = message.guild;
        if (!guild || !guild.available) return message.channel.send('Si è verificato un errore!')
          .catch(console.error);
        color = guild.roles.highest.color;
      }
      let name = member.displayName || user.username;
      if (!name) return message.channel.send('Non trovato nessun utente!')
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
      console.log(err, nessage);
    }
  }
};
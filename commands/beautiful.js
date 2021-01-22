const { Canvas } = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'beautiful',
  description: 'This is beautiful!',
  async execute(message, args, client, db) {
    try {
      let member = await client.findMember(message, args.join(' '), true, client);
      if (member === null) return;
      if (!member) return message.channel.send('Non ho trovato questo utente!')
      .catch(console.error);
      message.channel.startTyping();
      var user = member.user || member;
      let avatar = user.displayAvatarURL({
        format: 'png',
        dynamic: false,
        size: 4096
      });
      const buffer = await Canvas.beautiful(avatar);
      const att = new MessageAttachment(buffer, 'beautiful.png');
      message.channel.stopTyping(true);
      await message.channel.send(att)
      .catch(console.error);
      message.channel.stopTyping(true);
    } catch (err) {
      console.log(err, message);
    }
  }
};
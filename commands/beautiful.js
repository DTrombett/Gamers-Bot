const { Canvas } = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'beautiful',
  description: 'This is beautiful!',
  async execute(message, args, client, db) {
    try {
      message.channel.startTyping();
      let user = await client.findMember(message, args.join(' '), true, client)
        .catch(err => console.error(err));
      if (user === null) return;
      if (!user) return message.channel.send('Non ho trovato questo utente!');
      if (user.user) user = user.user;
      let avatar = user.displayAvatarURL({
        format: 'png',
        dynamic: false,
        size: 4096
      });
      const buffer = await Canvas.beautiful(avatar);
      const att = new MessageAttachment(buffer, 'beautiful.png');
      message.channel.stopTyping(true);
      await message.channel.send(att);
      message.channel.stopTyping(true);
    } catch (err) {
      console.log(err);
    }
  }
};
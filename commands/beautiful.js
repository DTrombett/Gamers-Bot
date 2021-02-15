const { Canvas } = require('canvacord');
const { MessageAttachment } = require('discord.js');

var commandObject = {
  name: 'beautiful',
  description: 'This is beautiful!',
  help: 'This is beautiful! Crea il meme con l\'avatar di un utente tramite ID, username o menzione oppure inserisci un link immagine e ammira quanto è *beautiful*!',
  usage: ' (@utente | username | ID | link)',
  aliases: ['cool', 'nice', 'lovely'],
  examples: ['', ' @DTrombett#2000', ' Trombett', ' 597505862449496065', ' https://cdn.discordapp.com/avatars/597505862449496065/a_3c11b4bec4a451e768ce1e544f79064e.png'],
  time: 5000,
  execute: async (message, args, client, prefix) => {
    try {
      let member = await client.findMember(message, args.join(' '), true, client);
      if (member === null)
        return;
      if (!member)
        return message.channel.send('Non ho trovato questo utente!')
          .catch(console.error);
      message.channel.startTyping();
      var user = member.user || member;
      let avatar = user.displayAvatarURL({
        format: 'png',
        dynamic: false,
        size: 4096
      });
      const buffer = await Canvas.beautiful(avatar)
        .catch(err => {
          return client.error(err, message);
        });
      if (!buffer)
        return message.channel.stopTyping(true) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      const att = new MessageAttachment(buffer, 'beautiful.png');
      message.channel.stopTyping(true);
      if (!att)
        return client.error('Failed to create Attachment.') && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      await message.channel.send(att)
        .catch(console.error);
      return message.channel.stopTyping(true);
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;
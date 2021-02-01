const { Canvas } = require('canvacord');
const { MessageAttachment } = require('discord.js');

module.exports = {
  name: 'blur',
  description: 'Blur an image!',
  help: 'Sfoca l\'avatar di un utente tramite l\'ID, username o menzione oppure inserisci un link immagine o allegato e guarda il risultato!',
  usage: ' (@utente | username | ID | link)',
  examples: ['', ' @DTrombett#2000', ' Trombett', ' 597505862449496065', ' https://cdn.discordapp.com/avatars/597505862449496065/a_3c11b4bec4a451e768ce1e544f79064e.png'],
  aliases: [],
  time: 5000,
  execute: async function(message, args, client, prefix) {
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
      const buffer = await Canvas.blur(avatar)
        .catch(err => client.error(err, message));
      if (!buffer) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      const att = new MessageAttachment(buffer, 'beautiful.png');
      message.channel.stopTyping(true);
      if (!att) return client.error('Failed to create Attachment.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      await message.channel.send(att)
        .catch(console.error);
      return message.channel.stopTyping(true);
    } catch (err) {
      client.error(err, message);
    }
  }
};
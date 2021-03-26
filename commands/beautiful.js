const { Canvas } = require('canvacord');
const { MessageAttachment, Message } = require('discord.js');
const Command = require('../config/Command');
const error = require('../config/error');
const findMember = require('../config/findMember');

const command = new Command('beautiful',

  /**
   * This is beautiful!
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      let member = await findMember(message, args.join(' '), true, message.client);
      if (member === null)
        return null;
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
          return error(err, message);
        });
      if (!buffer)
        return message.channel.stopTyping(true) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      const att = new MessageAttachment(buffer, 'beautiful.png');
      message.channel.stopTyping(true);
      if (!att)
        return error('Failed to create Attachment.') && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      await message.channel.send(att)
        .catch(console.error);
      return message.channel.stopTyping(true);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('This is beautiful!')
  .setHelp('This is beautiful! Crea il meme con l\'avatar di un utente tramite ID, username o menzione oppure inserisci un link immagine e ammira quanto è *beautiful*!')
  .setUsage('(@utente | username | ID | link)')
  .addAlias('cool', 'nice', 'lovely')
  .addExample('', ' @DTrombett#2000', ' Trombett', ' 597505862449496065', ' https://cdn.discordapp.com/avatars/597505862449496065/a_3c11b4bec4a451e768ce1e544f79064e.png')
  .setCooldown(5000);

module.exports = command;
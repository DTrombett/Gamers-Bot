const { MessageEmbed, Message } = require('discord.js');
const Command = require('../config/Command');
const command = new Command('bug',

  /**
   * Segnala un bug!
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      if (!args[0])
        return message.channel.send('Devi scrivere il bug da segnalare!')
          .catch(console.error);
      var avatar = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });
      var attachment = message.attachments.first();
      if (attachment)
        attachment = attachment.proxyURL || '';
      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, avatar, avatar)
        .setColor('RED')
        .setTitle('Nuovo bug!')
        .setThumbnail(message.client.user.buildAvatar)
        .setURL(attachment)
        .setDescription(args.join(' '))
        .setImage(attachment)
        .setFooter('Made by DTrombett');
      var channel = message.client.channels.cache.get('786270849006567454');
      let msg = await channel.send(embed)
        .catch(console.error);
      if (!msg)
        return message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      return message.channel.send('Fatto! Bug inviato con successo.')
        .catch(console.error);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('Segnala un bug!')
  .setHelp('Usa questo comando per segnalare un bug che hai scovato. Se possibile allega un\'immagine in modo da rendere più facile la risoluzione. Cerca di essere il più specifico possibile!')
  .setUsage('{descrizione} (allegato)')
  .addExample('Il comando help mostra un prefisso sbagliato! `Allegati: screenshot`')
  .setCooldown(10000);

module.exports = command;
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'bug',
  description: 'Segnala un bug!',
  help: 'Usa questo comando per segnalare un bug che hai scovato. Se possibile allega un\'immagine in modo da rendere più facile la risoluzione. Cerca di essere il più specifico possibile!',
  usage: ' {descrizione} (allegato)',
  aliases: [],
  examples: [' Il comando help mostra un prefisso sbagliato! `Allegati: screenshot`'],
  time: 10000,
  execute: async function(message, args, client, prefix) {
    try {
      if (!['711533701963448321', '767102981329911830'].includes(message.channel.id)) return;
      if (!args[0]) return message.channel.send('Devi scrivere il bug da segnalare!')
        .catch(console.error);
      var avatar = message.author.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });
      var attachment = message.attachments.first()
      if (attachment) attachment = attachment.proxyURL || '';
      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, avatar, avatar)
        .setColor('RED')
        .setTitle('Nuovo bug!')
        .setThumbnail(client.customAvatar)
        .setURL(attachment)
        .setDescription(args.join(' '))
        .setImage(attachment)
        .setFooter('Made by DTrombett');
      var channel = client.channels.cache.get('786270849006567454');
      let msg = await channel.send(embed)
        .catch(console.error);
      if (!msg) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      return message.channel.send('Fatto! Bug inviato con successo.')
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};
const { MessageEmbed, escapeMarkdown } = require('discord.js');

module.exports = {
  name: 'prefix',
  description: 'Mostra i prefissi impostati nel server!',
  help: 'Se hai dimenticato quali sono i prefissi da poter utilizzare con il bot usa questo comando per schiarirti le idee!',
  usage: '',
  aliases: ['prefixes'],
  examples: [''],
  execute: function(message, args, client, prefix) {
    try {
      var i = 0;
      const embed = new MessageEmbed()
        .setAuthor(client.user.tag, client.customAvatar, client.customAvatar)
        .setTitle('Prefix')
        .setColor('RED')
        .setThumbnail(client.customAvatar)
        .setFooter('Made by DTrombett')
        .setTimestamp()
        .setDescription(client.getIDVar('prefix', message.guild.id).map(p => {
          if (p.includes(client.user.id)) return;
          i++;
          return `${i}. ${escapeMarkdown(p)}`;
        }).join(`\n`));
      message.channel.send(embed);
    } catch (err) {
      client.error(err, message);
    }
  }
};
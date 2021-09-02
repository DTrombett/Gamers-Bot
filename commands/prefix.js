const { MessageEmbed, escapeMarkdown } = require('discord.js');
const { Command } = require('../config');
const error = require('../config/error');
const { getIDVar } = require('../config/variables');

const command = new Command('prefix',

  function (message) {
    try {
      var i = 0, customClientAvatar = message.client.user.buildAvatar();
      var prefix = getIDVar('prefix', message.guild.id);
      prefix.forEach(p => {
        if (p.includes(message.client.user.id)) prefix.remove(p);
      });
      const embed = new MessageEmbed()
        .setAuthor(message.client.user.tag, customClientAvatar, customClientAvatar)
        .setTitle('Prefix')
        .setColor('RED')
        .setThumbnail(customClientAvatar)
        .setFooter('Made by DTrombett')
        .setTimestamp()
        .setDescription(prefix.map(p => {
          i++;
          return `${i}. ${escapeMarkdown(p)}`
        }).join('\n'));
      message.channel.send(embed);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('Mostra i prefissi impostati nel server!')
  .setHelp('Se hai dimenticato quali sono i prefissi da poter utilizzare con il bot usa questo comando per schiarirti le idee!')
  .addAlias('prefixes');

module.exports = command;
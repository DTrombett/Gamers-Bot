const { MessageEmbed, Message, escapeMarkdown } = require('discord.js');
const { inspect } = require('util');

/**
 * Handle an error
 * @param {Error|String} err - The error occurred
 * @param {Message|*} element - The message or any other value wich caused the error
 * @returns {?Promise<Message>} The message sent in error logs
 */
module.exports = (err, element) => {
  console.error(err);
  try {
    if (!element) return null;
    var channel = element.client.channels.cache.get('802929224935407686');
    var embed = new MessageEmbed()
      .setTitle('Error occured!')
      .setColor('RED')
      .setFooter('Made by DTrombett')
      .setTimestamp();
    if (element instanceof Message) {
      var message = element;
      embed
        .setAuthor(message.member.displayName, message.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
          size: 4096
        }))
        .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
        .setDescription('```xl\n' + err.toString() + '```')
        .addField('Message content', escapeMarkdown(message.content).substring(0, 1024))
        .addField('Author', `Tag: **${escapeMarkdown(message.author.tag)}**\nID: ${message.author.id}\nMention: ${message.author}`)
        .addField('Channel', `Name: **${escapeMarkdown(message.channel.name)}**\nID: ${message.channel.id}\nMention: ${message.channel}`)
        .addField('Guild', `Name: **${escapeMarkdown(message.guild.name)}**\nID: ${message.guild.id}`)
        .setThumbnail(message.guild.iconURL({
          format: 'png',
          dynamic: true,
          size: 4096
        }));
    }
    else embed
      .setAuthor(element.client.user.tag, element.client.user.buildAvatar(), 'https://repl.it/@DTrombett/GamersBot')
      .setURL('https://repl.it/@DTrombett/GamersBot')
      .setDescription('```js\n' + inspect(element).substring(0, 2038) + '```')
      .addField('Error', err);
    return channel.send(embed)
      .catch(console.error);
  } catch (err) {
    console.error(err);
  }
};
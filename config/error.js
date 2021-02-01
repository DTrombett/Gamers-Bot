module.exports = function(err, message) {
  if (!message) return console.error(err);
  let channel = client.channels.cache.get('802929224935407686');
  var embed = new MessageEmbed()
    .setTitle('Error occured!')
    .setColor('RED')
    .setFooter('Made by DTrombett')
    .setTimestamp();
  if (Message instanceof message) embed
    .setAuthor(message.member.displayName, message.author.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 4096
    }))
    .setURL(`https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
    .setDescription('```xl\n' + err.toString() + '```')
    .addField('Message content', escapeMarkdown(message).substring(0, 1024))
    .addField('Author', `Tag: **${escapeMarkdown(message.author.tag)}**\nID: ${message.author.id}\nMention: ${message.author}`)
    .addField('Channel', `Name: **${escapeMarkdown(message.channel.name)}**\nID: ${message.channel.id}\nMention: ${message.channel}`)
    .addField('Guild', `Name: **${escapeMarkdown(message.guild)}**\nID: ${message.guild.id}`)
    .setThumbnail(message.guild.iconURL({
      format: 'png',
      dynamic: true,
      size: 4096
    }));
  else embed
    .setAuthor(client.user.tag, client.customAvatar, 'https://repl.it/@DTrombett/GamersBot')
    .setURL('https://repl.it/@DTrombett/GamersBot')
    .setDescription('```js\n' + inspect(message).substring(0, 2038) + '```')
    .addField('Error', err);
  return channel.send(embed);
};
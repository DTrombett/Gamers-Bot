const { MessageEmbed } = require('discord.js');

module.exports = (client, id) => {
  try {
    console.log(`Shard ${id} is reconnecting...`);
    const embed = new MessageEmbed()
      .setAuthor(`Shard ${id}`, client.customAvatar, client.customAvatar)
      .setTitle('STATUS')
      .setThumbnail(client.customAvatar)
      .setFooter('Made by DTrombett')
      .setTimestamp()
      .setColor('ORANGE')
      .addField('Reconnecting', 'Bot is trying to reconnect...');
    return client.postStatus([embed]);
  } catch (err) {
    console.error(err);
  }
}
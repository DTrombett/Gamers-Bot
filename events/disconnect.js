const { MessageEmbed } = require('discord.js');

module.exports = (client, event, id) => {
  try {
    console.log(`Shard ${id} disconnected! Event: ${event}`);
    const embed = new MessageEmbed()
      .setAuthor(`Shard ${id}`, client.customAvatar, client.customAvatar)
      .setTitle('STATUS')
      .setThumbnail(client.customAvatar)
      .setFooter('Made by DTrombett')
      .setTimestamp()
      .setColor('BLUE')
      .addField('Disconnect', `Bot disconnected due to an unknown error!`);
    return client.postStatus([embed]);
  } catch (err) {
    console.error(err);
  }
}
const { MessageEmbed } = require('discord.js');

module.exports = (client, id, events) => {
  try {
    console.log(`Shard ${id} resumed! Replayed ${events} events.`);
    const embed = new MessageEmbed()
      .setAuthor(`Shard ${id}`, client.customAvatar, client.customAvatar)
      .setTitle('STATUS')
      .setThumbnail(client.customAvatar)
      .setFooter('Made by DTrombett')
      .setTimestamp()
      .setColor('BLUE')
      .addField('Resumed', `Bot successfully resumed! Replayed ${events} events.`);
    return client.postStatus([embed]);
  } catch (err) {
    console.error(err);
  }
}
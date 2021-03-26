const { MessageEmbed } = require('discord.js');
const postStatus = require('../config/postStatus');

/**
 * Emitted when a shard is attempting to reconnect or re-identify.
 * @param {number} id - The shard ID that is attempting to reconnect
 */
module.exports = (id) => {
  try {
    console.log(`Shard ${id} is reconnecting...`);
    const embed = new MessageEmbed()
      .setAuthor(`Shard ${id}`)
      .setColor('ORANGE')
      .addField('Reconnecting', 'Bot is trying to reconnect...');
    return postStatus([embed]);
  } catch (err) {
    console.error(err);
  }
}
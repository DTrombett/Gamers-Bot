const { MessageEmbed } = require('discord.js');
const postStatus = require('../config/postStatus');

/**
 * Emitted when a shard's WebSocket disconnects and will no longer reconnect.
 * @param {CloseEvent} event - The WebSocket close event
 * @param {number} id - The shard ID that disconnected
 */
module.exports = (event, id) => {
  try {
    console.log(`Shard ${id} disconnected! Event: ${event}`);
    const embed = new MessageEmbed()
      .setAuthor(`Shard ${id}`)
      .setColor('BLUE')
      .addField('Disconnect', `Bot disconnected due to an unknown error!`);
    return postStatus([embed]);
  } catch (err) {
    console.error(err);
  }
}
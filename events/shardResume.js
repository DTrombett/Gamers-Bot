const { MessageEmbed } = require('discord.js');
const postStatus = require('../config/postStatus');

/**
 * Emitted when a shard resumes successfully.
 * @param {number} id - The shard ID that resumed
 * @param {number} replayedEvents - The amount of replayed events
 */
module.exports = (id, events) => {
  try {
    console.log(`Shard ${id} resumed! Replayed ${events} events.`);
    const embed = new MessageEmbed()
      .setAuthor(`Shard ${id}`)
      .setColor('BLUE')
      .addField('Resumed', `Bot successfully resumed! Replayed ${events} events.`);
    return postStatus([embed]);
  } catch (err) {
    console.error(err);
  }
}
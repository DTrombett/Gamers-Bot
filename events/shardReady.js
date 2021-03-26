const { MessageEmbed, WebhookClient } = require('discord.js');
const postStatus = require('../config/postStatus.js');

/**
 * Emitted when a shard turns ready.
 * @param {number} id - The shard ID that turned ready
 * @param {?Set<string>} unavailableGuilds - Set of unavailable guild IDs, if any
 */
module.exports = (id, guilds) => {
  try {
    console.log(`Shard ${id} ready with ${!!guilds ? guilds.size : 0} guilds unavailable.`);
    require('../config/Util.js');
    var emb = new MessageEmbed()
      .setAuthor(`Shard ${id}`)
      .setColor('GREEN')
      .addField('Ready', 'Bot is online! ' + `${!!guilds ? guilds.size : 0} guilds are unavailable.`);
    postStatus([emb]);
  } catch (err) {
    console.error(err);
  }
}
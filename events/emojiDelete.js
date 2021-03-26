const { Message, GuildEmoji } = require("discord.js");
const createEmbedLog = require("../config/createEmbedLog");
const error = require("../config/error");

/**
 * Emitted whenever a custom emoji is deleted in a guild.
 * @param {GuildEmoji} emoji - The emoji that was deleted
 * @returns {Promise<Message>} The message sent in log channel
 */
module.exports = async (emoji) => {
  try {
    var log = emoji.client.channels.cache.get('786270849006567454');
    const fetchedLogs = await emoji.guild.fetchAuditLogs({
      limit: 1,
      type: 'EMOJI_DELETE',
    });
    var logs = fetchedLogs.entries.first(), executor, target, mod;
    if (logs) {
      target = logs.target;
      executor = logs.executor;
    }
    if (target.id === emoji.id) mod = executor;
    var content = `[:${emoji.name}:](${emoji.url})`;
    const embed = createEmbedLog(`Emoji eliminata`, emoji.url, mod, content, emoji.guild)
      .setFooter(`ID: ${emoji.id}`);
    return log.send(embed);
  } catch (err) {
    error(err, emoji);
  }
}
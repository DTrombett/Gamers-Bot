const { Message, GuildChannel, DMChannel } = require("discord.js");
const createEmbedLog = require("../config/createEmbedLog");
const error = require("../config/error");

/**
 * Emitted whenever a channel is deleted.
 * @param {DMChannel|GuildChannel} channel - The channel that was deleted
 * @returns {?Promise<Message>} The message sent in log channel
 */
module.exports = async (channel) => {
  try {
    if (!(channel instanceof GuildChannel) || channel.type == 'category') return null;
    var log = channel.client.channels.cache.get('786270849006567454');
    const fetchedLogs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: 'CHANNEL_DELETE',
    });
    var logs = fetchedLogs.entries.first(), executor, target, mod;
    if (logs) {
      target = logs.target;
      executor = logs.executor;
    }
    if (target.id === channel.id) mod = executor;
    var category = channel.parent;
    var content = 'Category: **';
    content = !!category ? content + category.name + '**' : content + 'None**';
    const embed = createEmbedLog(`Canale #${channel.name} eliminato`, '', mod, content, channel.guild);
    embed.setFooter(`ID: ${channel.id}`);
    return log.send(embed);
  } catch (err) {
    error(err, channel);
  }
}
const { Collection, Message } = require("discord.js");
const createEmbedLog = require("../config/createEmbedLog");
const error = require("../config/error");

/**
 * Emitted whenever messages are deleted in bulk.
 * @param {Collection<String, Message>} messages - The deleted messages, mapped by their ID
 * @returns {?Promise<Message>} The message sent in log channel
 */
module.exports = async (messages) => {
  try {
    var message = messages.first();
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: 'MESSAGE_BULK_DELETE',
    })
      .catch(console.error);
    const deletionLog = fetchedLogs.entries.first();
    var executor, target, mod;
    if (deletionLog) {
      target = deletionLog.target;
      executor = deletionLog.executor;
    }
    mod = target.id === message.channel.id ? executor : message.author;
    const channel = message.client.channels.cache.get('786270849006567454');
    const array = messages.map(message => {
      return `**${!!message.author ? message.author.tag : 'UNKNOWN'}**: ${message.content.substring(message.content.length - 180)}`;
    }).reverse();
    var count = array.length;
    let slice = array.slice(Math.max(array.length - 10, 0));
    var show = slice.length;
    const list = slice.join('\n');
    const embed = createEmbedLog(`${count} messaggi eliminati in #${message.channel.name}`, `https://discord.com/channels/${message.guild.id}/${message.channel.id}`, mod, list, message.guild)
      .setFooter(`Ultimi ${show} visualizzati`);
    return channel.send(embed)
      .catch(console.error);
  } catch (err) {
    error(err, message);
  }
}
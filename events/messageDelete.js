const { Message } = require("discord.js");
const createEmbedLog = require("../config/createEmbedLog");
const error = require("../config/error");

/**
 * Emitted whenever a message is deleted.
 * @param {Message} message - The deleted message
 * @returns {?Promise<Message>} - The message sent in log channel
 */
module.exports = async (message) => {
  try {
    if (message.partial || !message.guild || !message.member || !message.author || message.author.bot)
      return null;
    const fetchedLogs = await message.guild.fetchAuditLogs({
      limit: 1,
      type: 'MESSAGE_DELETE',
    })
      .catch(console.error);
    var deletionLog = fetchedLogs.entries.first(), executor;
    if (!!deletionLog && deletionLog.target.id === message.author.id) executor = deletionLog.executor;
    const channel = message.client.channels.cache.get('786270849006567454');
    var attachments = message.attachments.array();
    const embed = createEmbedLog('Messaggio cancellato!', `https://discord.com/channels/${message.guild.id}/${message.channel.id}`, message.author, message.content, message.guild)
      .setFooter(`ID: ${message.id} | Canale: #${message.channel.name} `);
    if (executor)
      embed.addField('Executor', executor.tag);
    if (attachments[0])
      for (let att of attachments)
        embed.addField(`Attachment - ${att.name}`, att.proxyURL);
    return channel.send(embed);
  } catch (err) {
    error(err, message);
  }
}
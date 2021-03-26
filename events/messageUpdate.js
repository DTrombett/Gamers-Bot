const { Message } = require("discord.js");
const createEmbedLog = require("../config/createEmbedLog");
const error = require("../config/error");
const execute = require("./message");

/**
 * Emitted whenever a message is updated - e.g. embed or content change.
 * @param {Message} oldMessage - The message before the update
 * @param {Message} newMessage - The message after the update
 * @returns {?Promise<?Message>} The message sent in log channel
 */
module.exports = async (oldMessage, newMessage) => {
  try {
    if (newMessage.deleted) return null;
    var message = !newMessage.partial ? newMessage : await newMessage.fetch()
      .catch(console.error);
    if (!message || !message.content || message.content == oldMessage.content || message.author.bot)
      return null;
    execute(message);
    var log = message.client.channels.cache.get('786270849006567454');
    if (message.content.length > 1024) message.content = message.content.substring(0, 1020) + '...';
    if (oldMessage.content && oldMessage.content.length > 1024)
      oldMessage.content = oldMessage.content.substring(0, 1020) + '...';
    const embed = createEmbedLog(`Messaggio modificato`, `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`, message.author, '', message.guild)
      .addField('Prima', oldMessage.content === null ? '*UNKNOWN*' : oldMessage.content)
      .addField('Dopo', message.content)
      .setFooter(`ID: ${message.id} | Canale: #${message.channel.name}`);
    return log.send(embed);
  } catch (err) {
    error(err, newMessage);
  }
}
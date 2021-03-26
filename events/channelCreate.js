const { Message, GuildChannel, DMChannel, MessageEmbed, Util } = require("discord.js");
const ms = require("ms");
const { escapeMarkdown, splitMessage } = Util;
const error = require("../config/error");

/**
 * Emitted whenever a channel is created.
 * @param {GuildChannel} channel - The channel that was created
 * @returns {?Promise<Message>} The message sent in log channel
 */
module.exports = async (channel) => {
  try {
    if (channel instanceof DMChannel)
      return null;
    const log = channel.client.channels.cache.get('786270849006567454');
    const fetchedLogs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: 'CHANNEL_CREATE',
    })
      .catch(console.error);
    var logs, embed = new MessageEmbed();
    if (fetchedLogs) {
      logs = fetchedLogs.entries.first();
      if (logs && logs.target && logs.target.id === channel.id) {
        const { executor, reason } = logs;
        const executorMember = channel.guild.member(executor);
        const avatar = executor.buildAvatar();
        embed
          .addField('Creato da', `**${escapeMarkdown(executor.tag)}** (${executor})`)
          .addField('Motivo', !reason ? 'None' : escapeMarkdown(reason).substr(0, 1024))
          .setAuthor(executor.tag, avatar, avatar);
        if (executorMember) {
          embed.setColor(executorMember.roles.highest.color);
        }
      }
    }
    embed
      .setTimestamp(channel.createdTimestamp)
      .setFooter(`ID: ${channel.id}`)
      .addField('Nome', `**${escapeMarkdown(channel.name)}** (${channel})`);
    if (channel.parent)
      embed.addField('Categoria', escapeMarkdown(channel.parent.name));
    switch (channel.type) {
      case 'text':
        embed
          .setTitle('Nuovo canale testuale creato!')
          .addField('NSFW', channel.nsfw ? 'Sì' : 'No')
          .addField('Slowmode', !channel.rateLimitPerUser ? 'None' : ms(channel.rateLimitPerUser * 1000))
          .addField('Argomento', !channel.topic ? 'None' : channel.topic.substr(0, 1024));
        break;
      case 'voice':
        embed.setTitle('Nuovo canale vocale creato!')
          .addField('Bitrate', `${channel.bitrate} Kbps`)
          .addField('Limite utenti', channel.userLimit || 'None');
        break;
      case 'category':
        embed.setTitle('Nuova categoria creata!');
        break;
      case 'news':
        embed.setTitle('Nuovo canale annunci creato!')
          .addField('NSFW', channel.nsfw ? 'Sì' : 'No')
          .addField('Slowmode', !channel.rateLimitPerUser ? 'None' : ms(channel.rateLimitPerUser * 1000))
          .addField('Argomento', !channel.topic ? 'None' : channel.topic.substr(0, 1024));
        break;
      case 'store':
        embed.setTitle('Nuovo canale store creato!')
          .addField('NSFW', channel.nsfw ? 'Sì' : 'No');
        break;
      default:
        return null;
    }
    channel.permissionOverwrites.forEach(async (value, key) => {
      if (embed.fields.length == 25)
        return;
      var element = value.type === 'member' ? channel.guild.members.cache.get(key) || await channel.guild.members.fetch(key)
        .catch(console.error) : channel.guild.roles.cache.get(key) || await channel.guild.roles.fetch(key)
          .catch(console.error);
      if (!element)
        return;
      let allowed = value.allow.toArray().map(value => `✅ ${value.toLowerCase().replace(/_/g, ' ').capitalize()}`).join('\n');
      let denied = value.deny.toArray().map(value => `❌ ${value.toLowerCase().replace(/_/g, ' ').capitalize()}`).join('\n');
      let text = allowed + '\n' + denied;
      let name = escapeMarkdown(element.name || element.tag);
      if ((embed.length + text.length + name.length) > 6000)
        return;
      text = text.length <= 1024 ? text : splitMessage(text, { maxLength: 1024 })[0];
      embed.addField(name, text);
    });
    return log.send(embed);
  } catch (err) {
    error(err, channel);
  }
}
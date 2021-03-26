const { GuildMember, escapeMarkdown } = require("discord.js");
const createEmbedLog = require("../config/createEmbedLog");
const dateFormat = require('dateformat');
const error = require("../config/error");

/**
 * Emitted whenever a member leaves a guild, or is kicked.
 * @param {GuildMember} member - The member that has left/been kicked from the guild
 * @returns {?Promise<Message>} The message sent in log channel
 */
module.exports = async (member) => {
  try {
    const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_KICK',
    })
      .catch(console.error);
    const kickLog = fetchedLogs.entries.first();
    var executor, target;
    if (!kickLog) return null;
    target = kickLog.target;
    executor = kickLog.executor;
    if (!target || !executor || target.id !== member.user.id) return null;
    var channel = member.guild.logChannel();
    var embed = createEmbedLog('Member kicked', target.buildAvatar(), executor, `**${escapeMarkdown(target.tag)}** (${target}) è stato cacciato dal server!`, member.guild)
      .addField('Entrato nel server', dateFormat(member.joinedAt, 'dddd dd mmmm yyyy HH:MM:ss'))
      .addField('Nickname', escapeMarkdown(member.nickname || '') || '*None*')
      .addField('Ruoli', member.roles.cache.filter(r => r.name != '@everyone').map(r => `**${escapeMarkdown(r.name)}** (${r})`).join('\n') || '*None*')
      .addField('Moderatore:', `__${escapeMarkdown(executor.tag)}__ (${executor})`, true);
    return channel.send(embed)
      .catch(console.error);
  } catch (err) {
    error(err, member);
  }
}
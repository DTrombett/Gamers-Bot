module.exports = (message, client) => {
  if (client.getMemberVar('muted', message.member)) message.delete();
  var args = message.content.trim().split(/ +/);
  if (message.member.permissions.has('MANAGE_GUILD')) return;
  if (message.content.includes('discord.gg/') || message.content.includes('discord.com/invite')) client.automod.get('anti-invites').execute(message, args, client, prefix);
};
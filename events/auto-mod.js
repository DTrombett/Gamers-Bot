module.exports = {
  name: 'auto-mod',
  execute: function(message, client) {
    try {
      var args = message.content.trim().split(/ +/);
      if (message.member.permissions.has('MANAGE_GUILD')) return;
      if (message.content.includes('discord.gg/') || message.content.includes('discord.com/invite')) client.automod.get('anti-invites').execute(message, args, client, prefix);
    } catch (err) {
      client.error(err, message);
    }
  }
};
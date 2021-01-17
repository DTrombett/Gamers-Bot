module.exports = {
  name: 'auto-mod',
  description: '',
  async execute(message, args, client, db) {
    try {
      if(message.member.permissions.has('MANAGE_GUILD')) return;
      if (message.content.includes('discord.gg/') || message.content.includes('discord.com/invite')) client.automod.get('anti-invites').execute(message, args, client, db);
    } catch (err) {
      console.log(err);
    }
  }
};
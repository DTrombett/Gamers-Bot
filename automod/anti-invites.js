const fetch = require('node-fetch');

module.exports = {
  name: 'auto-mod',
  
  execute: async function(message, args, client, prefix) {
    try {
      if (!message.content.includes('discord.gg/') && !message.content.includes('discord.com/invite')) return;
      var array = [];
      var warn = false;
      for (var i = 0; i < args.length; i++)
        if ((args[i].includes('discord.gg/') || args[i].startsWith('https://www.discord.gg/') || args[i].startsWith('https://discord.com/invite/') || args[i].startsWith('https://www.discord.com/invite/')) && args[i].length >= 19) array.push(args[i].startsWith('discord.gg/') ? 'https://' + args[i] : args[i]);
      args.every(async v => {
        if (warn) return;
        let a = await client.fetchInvite(v)
          .catch(err => client.error(err, v));
        if (a && a.guild.id != message.guild.id) warn = true;
      });
      if (warn) {
        message.delete()
          .catch(console.error);
        var warnCount = client.setMemberVar('warn', client.getMemberVar('warn', message.member) + 1, message.member);
        return message.reply('non puoi inviare link invito!')
          .catch(console.error);
      }
    } catch (err) {
      client.error(err, message);
    }
  }
};
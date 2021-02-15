var object = {
  name: 'anti-invites',
  execute: async (message, args, client) => {
    try {
      var array = [],
        warn,
        values = ['discord.gg/', 'https://discord.gg/', 'http://discord.gg/', 'https://www.discord.gg/', 'https://discord.com/invite/', 'https://www.discord.com/invite/', 'http://discord.com/invite/', 'http://www.discord.com/invite/'];
      for (var i = 0; i < args.length; i++)
        if (values.some(a => args[i].startsWith(a)) && args[i].length >= 19) {
          let el = args[i].split('/').pop();
          if (el)
            array.push(el);
        }
      array.forEach(async v => {
        var inv = await client.fetchInvite(v)
          .catch(err => {
            return client.error(err, v);
          });
        if (!!inv && inv.guild.id != message.guild.id)
          warn = true;
        if (!warn || message.deleted)
          return;
        message.delete()
          .catch(console.error);
        client.setMemberVar('warn', message.client.getMemberVar('warn', message.member) + 1, message.member);
        return message.reply('Non puoi inviare link invito!')
          .catch(console.error);
      });
    } catch (err) {
      message.client.error(err, message);
    }
  }
};

module.exports = object;
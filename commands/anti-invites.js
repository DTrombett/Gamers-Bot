module.exports = {
  name: 'anti-invites',
  description: '',
  async execute(message, args, client, db) {
    try {
      if (message.member.permissions.has('ADMINISTRATOR') || message.member.permissions.has('MANAGE_GUILD')) return;
      if (!message.content.includes('discord.gg/') && !message.content.includes('discord.com/invite')) return;
      var array = [];
      var warn = false;
      for (var i = 0; i < args.length; i++)
        if (args[i].includes('discord.gg/') || args[i].startsWith('https://www.discord.gg/') || args[i].startsWith('https://discord.com/invite/') || args[i].startsWith('https://www.discord.com/invite/'))
          if (args[i].length >= 19) array.push(args[i]);
      var invites = await message.guild.fetchInvites();
      invites = invites.array();
      var invArr = [];
      for (let i of invites) invArr.push(i.code);
      for (let element of array) {
        let el = element.split('/');
        if (!invArr.includes(el[el.length - 1])) {
          if (element.startsWith('discord.gg/')) element = 'https://' + element;
          await fetch(element)
            .then(res => res.text())
            .then(text => {
              if (text.length != 4427) warn = true;
            });
        }
      }
      if (warn) {
        message.delete();
        message.reply('Non puoi inviare link invito!');
      }
    } catch (err) {
      console.error(err);
    }
  }
};
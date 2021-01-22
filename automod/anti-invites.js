const fetch = require('node-fetch');

module.exports = {
  name: 'auto-mod',
  description: '',
  async execute(message, args, client, db) {
    try {
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
        var warnCount = client.setMemberVar('warn', client.getMemberVar('warn', message.member) + 1, message.member);
        if (warnCount >= 10 && message.member.bannable) {
          message.member.ban({
              days: 7,
              reason: 'Too many warns'
            })
            .then(m => message.reply('Non puoi inviare link invito! Hai raggiunto il limite di avvertimenti e sei stato bannato dal server!'))
            .catch(err => {
              console.error(err);
              message.reply('Non puoi inviare link invito! Hai raggiunto il limite di avvertimenti ma non sono riuscito a bannarti dal server :(');
            });
          return;
        }
        return message.reply('Non puoi inviare link invito!');
      }
    } catch (err) {
      console.error(err, message);
    }
  }
};
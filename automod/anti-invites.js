const error = require("../config/error");
const { getMemberVar, setMemberVar } = require("../config/variables");

/**
 * Check if there are invites in the message.
 * @param {Message} message - The message to scan
 * @param {Array<String>} args - The args of thr message
 */
module.exports = async (message, args) => {
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
      var inv = await message.client.fetchInvite(v)
        .catch(err => {
          return error(err, v);
        });
      if (!!inv && inv.guild.id != message.guild.id)
        warn = true;
      if (!warn || message.deleted)
        return null;
      message.delete()
        .catch(console.error);
      setMemberVar('warn', getMemberVar('warn', message.member) + 1, message.member);
      return message.reply('Non puoi inviare link invito!')
        .catch(console.error);
    });
  } catch (err) {
    error(err, message);
  }
};
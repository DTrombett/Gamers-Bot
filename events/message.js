const normalize = require('normalize-strings');
const execute = require("../config/execute.js");

module.exports = (message) => {
  var client = message.client;
  try {
    if (!message.author || !message.member || message.author.bot || (client.getVar('man') && message.author.id != '597505862449496065'))
      return;
    var value, prefix = client.getIDVar('prefix', message.guild.id);
    if (prefix.some(p => {
      if (value)
        return;
      if (message.content.startsWith(p)) {
        value = p;
        return true;
      }
    })) {
      let args = message.content.slice(value.length).trim().split(/ +/);
      let command = normalize(args.shift().toLowerCase());
      command = client.commands.has(command) ? client.commands.get(command) : client.commands.find(c => {
        return c.aliases.includes(command);
      });
      if (command)
        execute(message, command, args, client, value);
    }
    client.events.get('auto-mod').execute(message, client, value);
  } catch (err) {
    client.error(err, message);
  }
}
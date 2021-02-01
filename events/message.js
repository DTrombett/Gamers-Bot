const normalize = require('normalize-strings');
const ms = require('ms');

function execute(message, command, args, client, prefix) {
  if (command.cooldown && command.cooldown.has(message.author.id)) return !command.time ? void 0 : message.channel.send(`Hey, non così veloce! Devi aspettare ancora **${ms(command.time - (message.createdTimestamp - command.cooldown.get(message.author.id))) || '0s'}** prima di poter eseguire nuovamente questo comando.`)
    .catch(console.error);
  command.execute(message, args, client, prefix);
  if (!command.cooldown) command.cooldown = new Collection();
  var date = (command.time || 1000) - (Date.now() - message.createdTimestamp);
  if (date < 1) return;
  command.cooldown.set(message.author.id, { user: message.author, timestamp: message.createdTimestamp })
  setTimeout(() => command.cooldown.delete(message.author.id), date)
}

module.exports = {
  name: 'message',
  execute: function(message) {
    try {
      if (!message.author || !message.member || message.author.bot || (client.getVar('man') && message.author.id != '597505862449496065')) return;
      var value, prefix = client.getIDVar('prefix', message.guild.id);
      var client = message.client;
      if (prefix.some(p => {
          if (value) return;
          if (message.content.startsWith(p)) {
            value = p;
            return true;
          }
        })) {
        let args = message.content.slice(value.length).trim().split(/ +/);
        let command = normalize(args.shift().toLowerCase());
        command = client.commands.has(command) ? client.commands.get(command) : client.commands.find(c => c.aliases.has(command));
        if (command) execute(message, command, args, client, value);
      }
      client.events.get('auto-mod').execute(message, client, value);
    } catch (err) {
      client.error(err, message);
    }
  }
};
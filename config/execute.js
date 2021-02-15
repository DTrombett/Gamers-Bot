const ms = require('ms');

module.exports = (message, command, args, client, prefix) => {
  if (command.cooldown.has(message.author.id)) {
    var time = command.time - (message.createdTimestamp - command.cooldown.get(message.author.id).timestamp);
    return time < 1000 || !time ? void 0 : message.channel.send(`Hey, non così veloce! Devi aspettare ancora **${ms(time)}** prima di poter eseguire nuovamente questo comando.`)
      .catch(console.error);
  }
  command.execute(message, args, client, prefix);
  console.info(`${message.author.tag} executed the command ${command.name} in channel ${message.channel.name} in guild ${message.guild.name}.`);
  var date = command.time - (Date.now() - message.createdTimestamp);
  if (date < 2)
    return;
  command.cooldown.set(message.author.id, { user: message.author, timestamp: message.createdTimestamp });
  setTimeout(() => {
    return command.cooldown.delete(message.author.id);
  }, date);
};
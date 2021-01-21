const normalize = require('normalize-strings');

module.exports = {
  name: 'message',
  description: '',
  execute(message, client, db) {
    try {
      if(!message.author || !message.member || message.author.bot) return;
      if(message.content.startsWith(client.prefix)) {
        let args = message.content.slice(client.prefix.length).trim().split(/ +/);
        const command = normalize(args.shift().toLowerCase());
        if(client.commands.has(command)) client.commands.get(command).execute(message, args, client, db);
      }
      client.events.get('auto-mod').execute(message, client, db);
    } catch(err) {
        console.log(err, message);
    }
  }
};
const fs = require('fs');
const file = client.userWarn;

module.exports = {
  name: 'warn',
  description: '',
  async execute(message, args, client, db) {
    try {
      var member = await client.findMember(message, args.join(' '));
      if (member === null) return;
      if (!member) return message.channel.send('Non ho trovato questo membro!');
      const file = client.userWarn();
      if (member.user) member = member.user;
      id = member.id;
      file[id] = !!file[id] ? file[id] += 1 : 1;
      fs.writeFile('./warn.json', JSON.stringify(file), function writeJSON(err) {
        if (err) {
          message.channel.send('Si è verificato un errore! Riprova...');
          return console.log(err);
        }
        let avv = file[id] == 1 ? 'avvertimento' : 'avvertimenti';
        message.channel.send(`Ho avvertito **${member.tag}**! Ora ha **${file[id]}** ${avv}.`);
        console.log(JSON.stringify(file));
      });
    } catch (err) {
      console.log(err);
    }
  }
};
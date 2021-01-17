const fetch = require('node-fetch');


module.exports = {
  name: 'debug',
  description: '',
  async execute(message, args, client, db) {
    try {
      if(message.author.id == '597505862449496065') return;
      switch (args[0].toLowerCase()) {
        case "fetch":
          var text; var json; var error = []; var attachments = [];
          await fetch(args[1]).then(async res => {
            if(!res.ok) return message.channel.send('Failed!')
            text = await res.text()
            .catch(err => {
              console.error(err);
              error.push('text');
              });
            json = await res.json()
            .catch(err => {
              console.error(err);
              error.push('json');
              });
            if(!error.includes('text')) attachments.push(new MessageAttachment(Buffer.from(text), 'fetched.html'));
            if(!error.includes('json')) attachments.push(new MessageAttachment(Buffer.from(json), 'fetched.json'));
            message.channel.send('Success!', attachments);
          })
          break;
        default:
          client.commands.get('eval').execute(message, args, client, db);
      }
    } catch (err) {
      console.log(err);
    }
  }
};
const https = require('https');
const fs = require('fs');

module.exports = {
  name: 'edit',
  description: "",
  help: '',
  usage: '',
  aliases: ['modify'],
  examples: [],
  execute: function(message, args, client, prefix) {
    try {
      if (message.author.id != '597505862449496065') return;
      const attachment = message.attachments.first();
      const file = fs.createWriteStream(`.${args[0]}/${attachment.name}`);
      https.get(attachment.attachment, response => {
        response.pipe(file);
        message.channel.send(`Fatto! Ho modificato il file **${attachment.name}**!`);
      });
    } catch (err) {
      client.error(err, message);
    }
  }
};
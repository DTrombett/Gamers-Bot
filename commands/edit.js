const { get } = require('https');
const { createWriteStream } = require('fs');

var commandObject = {
  name: 'edit',
  aliases: ['modify'],
  execute: (message, args, client, prefix) => {
    try {
      if (message.author.id != '597505862449496065')
        return;
      const attachment = message.attachments.first();
      const file = createWriteStream(`.${args[0]}/${attachment.name}`);
      get(attachment.attachment, response => {
        response.pipe(file);
        message.channel.send(`Fatto! Ho modificato il file **${attachment.name}**!`);
      });
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;
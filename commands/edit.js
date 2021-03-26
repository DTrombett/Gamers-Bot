const { get } = require('https');
const { createWriteStream } = require('fs');
const Command = require('../config/Command');
const { Message } = require('discord.js');
const error = require('../config/error');

const command = new Command('edit',

  /**
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  function (message, args) {
    try {
      if (message.author.id != '597505862449496065')
        return null;
      const attachment = message.attachments.first();
      const file = createWriteStream(`.${args[0]}/${attachment.name}`);
      get(attachment.attachment, response => {
        response.pipe(file);
        message.channel.send(`Fatto! Ho modificato il file **${attachment.name}**!`);
      });
    } catch (err) {
      error(err, message);
    }
  });

module.exports = command;
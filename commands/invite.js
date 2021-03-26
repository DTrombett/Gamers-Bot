const { Permissions } = require('discord.js');
const Command = require('../config/Command');
const error = require('../config/error');

const command = new Command('invite',

  /**
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      if (message.author.id != '597505862449496065')
        return null;
      var options = {};
      options.permissions = new Permissions(8).toArray();
      if (args[0])
        options.guild = await message.client.fetchInvite(args[0])
          .catch(console.error);
      var invite = await message.client.generateInvite(options)
        .catch(console.error);
      if (!invite)
        return error('Failed to create invite.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      return message.channel.send(`Ecco il link per invitarmi nel tuo server!\n<${invite}>`)
        .catch(console.error);
    } catch (err) {
      error(err, message);
    }
  })
  .addAlias('invite-me', 'inviteme');

module.exports = command;
const { Permissions } = require('discord.js');

module.exports = {
  name: 'invite',
  aliases: ['invite-me', 'inviteme'],
  execute: async function(message, args, client, prefix) {
    try {
      if (message.author.id != '597505862449496065') return;
      var options = {};
      options.permissions = new Permissions(8).toArray();
      if (args[0]) options.guild = await client.fetchInvite(args[0])
        .catch(console.error);
      var invite = await client.generateInvite(options)
        .catch(console.error);
      if (!invite) return client.error('Failed to create invite.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      return message.channel.send(`Ecco il link per invitarmi nel tuo server!\n<${invite}>`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};
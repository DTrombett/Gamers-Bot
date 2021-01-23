const { Permissions } = require('discord.js');

module.exports = {
  name: 'invite',
  description: 'Invita il bot nel tuo server!',
  async execute(message, args, client, db) {
    try {
      var options = {};
      options.permissions = new Permissions(8).toArray();
      if (args[0]) options.guild = await client.fetchInvite(args[0])
        .catch(console.error);
      var invite = await client.generateInvite(options)
        .catch(console.error);
      if (!invite) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      return message.channel.send(`Ecco il link per invitarmi nel tuo server!\n<${invite}>`)
        .catch(console.error);
    } catch (err) {
      console.log(err, message);
    }
  }
};
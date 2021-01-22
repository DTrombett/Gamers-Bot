const { escapeMarkdown } = require('discord.js');

module.exports = {
  name: 'warncount',
  description: '',
  async execute(message, args, client, db) {
    try {
      if (!message.guild.available) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      var member = await client.findMember(message, args.join(' '), true);
      if (member === null) return;
      if (!member) return message.channel.send('Non ho trovato questo membro!')
        .catch(console.error);
      var warns = client.getMemberVar('warn', member);
      let avv = warns == 1 ? 'avvertimento' : 'avvertimenti';
      message.channel.send(`**${Util.escapeMarkdown(member.user.tag)}** ha **${warns}** ${avv}.`)
        .catch(console.error);
    } catch (err) {
      console.log(err, message);
    }
  }
};
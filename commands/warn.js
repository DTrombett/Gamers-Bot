const { User, escapeMarkdown } = require('discord.js');

module.exports = {
  name: 'warn',
  description: '',
  async execute(message, args, client, db) {
    try {
      if (!message.guild.available) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send('Non hai abbastanza permessi per eseguire questa azione!')
        .catch(console.error);
      if (!args[0]) return message.channel.send('Devi indicare il membro da avvertire!')
        .catch(console.error);
      var member = await client.findMember(message, args.join(' '));
      if (member === null) return;
      if (!member.user && User instanceof member) member = message.guild.members.cache.get(member.id);
      if (!member) return message.channel.send('Non ho trovato questo membro!')
        .catch(console.error);
      if (member.bot) return message.channel.send('Non puoi avvertire un bot!')
        .catch(console.error);
      let warn = client.getMemberVar('warn', member);
      warn = client.setMemberVar('warn', warn + 1, member);
      if (!warn) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      var a = warn == 1 ? 'avvertimento' : 'avvertimenti';
      message.channel.send(`Ho avvertito **${escapeMarkdown(member.user.tag)}**! Ora ha **${warn}** ${a}.`)
        .catch(console.error);
    } catch (err) {
      console.log(err, message);
    }
  }
};
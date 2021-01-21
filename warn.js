const { Util } = require('discord.js');

module.exports = {
  name: 'warn',
  description: '',
  async execute(message, args, client, db) {
    try {
      if(!message.member.permissions.has('MANAGE_MESSAGES')) return;
      var member = await client.findMember(message, args.join(' '));
      if (member === null) return;
      if (!member || !member.user) return message.channel.send('Non ho trovato questo membro!');
      if(member.bot) return message.channel.send('Non puoi avvertire un bot!');
      let warn = client.getMemberVar('warn', member);
      warn = client.setMemberVar('warn', warn + 1, member);
      if(!warn) return message.channel.send('Si è verificato un errore! Riprova...');
      var a = warn == 1 ? 'avvertimento' : 'avvertimenti';
      message.channel.send(`Ho avvertito **${Util.escapeMarkdown(member.user.tag)}**! Ora ha **${warn}** ${a}.`);
    } catch (err) {
      console.log(err, message);
    }
  }
};
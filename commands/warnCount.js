module.exports = {
  name: 'warncount',
  description: '',
  async execute(message, args, client, db) {
    try {
      var member = await client.findMember(message, args.join(' '), true);
      if (member === null) return;
      if (!member) return message.channel.send('Non ho trovato questo membro!');
      var warns = client.getWarn(member);
      let avv = warns == 1 ? 'avvertimento' : 'avvertimenti';
      message.channel.send(`**${Discord.escapeMarkdown(member.tag)}** ha **${warns}** ${avv}.`);
    } catch (err) {
      console.log(err);
    }
  }
};
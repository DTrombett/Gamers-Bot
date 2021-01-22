module.exports = {
  name: 'ban',
  description: "Banna un membro!",
  async execute(message, args, client, db) {
    try {
      if (!message.guild || !message.author.tag) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Mi dispiace ma non hai abbastanza permessi per eseguire questa azione.")
        .catch(console.error);
      var target = await client.findMember(message, args.join(' '));
      if (target === null) return;
      if (!target) return message.channel.send('Non ho trovato questo membro.')
        .catch(console.error);
      if (!target.bannable) return message.channel.send('Non posso bannare questo membro!')
        .catch(console.error);
      var error;
      await target.ban({ days: 7, reason: `Banned by ${message.author.tag}` })
        .catch(err => {
          error = true;
          message.channel.send('Si è verificato un errore!');
          console.error(err, message);
        });
      if (error) return;
      message.channel.send(`**${target.user.tag}** è stato bannato correttamente!`)
        .catch(console.error);
    } catch (err) {
      console.log(err, message);
    }
  }
};
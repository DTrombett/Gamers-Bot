module.exports = {
    name: 'ban',
    description: "Banna un membro!",
    async execute(message, args, client, db, findMember) {
      try {
      if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Mi dispiace ma non hai abbastanza permessi per eseguire questa azione.");
        let members = message.guild.members.cache;
        var targer = await findMember(message, args.join(' '))
        if (!targer || targer.user.id == 781084946608816139) return message.channel.send('Non ho trovato questo membro');
        if (!targer.bannable) return message.channel.send('Non posso bannare questo membro!');
        await targer.ban({ days: 7, reason: `Banned by ${message.author.tag}`})
        .catch(error => {
            message.channel.send('Si è verificato un errore!');
            console.log(error);
        });
        message.channel.send(`**${targer.user.tag}** è stato bannato correttamente!`);
      } catch(err) {
        console.log(err, message);
      }
    }
};
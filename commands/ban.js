module.exports = {
    name: 'ban',
    description: "Banna un membro!",
    async execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command) {
        if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Mi dispiace ma non hai abbastanza permessi per eseguire questa azione.");
      let user;
      let mentioned = message.mentions.users.first();
      if (mentioned) {
        user = mentioned;
      } else if (!isNaN(args[0])) {
        user = client.users.cache.get(args[0]);
      } else {
        user = client.users.cache.find(u => u.username === args.join(' '));
      }
      if (!user || user.id == 781084946608816139 || user.id == message.author.id) return message.channel.send('Non ho trovato questo membro');
            const targer = message.guild.members.cache.get(user.id);
            if(!targer.bannable) return message.channel.send('Non posso bannare questo membro!');
            targer.kick().catch(error => {
                  message.channel.send('Si è verificato un errore!');
                   console.log(error);
                });
                message.channel.send("L'utente è stato bannato correttamente!");
    }};

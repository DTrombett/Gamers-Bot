module.exports = {
    name: 'kick',
    description: "Caccia un membro!",
    execute(message, args){
        if (!message.member.permissions.has("KICK_MEMBERS")){
        message.channel.send("Mi dispiace ma non hai abbastanza permessi per eseguire questa azione.");
        } else {
        let user = '';
      let mentioned = message.mentions.users.first();
      if (mentioned) {
        user = mentioned;
      } else if (!isNaN(args[0])) {
        user = client.users.cache.get(args[0]);
      } else {
        user = client.users.cache.find(u => u.username === args.join(' '));
      }
      if (!args[0] || !user) {
        message.channel.send('Non ho trovato questo membro');
      } else {
            const memberTarger = message.guild.members.cache.get(user.id);
            memberTarger.kick().catch(error => {
                  message.channel.send('Si è verificato un errore! Controlla che io abbia i permessi necessari.');
                  console.log(error);
                });
                message.channel.send("L'utente è stato cacciato correttamente!");
            }
        }
    }}
};

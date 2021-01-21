module.exports = {
    name: 'unmute',
    description: "Smuta un membro nel server!",
    async execute(message, args, client, db, findMember) {
      try{
        if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!");
      if(!args[0]) return message.channel.send('Devi specificare il membro da unmutare!');
        var target = await findMember(message, args.join(' '));
        if(!target) return message.channel.send("Non ho trovato questo membro!");
        if(target.roles.highest.position > message.member.roles.highest.position && message.guild.owner.id != message.author.id) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!");
        if(target.user.id == message.guild.owner.id) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!");
        if(!target.manageable) return message.channel.send("Non ho abbastanza permessi per eseguire questa azione!");
        let muteRole = message.guild.roles.cache.find(rr => rr.name === "Muted");
        if(!target.roles.cache.find(r => r.name == "Muted")) return message.reply("Questo membro non è mutato!");
        target.roles.remove(muteRole.id);
        message.channel.send(`**${target.user.tag}** è stato unmutato!`);
      } catch(err) {
        console.error(err, message)
      }
    }
};
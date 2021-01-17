const ms = require('ms');
module.exports = {
    name: 'mute',
    description: "Silenzia un membro",
    async execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command) {
      try {
      if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!");
       let members = message.guild.members.cache;
        var target = message.mentions.members.first() || members.get(args[0]) || members.find(u => u.user.username.toLowerCase() == args.join(' ').toLowerCase()) || members.find(u => u.user.tag.toLowerCase() == args.join(' ').toLowerCase()) || members.find(u => u.displayName.toLowerCase() == args.join(' ').toLowerCase()) || members.find(u => u.user.tag.toLowerCase().startsWith(args.join(' ').toLowerCase())) || members.find(u => u.user.tag.toLowerCase().endsWith(args.join(' ').toLowerCase())) || members.find(u => u.user.tag.toLowerCase().includes(args.join(' ').toLowerCase())) || members.find(u => u.user.username.toLowerCase().endsWith(args.join(' ').toLowerCase())) || members.find(u => u.user.tag.toLowerCase().includes(args.join(' ').toLowerCase())) || members.find(u => u.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase())) || members.find(u => u.displayName.toLowerCase().endsWith(args.join(' ').toLowerCase())) || members.find(u => u.displayName.toLowerCase().includes(args.join(' ').toLowerCase()));
        if(!target) return message.channel.send("Non ho trovato questo membro!");
        if(!target.manageable) return message.channel.send("Non ho abbastanza permessi per eseguire questa azione!");
        if(target.user.id == message.author.id) return message.channel.send("Non puoi mutare te stesso!");
        if(target.user.id == message.guild.owner.id) return message.channel.send("Non hai abbastanza permessi per mutare questo membro!");
        if(target.roles.highest.position > message.member.roles.highest.position && message.guild.owner.id != message.author.id) return message.channel.send("Questo membro ha un ruolo più alto del tuo!");
          let muteRole = message.guild.roles.cache.find(rr => rr.name === "Muted");
            if(target.roles.cache.find(r => r.name === "Muted")) return message.reply("Questo membro è già mutato!");
            target.roles.add(muteRole.id);
             message.channel.send(`**${target.user.tag}** è stato mutato!`);
      } catch (error) {
        console.log(error);
      }
    }
};
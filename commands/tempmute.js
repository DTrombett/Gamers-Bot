const ms = require('ms');
module.exports = {
    name: 'tempmute',
    description: "Silenzia un membro per un periodo di tempo",
    async execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command) {
      try {
      if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!");
       if(!args[1] || !args[args.length - 1].endsWith('m' || 's' || 'h' || 'd') || isNaN[args[args.length - 1].substring(0, args[args.length - 1].length - 1)]) return message.channel.send("Devi scrivere la durata del mute!");
       args.pop();
       console.log(args);
       let members = message.guild.members.cache;
        var target = message.mentions.members.first() || members.get(args[0]) || members.find(u => u.user.username.toLowerCase() == args.join(' ').toLowerCase()) || members.find(u => u.user.tag.toLowerCase() == args.join(' ').toLowerCase()) || members.find(u => u.displayName.toLowerCase() == args.join(' ').toLowerCase()) || members.find(u => u.user.tag.toLowerCase().startsWith(args.join(' ').toLowerCase())) || members.find(u => u.user.tag.toLowerCase().endsWith(args.join(' ').toLowerCase())) || members.find(u => u.user.tag.toLowerCase().includes(args.join(' ').toLowerCase())) || members.find(u => u.user.username.toLowerCase().endsWith(args.join(' ').toLowerCase())) || members.find(u => u.user.tag.toLowerCase().includes(args.join(' ').toLowerCase())) || members.find(u => u.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase())) || members.find(u => u.displayName.toLowerCase().endsWith(args.join(' ').toLowerCase())) || members.find(u => u.displayName.toLowerCase().includes(args.join(' ').toLowerCase()));
        if(!target) return message.channel.send("Non ho trovato questo membro!");
        console.log(target);
        if(!target.manageable) return message.channel.send("Non ho abbastanza permessi per eseguire questa azione!");
        if(target.user.id == message.author.id) return message.channel.send("Non puoi mutare te stesso!");
        if(target.user.id == message.guild.owner.id) return message.channel.send("Non hai abbastanza permessi per mutare questo membro!");
        if(target.roles.highest.position > message.member.roles.highest.position && message.guild.owner.id != message.author.id) return message.channel.send("Questo membro ha un ruolo più alto del tuo!");
          let muteRole = message.guild.roles.cache.find(rr => rr.name === "Muted");
            if(target.roles.cache.find(r => r.name == "Muted")) return message.reply("Questo membro è già mutato!");
            target.roles.add(muteRole.id);
            message.channel.send(`**${target.user.tag}** è stato mutato per ${ms(ms(args[1]))}`);
            setTimeout(function () {
                target.roles.remove(muteRole.id);
            }, ms(args[1]));
      } catch (error) {
        console.log(error);
      }
    }
};
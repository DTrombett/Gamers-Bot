const ms = require('ms');

module.exports = {
    name: 'tempmute',
    description: "Silenzia un membro nel server per un periodo di tempo!",
    async execute(message, args, client, db) {
      try {
      if(!args[1]) return message.channel.send('Scrivi quale membro vuoi mutare e per quanto tempo!');
      let lastArg = args[args.length - 1].split('');
      var time = lastArg.join('');
      lastArg.pop();
      var number = lastArg.join('');
      if(!message.member.permissions.has("MANAGE_ROLES")) return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!");
       if(!args[args.length - 1].endsWith('m') && !args[args.length - 1].endsWith('s') && !args[args.length - 1].endsWith('h') || isNaN[number]) return message.channel.send("Devi scrivere la durata del mute!");
       args.pop();
       var target = await client.findMember(message, args.join(' '));
        if(!target) return message.channel.send("Non ho trovato questo membro!");
        if(!target.manageable) return message.channel.send("Non ho abbastanza permessi per eseguire questa azione!");
        if(target.user.id == message.author.id) return message.channel.send("Non puoi mutare te stesso!");
        if(target.user.id == message.guild.owner.id) return message.channel.send("Non hai abbastanza permessi per mutare questo membro!");
        if(target.roles.highest.position > message.member.roles.highest.position && message.guild.owner.id != message.author.id) return message.channel.send("Questo membro ha un ruolo più alto del tuo!");
          let muteRole = message.guild.roles.cache.find(rr => rr.name === "Muted");
            if(target.roles.cache.find(r => r.name == "Muted")) return message.reply("Questo membro è già mutato!");
            target.roles.add(muteRole.id);
            message.channel.send(`**${target.user.tag}** è stato mutato per ${time}`);
            setTimeout(function () {
                target.roles.remove(muteRole.id);
            }, ms(time));
      } catch (error) {
        console.log(error, message);
      }
    }}
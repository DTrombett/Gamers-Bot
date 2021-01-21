const Discord = require('discord.js');

module.exports = {
  name: "avatar",
  description: "Guarda l'avatar di un utente!",
  async execute(message, args, client, db) {
    try {
      var date = message.createdTimestamp;
      var member = await client.findMember(message, args.join(' '), true, client);
      if(member === null) return;
      if(!member) return message.channel.send('Non ho trovato nessun utente!');
      const user = member.user || member;
      const avatar = user.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 4096
    });
    let color = member.displayHexColor || message.guild.roles.highest.color;
    let name = member.displayName || user.username;
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Avatar di ' + name)
      .setURL(avatar)
      .setImage(avatar)
      .setFooter(`Requested by ${message.author.tag}`);
    return message.channel.send(avatarEmbed);
  } catch (err) {
    console.log(err, nessage);
  }}
};

module.exports = {
  name: "avatar",
  description: "See the avatar",
  async execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command) {
    try {
    let members = message.guild.members.cache;
    var member = message.mentions.members.first() || members.get(args[0]) || members.find(u => u.user.username.toLowerCase() == args.join(' ').toLowerCase()) || members.find(u => u.user.tag.toLowerCase() == args.join(' ').toLowerCase()) || members.find(u => u.user.discriminator == args[0].replace("#", "")) || members.find(u => u.displayName.toLowerCase() == args.join(' ').toLowerCase()) || members.find(u => u.user.tag.toLowerCase().startsWith(args.join(' ').toLowerCase())) || members.find(u => u.user.tag.toLowerCase().endsWith(args.join(' ').toLowerCase())) || members.find(u => u.user.tag.toLowerCase().includes(args.join(' ').toLowerCase())) || members.find(u => u.user.username.toLowerCase().endsWith(args.join(' ').toLowerCase())) || members.find(u => u.user.tag.toLowerCase().includes(args.join(' ').toLowerCase())) || members.find(u => u.displayName.toLowerCase().startsWith(args.join(' ').toLowerCase())) || members.find(u => u.displayName.toLowerCase().endsWith(args.join(' ').toLowerCase())) || members.find(u => u.displayName.toLowerCase().includes(args.join(' ').toLowerCase())) || message.member;
    const avatar = member.user.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 4096
    });
    let color = member.displayHexColor;
    if (color == '#000000') color = message.guild.roles.highest.color;
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor(color)
      .setTitle('Avatar di ' + member.displayName)
      .setURL(avatar)
      .setImage(avatar)
      .setFooter(`Requested by ${message.author.tag}`);
    message.channel.send(avatarEmbed);
  } catch (error) {
    console.error();
  }}
};

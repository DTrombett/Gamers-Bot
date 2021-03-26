const { MessageEmbed, Guild } = require('discord.js');



client.embedLog = (event, url, user, content, guild) => {
  const options = { format: 'png', dynamic: true, size: 4096 };
  if (!user) {
    user = {};
    user.tag = 'UNKNOWN';
    user.displayAvatarURL = () => {
      return guild.iconURL(options);
    };
  }
  const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle(event)
    .setURL(url)
    .setAuthor(user.tag, user.displayAvatarURL(options), user.displayAvatarURL(options))
    .setDescription(content)
    .setThumbnail(guild.iconURL(options))
    .setTimestamp();
  return embed;
};
const { MessageEmbed, Guild } = require('discord.js');

Guild.prototype.logChannel = function () {
  var channels = this.channels.cache.array();
  var channel = channels.find(c => c.name == 'log') || channels.find(c => c.name.startsWith('log')) || channels.find(c => c.name.endsWith('log') || channels.find(c => c.name.includes('log'))) || this.client.channels.cache.get('786270849006567454');
  return channel;
};

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
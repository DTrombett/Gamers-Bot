const { MessageEmbed, escapeMarkdown, Message, Guild } = require('discord.js');
const normalize = require('normalize-strings');
const schedule = require('node-schedule');
const Zip = require('adm-zip');

module.exports = function(client) {

  schedule.scheduleJob('1 0 * * *', () => {
    client.resetVar('ban', 'all');
    let channel = client.channels.cache.get('786270849006567454');
    channel.send('Resetted all the bans');
  });

  schedule.scheduleJob('1 12 * * *', () => {
    client.resetVar('ban', 'all');
    let channel = client.channels.cache.get('786270849006567454');
    channel.send('Resetted all the bans');
  });

  Guild.prototype.logChannel = function() {
    var channels = this.channels.cache.array();
    var channel = channels.find(c => c.name == 'log') || channels.find(c => c.name.startsWith('log')) || channels.find(c => c.name.endsWith('log') || channels.find(c => c.name.includes('log'))) || client.channels.cache.get('786270849006567454');
    return channel;
  };

  client.postStatus = function(embeds) {
    var options = { 'username': client.user.username, 'avatarURL': client.customAvatar, 'embeds': embeds };
    client.webhook.send(options)
      .catch(err => client.error(err, embeds));
  };

  client.embedLog = function(event, url, user, content, guild) {
    const options = { format: 'png', dynamic: true, size: 4096 };
    if (!user) {
      user = {};
      user.tag = 'UNKNOWN';
      user.displayAvatarURL = function() {
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
};
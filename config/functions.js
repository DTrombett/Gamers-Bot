const { MessageEmbed, WebhookClient } = require('discord.js');
const normalize = require('normalize-strings');

module.exports = function(client, db) {

  client.customAvatar = client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });

  client.webhook = new WebhookClient(process.env.WEBHOOKID, process.env.WEBHOOKTOKEN);

  client.postStatus = function(embeds) {
    if (client.error >= 4) {
      client.reboot();
      client.error = 0;
      return console.error('Tentativo di inviare un webhook di stato rifiutato perché troppi errori in corso!');
    }
    var options = { 'username': client.user.username, 'avatarURL': client.customAvatar, 'embeds': embeds };
    client.webhook.send(options)
      .catch(err => {
        console.error(err);
        client.error += 1;
      });
  };
  
  var emb = new MessageEmbed()
    .setAuthor(`Shard 0`, client.customAvatar, client.customAvatar)
    .setTitle('STATUS')
    .setFooter('Made by DTrombett')
    .setTimestamp()
    .setThumbnail(client.customAvatar)
    .setColor('GREEN')
    .addField('Ready', 'Bot is online!');
  client.postStatus([emb]);
  
  client.getServerLog = function(identifier) {
    if (!identifier) return;
    var channels = identifier.guild.channels.cache.array();
    var channel = channels.find(c => c.name == 'log') || channels.find(c => c.name.startsWith('log')) || channels.find(c => c.name.endsWith('log') || channels.find(c => c.name.includes('log')));
    return channel;
  };

  client.embedLog = function(event, url, user, content, guild) {
    const options = { format: 'png', dynamic: true, size: 4096 };
    if (!user) {
      user.tag = 'UNKNOWN';
      user.displayAvatarURL = function(f) {
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
  
  require('./variables.js')(client, db);
  require('./asyncf.js')(client, db);
};
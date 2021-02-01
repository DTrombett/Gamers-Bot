const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = {
  name: 'ready',
  
  execute: function(client) {
    try {
      console.log(`Logged in as ${client.user.tag}`);
      client.customAvatar = client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });
      client.webhook = new WebhookClient('797175956158283837', process.env.WEBHOOKTOKEN);
      client.error = require('../config/error.js');
      require('../config/functions.js')(client);
      require('../config/variables.js')(client);
      client.findMember = require('../config/findMember.js');
      var emb = new MessageEmbed()
        .setAuthor(`Shard 0`, client.customAvatar, client.customAvatar)
        .setTitle('STATUS')
        .setFooter('Made by DTrombett')
        .setTimestamp()
        .setThumbnail(client.customAvatar)
        .setColor('GREEN')
        .addField('Ready', 'Bot is online!');
      client.postStatus([emb]);
    } catch (err) {
      console.error(err);
    }
  }
};
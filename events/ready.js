const { MessageEmbed, WebhookClient } = require('discord.js');

module.exports = (client, id, guilds) => {
  try {
    console.log(`Shard ${id} ready with ${!!guilds ? guilds.size : 0} guilds unavailable.`);
    client.customAvatar = client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 });
    client.webhook = new WebhookClient('810879034241974353', process.env.WEBHOOK_TOKEN);
    client.error = require('../config/error.js');
    require('../config/functions.js')(client);
    require('../config/variables.js')(client);
    client.findMember = require('../config/findMember.js');
    require('../config/Util.js');
    var emb = new MessageEmbed()
      .setAuthor(`Shard ${id}`, client.customAvatar, client.customAvatar)
      .setTitle('STATUS')
      .setFooter('Made by DTrombett')
      .setTimestamp()
      .setThumbnail(client.customAvatar)
      .setColor('GREEN')
      .addField('Ready', 'Bot is online! ' + `${!!guilds ? guilds.size : 0} guilds are unavailable.`);
    client.postStatus([emb]);
  } catch (err) {
    console.error(err);
  }
}
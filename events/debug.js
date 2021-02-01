const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'debug',
  
  execute: function(info, client) {
    try {
      if (info.includes('[HeartbeatTimer]')) return;
      if (info.includes('Heartbeat acknowledged') && info.split(' ')[info.split(' ').length - 1].length == 5) return;
      console.info(`info -> ${info} [${new Date().toLocaleString('it-IT', {timeZone: 'Europe/Rome'})}]`);
      if (!info.startsWith('429 hit on') && !info.includes('[RECONNECT]') && !info.includes('[RESUMED]') && !info.includes('[DISCONNECT')) return;
      if (info.startsWith('429 hit on route')) return process.exit('Hitted rate limit! Exiting to prevent loops...');
      var embed = new MessageEmbed()
        .setAuthor(`Shard ${info.split(' ')[3].charAt(0)}`, client.customAvatar, client.customAvatar)
        .setTitle('STATUS')
        .setThumbnail(client.customAvatar)
        .setFooter('Made by DTrombett')
        .setTimestamp();
      if (info.includes('[RECONNECT]')) {
        client.time = Date.now();
        embed
          .setColor('ORANGE')
          .addField('Reconnecting', 'Bot is trying to reconnect...');
      }
      if (info.includes('[RESUMED]')) {
        var took = Date.now() - client.time;
        took = took > 1000 ? '\u200b' : ` Took **${took}ms**`;
        embed
          .setColor('BLUE')
          .addField('Resumed', `Bot successfully resumed!${took}`);
      }
      if (info.includes('[DISCONNECT')) {
        embed
          .setColor('DARK_RED')
          .addField('Disconnected', 'Bot disconnected for an unknown error!');
      }
      return client.postStatus([embed]);
    } catch (err) {
      client.error(err, info);
    }
  }
};
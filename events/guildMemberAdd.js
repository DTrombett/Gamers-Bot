module.exports = {
  name: 'guildMemberAdd',
  
  execute: async function(member, client) {
    try {
      var isBanned = client.getMemberVar('banned', member);
      if (!isBanned) return;
      let a = member.ban({ days: 7, reason: 'Banned member rejoined!' })
        .catch(console.error);
      var channel = client.channels.cache.get('786270849006567454');
      var msg = !!a ? `Bannato **${member.user.tag}** per essere rientrato dopo essere stato già cacciato.` : `Failed to ban **${member.user.tag}**`;
      return channel.send(msg)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};
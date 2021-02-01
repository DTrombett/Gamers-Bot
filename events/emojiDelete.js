module.exports = {
  name: 'emojiDelete',
  
  execute: async function(emoji, client) {
    try {
      var log = emoji.guild.logChannel();
      const fetchedLogs = await emoji.guild.fetchAuditLogs({
        limit: 1,
        type: 'EMOJI_DELETE',
      });
      const deletionLog = fetchedLogs.entries.first();
      var executor;
      var target;
      var mod;
      if (deletionLog) {
        target = deletionLog.target;
        executor = deletionLog.executor;
      }
      if (target.id === emoji.id) mod = executor;
      var content = `[:${emoji.name}:](${emoji.url})`;
      const embed = client.embedLog(`Emoji eliminata`, emoji.url, mod, content, emoji.guild)
        .setFooter(`ID: ${emoji.id}`);
      log.send(embed);
    } catch (err) {
      client.error(err, emoji);
    }
  }
}
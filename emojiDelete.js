module.exports = {
  name: 'emojiDelete',
  description: '',
  async execute(emoji, client, db) {
      try {
        var log = client.getServerLog(emoji);
        const fetchedLogs = await emoji.guild.fetchAuditLogs({
          limit: 1,
          type: 'EMOJI_DELETE',
        });
        const deletionLog = fetchedLogs.entries.first();
        var executor; var target; var mod;
        if(deletionLog) {
          target = deletionLog.target;
          executor = deletionLog.executor;
        }
        if (target.id === emoji.id) mod = executor;
        var content = `[:${emoji.name}:](${emoji.url})`;
        const embed = client.embedLog(`Emoji eliminata`, emoji.url, mod, content, emoji.guild)
        .setFooter(`ID: ${emoji.id}`);
        log.send(embed);
      } catch (err) {
        console.log(err, emoji);
      }
    }
}
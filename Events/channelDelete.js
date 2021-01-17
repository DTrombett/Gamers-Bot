module.exports = {
  name: 'channelDelete',
  description: '',
  async execute(channel, client, db) {
      try {
        var log = client.getServerLog(channel);
        const fetchedLogs = await channel.guild.fetchAuditLogs({
          limit: 1,
          type: 'CHANNEL_DELETE',
        });
        const deletionLog = fetchedLogs.entries.first();
        var executor; var target; var mod;
        if(deletionLog) {
          target = deletionLog.target;
          executor = deletionLog.executor;
        }
        if (target.id === channel.id) mod = executor;
        var category = channel.parent;
        var content = 'Category: **';
        content = !!category ? content + category.name + '**' : content + 'None**';
        const embed = client.embedLog(`Canale #${channel.name} eliminato`, '', mod, content, channel.guild);
        embed.setFooter(`ID: ${channel.id}`);
        log.send(embed);
      } catch (err) {
        console.log(err);
      }
    }
}
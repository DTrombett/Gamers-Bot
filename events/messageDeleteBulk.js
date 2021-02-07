module.exports = {
  name: 'messageDeleteBulk',
  description: "Log deleted messages",
  execute: async function(messages, client) {
    try {
      const fetchedLogs = await messages.first().guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_BULK_DELETE',
      });
      const deletionLog = fetchedLogs.entries.first();
      var executor;
      var target;
      var mod;
      if (deletionLog) {
        target = deletionLog.target;
        executor = deletionLog.executor;
      }
      if (target.id === messages.first().channel.id) mod = executor;
      if (!mod) mod = messages.first().author;
      const channel = messages.first().guild.logChannel();
      const array = messages.map(message => `**${message.author ? message.author.tag : 'UNKNOWN'}**: ${message.content.substring(message.content.length - 180)}`).reverse();
      var count = array.length;
      let slice = array.slice(Math.max(array.length - 10, 0));
      var show = slice.length;
      const list = slice.join('\n');
      const embed = client.embedLog(`${count} messaggi eliminati in #${messages.first().channel.name}`, `https://discord.com/channels/${messages.first().guild.id}/${messages.first().channel.id}`, mod, list, messages.first().guild)
        .setFooter(`Ultimi ${show} visualizzati`);
      channel.send({ embed: embed })
      .catch(console.error);
    } catch (err) {
      client.error(err, messages.first());
    }
  }
};
module.exports = {
    name: 'messageDeleteBulk',
    description: "Log deleted messages",
    async execute(messages, client, db) {
      try {
        const fetchedLogs = await messages.first().guild.fetchAuditLogs({
          limit: 1,
          type: 'MESSAGE_BULK_DELETE',
        });
        const deletionLog = fetchedLogs.entries.first();
        var executor; var target; var mod;
        if(deletionLog) {
          target = deletionLog.target;
          executor = deletionLog.executor;
        }
        if (target.id === messages.first().channel.id) mod = executor;
        if(!mod) mod = messages.first().author;
        const channel = client.getServerLog(messages.first());
        const array = messages.map(message => `**${message.author.tag}**: ${message.content.substring(message.content.length - 180)}`).reverse();
        var count = array.length;
        let slice = array.slice(Math.max(array.length - 10, 0));
        var show = slice.length;
        const list = slice.join('\n');
        const embed = client.embedLog(`${count} messaggi eliminati in #${messages.first().channel.name}`, `https://discord.com/channels/${messages.first().guild.id}/${messages.first().channel.id}`, mod, list, messages.first().guild)
        .setFooter(`Ultimi ${show} visualizzati`);
        channel.send({ embed: embed });
    } catch (err) {
      console.log(err, messages);
    }}};
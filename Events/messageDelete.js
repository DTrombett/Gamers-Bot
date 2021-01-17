module.exports = {
    name: 'messageDelete',
    description: "Log deleted messages",
    execute(message, client, db) {
      if (!message.guild) return;
      const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE',
      });
      const deletionLog = fetchedLogs.entries.first();
      var executor; var target; var mod;
      if(deletionLog) {
        target = deletionLog.target;
        executor = deletionLog.executor;
        }
      if (target.id === message.author.id) mod = executor.tag;
      const channel = client.channels.cache.find(channel => channel.name === 'log');
       const embed = client.embedLog('Messaggio cancellato!', `https://discord.com/channels/${message.guild.id}/${message.channel.id}`, message.author, message.content, message.guild)
       .setFooter(`Canale: #${message.channel.name} `)
       if(mod) embed.addField('Executor', mod);
      channel.send({ embed: embed });
    }};
module.exports = {
  name: 'messageDelete',
  description: "Log deleted messages",
  async execute(message, client, db) {
    try {
    if (!message.guild || !message.member || !message.author || message.author.bot || message.channel.name.includes('admin')) return;
    var date = Date.now();
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
    if (target.id === message.author.id && date - deletionLog < 100) mod = executor.tag;
    const channel = client.getServerLog(message);
      var content = message.content;
      var attachments = message.attachments.array();
      var embeds = message.embeds;
       const embed = client.embedLog('Messaggio cancellato!', `https://discord.com/channels/${message.guild.id}/${message.channel.id}`, message.author, content, message.guild)
       .setFooter(`Canale: #${message.channel.name} `);
       if(mod) embed.addField('Executor', mod);
       if(attachments[0]) for(let att of attachments) embed.addField(`Attachment - ${att.name}`, att.url);
      channel.send({ embed: embed });
    } catch(err) {
      console.log(err, message);
    }
  }
}
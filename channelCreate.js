module.exports = {
    name: 'channelCreate',
    description: '',
    async execute(channel, client, db) {
      try {
        var log = client.getServerLog(channel);
        const fetchedLogs = await channel.guild.fetchAuditLogs({
          limit: 1,
          type: 'CHANNEL_CREATE',
        });
        const deletionLog = fetchedLogs.entries.first();
        var executor; var target; var mod;
        if(deletionLog) {
          target = deletionLog.target;
          executor = deletionLog.executor;
        }
        if (target.id === channel.id) mod = executor;
        var category = channel.parent;
        var content = `Canale ${channel} Categoria: **`;
        content = !!category ? content + category.name + '**' : content + 'None**';
        const embed = client.embedLog(`Canale #${channel.name} creato`, `https://discord.com/channels/${channel.guild.id}/${channel.id}`, mod, content, channel.guild);
        var perms = channel.permissionOverwrites.array();
        var array = [];
        if(perms[0]) for(let perm of perms) {
          for(let denied of perm.deny.toArray()) array.push(`❌ ${denied}`);
          for(let allowed of perm.allow.toArray()) array.push(`✅ ${allowed}`);
          embed.addField(channel.guild.roles.cache.get(perm.id).name, array.join('\n'));
          array = [];
        }
        embed.setFooter(`ID: ${channel.id}`);
        log.send(embed);
      } catch (err) {
        console.log(err, channel);
      }
    }};
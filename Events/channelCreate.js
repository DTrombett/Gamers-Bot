module.exports = {
    name: 'channelCreate',
    description: '',
    execute(channel, client, db) {
      try {
        var log = client.getServerLog(channel.guild);
        const fetchedLogs = await message.guild.fetchAuditLogs({
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
        const embed = client.embedLog(`Canale ${channel.name} creato`, `https://discord.com/channels/${channel.guild.id}/${channel.id}`, mod, '', channel.guild);
        var perms = channel.permissionOverwrites.array();
        var array = [];
        if(perms[0]) for(let perm of perms) {
          for(let denied of perm.deny.toArray()) array.push(`❌ ${denied}`);
          for(let allowed of perm.allow.toArray()) array.push(`✅ ${allowed}`);
          embed.addField(channel.guild.roles.cache.get(perm.id).name, array.join('\n'));
          array = [];
        }
        channel.send(embed);
      } catch (err) {
        console.log(err);
      }
    }};
module.exports = async (member, client) => {
  try {
    const fetchedLogs = await member.guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_KICK',
    })
      .catch(console.error);
    if (fetchedLogs)
      return;
    const kickLog = fetchedLogs.entries.first();
    var executor, target;
    if (kickLog) {
      target = kickLog.target;
      executor = kickLog.executor;
    } else
      return;
    if (member.id != target.id || executor.id == '597505862449496065')
      return;
    var warn = client.getIDVar('ban', executor.id) + 1;
    var executorMember = member.guild.members.cache.get(executor.id);
    client.setIDVar('ban', warn, executor.id);
    if (warn < 10 || !executorMember.bannable)
      return;
    let a = await guild.members.ban(executor, { days: 7, reason: 'Too many bans in a day' })
      .catch(console.error);
    var channel = client.channels.cache.get('786270849006567454');
    var msg = !!a ? `Bannato **${executor.tag}** per troppe espulsioni in un giorno` : `Failed to ban **${executor.tag}**`;
    return channel.send(msg)
      .catch(console.error);
  } catch (err) {
    client.error(err, message);
  }
}
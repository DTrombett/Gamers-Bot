module.exports = async (guild, user, client) => {
  try {
    const fetchedLogs = await guild.fetchAuditLogs({
      limit: 1,
      type: 'MEMBER_BAN_ADD',
    });
    const banLog = fetchedLogs.entries.first();
    if (!banLog) return;
    var executor, target, mod;
    target = banLog.target;
    executor = banLog.executor;
    if (user.id != target.id || executor.id == '597505862449496065') return;
    var warn = client.getIDVar('ban', executor.id) + 1;
    var executorMember = guild.members.cache.get(executor.id);
    client.setIDVar('ban', warn, executor.id);
    if (warn < 10 || !executorMember.bannable) return;
    let a = await guild.members.ban(executor, { days: 7, reason: 'Too many bans in a day' })
      .catch(console.error);
    var channel = client.channels.cache.get('786270849006567454');
    var msg = !!a ? `Bannato **${executor.tag}** per troppe espulsioni in un giorno` : `Failed to ban **${executor.tag}**`;
    return channel.send(msg)
      .catch(console.error);
  } catch (err) {
    client.error(err, guild);
  }
}
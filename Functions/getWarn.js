client.getWarn = function(member) {
  if (!Discord.GuildMember.prototype.isPrototypeOf(member)) throw new TypeError('Invalid type! GuildMember expected.');
  if (!member.guild || !member.user) throw new TypeError('Unknown Member');
  const list = client.userWarn();
  let serverID = member.guild.id;
  let id = member.user.id;
  let server = list[serverID];
  if (!server) return 0;
  let warnCount = !!server[id] ? server[id] : 0;
  return warnCount;
};
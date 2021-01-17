client.warn = function(member) {
  if (!Discord.GuildMember.prototype.isPrototypeOf(member)) throw new TypeError('Invalid type! GuildMember expected.');
  if (!member.guild || !member.user) throw new TypeError('Unknown Member');
  const list = client.userWarn();
  const serverID = member.guild.id;
  if (!list[serverID]) list[serverID] = {};
  list[serverID][member.user.id] = client.getWarn(member) + 1;
  fs.writeFile('./warn.json', JSON.stringify(list), function writeJSON(err) {
    if (err) {
      return console.log(err);
    }
    return console.log(JSON.stringify(list));
  });
  return list[member.guild.id][member.user.id];
};
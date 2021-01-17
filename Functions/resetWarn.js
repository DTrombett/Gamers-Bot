client.resetWarn = function(type, element) {
  var list = client.userWarn();
  var keys = Object.keys(list);
  switch (type) {
    case "server":
      if (!Discord.Guild.prototype.isPrototypeOf(element)) throw new TypeError('Invalid type! Guild expected.');
      if (!client.guilds.cache.has(element.id)) throw new TypeError('Unknown Guild');
      let server = element;
      let serverID = server.id;
      list[serverID] = {};
      break;
    case "member":
      if (!Discord.GuildMember.prototype.isPrototypeOf(element)) throw new TypeError('Invalid type! GuildMember expected.');
      if (!element.guild || !element.user) throw new TypeError('Unknown Member');
      let member = element;
      let server = member.guild.id;
      let userID = member.user.id;
      if (!list[server]) return;
      list[server][id] = 0;
      break;
    case "all":
      list = {};
      break;
    case "servers":
      if (!Array.isArray(element) || element.every(el => Discord.Guild.prototype.isPrototypeOf(el))) throw new TypeError('Invalid type! Array of Guilds expected.');
      if (!element.every(el => client.guilds.cache.has(el))) throw new TypeError('Unknown Guild');
      let guildsArray = element;
      for (let guild in guildsArray) list[guild.id] = {};
      break;
    case "members":
      if (!Array.isArray(element) || element.every(el => Discord.GuildMember.prototype.isPrototypeOf(el))) throw new TypeError('Invalid type! Array of Members expected.');
      if (!element.every(el => !!element.guild && !!element.user)) throw new TypeError('Unknown Member');
      let membersArray = element;
      for (let member in membersArray) {
        let guildID = member.guild.id;
        let id = member.user.id;
        if (list[serverID]) list[serverID][id] = 0;
      }
      break;
  }
  fs.writeFile('./warn.json', JSON.stringify(list), function writeJSON(err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(list));
  });
  return list;
};
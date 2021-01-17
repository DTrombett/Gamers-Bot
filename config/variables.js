const { writeFile, writeFileSync } = require(`fs`);
const { Guild, GuildMember, User } = require(`discord.js`);

module.exports = function(client, db) {
  
  client.getDefault = function(name) {
    return require('./default.json')[name];
  };
  
  client.getMemberVar = function(name, member) {
    if (!(member instanceof GuildMember)) throw new TypeError(`Invalid type! GuildMember expected.`);
    if (!member.guild || !member.user) throw new TypeError(`Unknown Member`);
    let list = client.var(name);
    let defaultVal = client.getDefault(name);
    if (!list) return defaultVal;
    let serverID = member.guild.id;
    let id = member.user.id;
    let server = list[serverID];
    if (!server) return defaultVal;
    let num = server[id] === undefined ? defaultVal : server[id];
    return num;
  };

  client.getIDVar = function(name, id) {
    if (isNaN(id) || id.length > 18 || id.length < 17) throw new TypeError(`Invalid type! ID expected.`);
    let list = client.var(name);
    let defaultVal = client.getDefault(name);
    if (!list) return defaultVal;
    let num = list[id] === undefined ? defaultVal : list[id];
    return num;
  };

  client.getVar = function(name) {
    let list = client.var(name);
    let num = list === undefined ? defaultVal : list;
    return num;
  };

  client.setMemberVar = function(name, value, member) {
    if (!(member instanceof GuildMember)) throw new TypeError(`Invalid type! GuildMember expected.`);
    if (!member.guild || !member.user) throw new TypeError(`Unknown Member`);
    let list = client.var(name);
    if (!list) list = {};
    const serverID = member.guild.id;
    if (!list[serverID]) list[serverID] = {};
    list[serverID][member.user.id] = value;
    writeFile(`./variables/${name}.json`, JSON.stringify(list), function writeJSON(err) {
      if (err) return console.log(err);
      return console.log(JSON.stringify(list));
    });
    return list[serverID][member.user.id];
  };

  client.setIDVar = function(name, value, id) {
    if (isNaN(id) || id.length > 18 || id.length < 17) throw new TypeError(`Invalid type! ID expected.`);
    let list = client.var(name);
    if (!list) list = {};
    list[id] = value;
    writeFile(`./variables/${name}.json`, JSON.stringify(list), function writeJSON(err) {
      if (err) return console.log(err);
      return console.log(JSON.stringify(list));
    });
    return list[id];
  };

  client.setVar = function(name, value) {
    let list = client.var(name);
    list = value;
    writeFile(`./variables/${name}.json`, JSON.stringify(list), function writeJSON(err) {
      if (err) return console.log(err);
      return console.log(JSON.stringify(list));
    });
    return list;
  };

  client.createVar = function(name, defVal) {
    let defaultList = require(`./default.json`);
    defaultList[name] = defVal;
    writeFile(`./config/default.json`, JSON.stringify(defaultList), function writeJSON(err) {
      if (err) return console.log(err);
      return console.log(JSON.stringify(defaultList));
    });
    writeFileSync(`./variables/${name}.json`, ``, function writeJSON(err) {
      if (err) return console.log(err);
    });
  }

  client.resetVar = function(name, type, element) {
    var list = client.var(name);
    if (!list) return;
    switch (type) {
      case `id`:
        id = element;
        if (isNaN(id) || id.length > 18 || id.length < 17) throw new TypeError(`Invalid type! ID expected.`);
        delete list[id];
        break;
      case `member`:
        let member = element;
        if (!(member instanceof GuildMember)) throw new TypeError(`Invalid type! GuildMember expected.`);
        if (!member.guild || !member.user) throw new TypeError(`Unknown Member`);
        let guildID = member.guild.id;
        let userID = member.user.id;
        if (!list[guildID]) return;
        delete list[guildID][userID];
        break;
      case `ids`:
        if (!Array.isArray(element) || isNaN(element) || element.length > 18 || element.length < 17) throw new TypeError(`Invalid type! Array of Guilds expected.`);
        let idsArray = element;
        for (let id in idsArray) delete list[id];
        break;
      case `members`:
        if (!Array.isArray(element) || element.every(el => el instanceof GuildMember)) throw new TypeError(`Invalid type! Array of Members expected.`);
        if (!element.every(el => !!element.guild && !!element.user)) throw new TypeError(`Unknown Member`);
        let membersArray = element;
        for (let member in membersArray) {
          let guildID = member.guild.id;
          let id = member.user.id;
          if (list[serverID]) delete list[serverID][id];
        }
        break;
      case `all`:
        list = {};
        break;
      default:
        throw new TypeError(`Inavlid option given!`);
    }
    writeFile(`./variables/${name}.json`, JSON.stringify(list), function writeJSON(err) {
      if (err) return console.log(err);
      console.log(JSON.stringify(list));
    });
    return list;
  };
};
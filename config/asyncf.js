const { Util } = require('discord.js');

module.exports = function(client, db) {
  client.reboot = async () => {
    var error;
    console.info('Reboot started...');
    var start = Date.now();
    if (client.token) {
      await client.destroy();
      console.info('Client disconnected!');
    }
    console.info('Attemping a reconnect...');
    await client.login(process.env.TOKEN)
      .catch(err => error = err);
    if (error) return console.error(error);
    var took = Date.now() - start;
    console.info(`Bot successfully reconnected! Took ${took}ms`);
    return took;
  }

  client.findMember = async (message, text, author, client) => {
    if (client && client.cooldown && client.cooldown.has(message.author.id)) {
      message.reply('Per favore, rispondi prima all\'ultimo comando o annullalo scrivendo 0').then(msg => msg.delete({ timeout: 10000 }));
      message.delete();
      return null;
    }
    if (!text && author) return message.member;
    if (!text) return;
    if (!isNaN(text) && client && text.length == 18) return await client.users.fetch(text).catch(err => console.error(err));
    var members = [];
    if (!client) members = message.guild.members.cache.array();
    if (client) {
      var guilds = client.guilds.cache.array();
      for (let guild of guilds) {
        let m = guild.members.cache.array();
        for (let o of m) members.push(o);
      }
    }
    text = normalize(text).toLowerCase();
    if (!author) members = members.filter(m => m.user.id != message.author.id);
    member = message.mentions.members.first() || members.find(u => normalize(u.user.tag).toLowerCase() == text) || members.filter(u => normalize(u.user.username).toLowerCase() == text);
    if (!Array.isArray(member) && member != message.member) return member;
    if (!Array.isArray(member) && author) return message.member;
    if (!Array.isArray(member)) return;
    for (let m of members.filter(u => normalize(u.displayName).toLowerCase() == text && !member.includes(u))) member.push(m);
    for (let m of members.filter(u => normalize(u.user.tag).toLowerCase().startsWith(text) && !member.includes(u))) member.push(m);
    for (let m of members.filter(u => normalize(u.user.tag).toLowerCase().includes(text) && !member.includes(u))) member.push(m);
    for (let m of members.filter(u => normalize(u.user.tag).toLowerCase().endsWith(text) && !member.includes(u))) member.push(m);
    for (let m of members.filter(u => normalize(u.user.username).toLowerCase().endsWith(text) && !member.includes(u))) member.push(m);
    for (let m of members.filter(u => normalize(u.displayName).toLowerCase().startsWith(text) && !member.includes(u))) member.push(m);
    for (let m of members.filter(u => normalize(u.displayName).toLowerCase().includes(text) && !member.includes(u))) member.push(m);
    for (let m of members.filter(u => normalize(u.displayName).toLowerCase().endsWith(text) && !member.includes(u))) member.push(m);
    if (!member[0]) { return } else if (member.length == 1) return member[0];
    var msg = [];
    var i = 1;
    var ids = [];
    for (let mb of member) ids.push(mb.user.id);
    let rem = (values) => values.filter((v, i) => ids.indexOf(v.user.id) === i);
    member = rem(member);
    if (member.length > 10) member.splice(10, member.length - 10);
    for (let user of member) {
      msg.push(`${i}. **${Util.escapeMarkdown(user.user.tag)}**`);
      i++
    }
    const id = message.author.id;
    var sent = await message.channel.send(`Ho trovato più utenti che corrispondono a questo nome! Scrivi il numero dell'utente corretto o 0 per cancellare:\n\n${msg.join('\n')}`);
    const filter = (message) => {
      return !isNaN(message.content) && message.content >= 0 && message.content <= member.length && message.author.id == id;
    };
    if (client && client.cooldown) client.cooldown.set(message.author.id, message.author);
    await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
      if (collected.first().content == '0') {
        message.channel.send('Comando cancellato!').then(s => s.delete({ timeout: 10000 }));
        message.delete();
        sent.delete();
        collected.first().delete();
        return;
      }
      member = member[collected.first().content - 1];
      sent.delete();
      collected.first().delete();
    }).catch(err => {
      console.log(err);
      message.reply('Non hai inserito una risposta, comando cancellato!').then(msg => msg.delete({ timeout: 10000 }));
      sent.delete();
      message.delete();
    });
    if (client && client.cooldown) client.cooldown.delete(message.author.id);
    if (!member) return null;
    if (!Array.isArray(member)) return member;
    return null;
  }
};
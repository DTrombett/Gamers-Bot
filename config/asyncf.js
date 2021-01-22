const { escapeMarkdown } = require('discord.js');
var normal = require('normalize-strings');

normalize = text => {
  let regex = new RegExp('_', 'g');
  let regex1 = new RegExp('-', 'g');
  return normal(text).toLowerCase().split(/ +/).join(' ').replace(regex, ' ').replace(regex1, '').split('|').join('');
};
compareFunction = (a, b) => {
  if ([normalize(a.user.tag), normalize(b.user.tag)].sort()[0] == normalize(a.user.tag)) return -1;
  return 1;
};

module.exports = function(client, db) {

  client.findMember = async (message, text, author, client, mentions) => {
    if (client && client.cooldown && client.cooldown.has(message.author.id)) {
      message.reply('Per favore, rispondi prima all\'ultimo comando o annullalo scrivendo 0').then(msg => msg.delete({ timeout: 10000 }));
      message.delete()
        .catch(console.error);
      return null;
    }
    if (!message || !message.guild || !message.guild.available) return;
    if (!text && author) return message.member;
    if (!text) return;
    if (!isNaN(text) && client && text.length >= 17) {
      if (client.users.cache.has(text)) return client.users.cache.get(text);
    } else if (!isNaN(text) && text.length >= 17)
      if (message.guild.members.cache.has(text)) return message.guild.members.cache.get(text);
    var members = [];
    if (!client) members = message.guild.members.cache.array();
    else
      for (let guild of client.guilds.cache.sort((a, b) => {
          if (a.id == message.guild.id) return -1;
          else if (b.id == message.guild.id) return 1;
          else return 0;
        }).array())
        for (let m of guild.members.cache.sort().array()) members.push(m);
    text = normalize(text);
    if (!author) members = members.filter(m => m.user.id != message.author.id);
    member = message.mentions.members.first() || message.mentions.users.first() || members.filter(u => normalize(u.user.tag) == text);
    if (!Array.isArray(member) && author) return message.member;
    if (!Array.isArray(member) && member != message.member) return member;
    if (!Array.isArray(member)) return;
    var n = 0;
    for (let m of members.filter(u => normalize(u.user.username) == text))
      if (n == 2) break;
      else member.push(m) && n++;
    n = 0;
    for (let m of members.filter(u => normalize(u.displayName) == text && !member.includes(u)))
      if (n == 2) break;
      else member.push(m) && n++;
    n = 0;
    for (let m of members.filter(u => normalize(u.user.tag).startsWith(text) && !member.includes(u)))
      if (n == 2) break;
      else member.push(m) && n++;
    n = 0;
    for (let m of members.filter(u => normalize(u.user.tag).includes(text) && !member.includes(u)))
      if (n == 2) break;
      else member.push(m) && n++;
    n = 0;
    for (let m of members.filter(u => normalize(u.user.tag).endsWith(text) && !member.includes(u)))
      if (n == 2) break;
      else member.push(m) && n++;
    n = 0;
    for (let m of members.filter(u => normalize(u.user.username).endsWith(text) && !member.includes(u)))
      if (n == 2) break;
      else member.push(m) && n++;
    n = 0;
    for (let m of members.filter(u => normalize(u.displayName).startsWith(text) && !member.includes(u)))
      if (n == 2) break;
      else member.push(m) && n++;
    n = 0;
    for (let m of members.filter(u => normalize(u.displayName).includes(text) && !member.includes(u)))
      if (n == 2) break;
      else member.push(m) && n++;
    n = 0;
    for (let m of members.filter(u => normalize(u.displayName).endsWith(text) && !member.includes(u)))
      if (n == 2) break;
      else member.push(m) && n++;
    n = 0;
    if (!member[0]) return;
    else if (member.length == 1) return member[0];
    member.sort(compareFunction);
    var msg = [];
    var i = 1;
    var ids = [];
    for (let mb of member) ids.push(mb.user.id);
    let rem = (values) => values.filter((v, i) => ids.indexOf(v.user.id) === i);
    member = rem(member);
    if (member.length == 1) return member[0];
    for (let user of member) msg.push(`${i}. **${escapeMarkdown(user.user.tag)}**`) && i++;
    var id = message.author.id;
    var sent = await message.channel.send(`Ho trovato più utenti che corrispondono a questo nome! Scrivi il numero dell'utente corretto o 0 per cancellare:\n\n${msg.join('\n')}`)
      .catch(console.error);
    if (!sent) return null;
    const filter = (message) => {
      return !isNaN(message.content) && message.content >= 0 && message.content <= member.length && message.author.id == id;
    };
    if (client && client.cooldown) client.cooldown.set(message.author.id, message.author);
    await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
      .then(collected => {
        if (collected.first().content == '0') {
          message.channel.send('Comando cancellato!')
            .then(s => s.delete({ timeout: 10000 })
              .catch(console.error))
            .catch(console.error);
          message.delete()
            .catch(console.error);
          sent.delete()
            .catch(console.error);
          collected.first().delete()
            .catch(console.error);
          return;
        }
        member = member[collected.first().content - 1];
        sent.delete()
          .catch(console.error);
        collected.first().delete()
          .catch(console.error);
      })
      .catch(err => {
        console.log(err);
        message.reply('Non hai inserito una risposta, comando cancellato!')
          .then(msg => msg.delete({ timeout: 10000 })
            .catch(console.error))
          .catch(console.error);
        sent.delete()
          .catch(console.error);
        message.delete()
          .catch(console.error);
      });
    if (client && client.cooldown) client.cooldown.delete(message.author.id);
    if (!member) return null;
    if (!Array.isArray(member)) return member;
    return null;
  }
};
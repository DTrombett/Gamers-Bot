const { escapeMarkdown, Message, Client } = require('discord.js');
const compareFunction = require('./compareFunction');
const normalize = require('./normalize');

/**
 * @param {Message} message 
 * @param {String} text 
 * @param {Boolean} author 
 * @param {Client} client 
 */
module.exports = async (message, text, author, client) => {
  if (client && client.cooldown && client.cooldown.has(message.author.id)) {
    message.reply('Per favore, rispondi prima all\'ultimo comando o annullalo scrivendo 0').then(msg => {
      return msg.delete({ timeout: 10000 });
    });
    message.delete()
      .catch(console.error);
    return null;
  }
  if (!message || !message.guild) return null;
  if (!text && author) return message.member;
  if (!text) return null;
  if (!isNaN(text) && text.length >= 17) {
    if (message.guild.members.cache.has(text)) return message.guild.members.cache.get(text);
    else if (client)
      if (client.users.cache.has(text)) return client.users.cache.get(text);
      else return await client.users.fetch(text)
        .catch(console.error);
  }
  var members = [];
  if (!client) members = message.guild.members.cache.array();
  else
    for (let guild of client.guilds.cache.sort((a, b) => {
      if (a.id == message.guild.id) return -1;
      else if (b.id == message.guild.id) return 1;
      else return 0;
    }).array())
      guild.members.cache.sort().array().every(m => {
        return members.push(m);
      });
  text = normalize(text);
  if (!author) members = members.filter(m => {
    return m.user.id != message.author.id;
  });
  var member = message.mentions.members.first() || message.mentions.users.first() || members.filter(u => {
    return normalize(u.user.tag) == text;
  });
  if (!Array.isArray(member) && (member != message.member || author)) return member;
  if (!Array.isArray(member)) return null;
  var n = 0;
  for (let m of members.filter(u => {
    return normalize(u.user.username) == text;
  }))
    if (n == 2) break;
    else member.push(m) && n++;
  n = 0;
  for (let m of members.filter(u => {
    return normalize(u.displayName) == text && !member.includes(u);
  }))
    if (n == 2) break;
    else member.push(m) && n++;
  n = 0;
  for (let m of members.filter(u => {
    return normalize(u.user.tag).startsWith(text) && !member.includes(u);
  }))
    if (n == 2) break;
    else member.push(m) && n++;
  n = 0;
  for (let m of members.filter(u => {
    return normalize(u.user.tag).includes(text) && !member.includes(u);
  }))
    if (n == 2) break;
    else member.push(m) && n++;
  n = 0;
  for (let m of members.filter(u => {
    return normalize(u.user.tag).endsWith(text) && !member.includes(u);
  }))
    if (n == 2) break;
    else member.push(m) && n++;
  n = 0;
  for (let m of members.filter(u => {
    return normalize(u.user.username).endsWith(text) && !member.includes(u);
  }))
    if (n == 2) break;
    else member.push(m) && n++;
  n = 0;
  for (let m of members.filter(u => {
    return normalize(u.displayName).startsWith(text) && !member.includes(u);
  }))
    if (n == 2) break;
    else member.push(m) && n++;
  n = 0;
  for (let m of members.filter(u => {
    return normalize(u.displayName).includes(text) && !member.includes(u);
  }))
    if (n == 2) break;
    else member.push(m) && n++;
  n = 0;
  for (let m of members.filter(u => {
    return normalize(u.displayName).endsWith(text) && !member.includes(u);
  }))
    if (n == 2) break;
    else member.push(m) && n++;
  n = 0;
  if (!member[0]) return null;
  else if (member.length == 1) return message.guild.members.cache.has(member[0].id) ? message.guild.members.cache.get(member[0].id) : member[0];
  member.sort(compareFunction);
  var msg = [], i = 1, ids = [];
  for (let mb of member) ids.push(mb.user.id);
  function rem(values) {
    return values.filter((v, i) => {
      return ids.indexOf(v.user.id) === i;
    });
  }
  member = rem(member);
  if (member.length == 1) return message.guild.members.cache.has(member[0].id) ? message.guild.members.cache.get(member[0].id) : member[0];
  for (let user of member) msg.push(`${i}. **${escapeMarkdown(user.user.tag)}**`) && i++;
  var id = message.author.id;
  var sent = await message.channel.send(`Ho trovato più utenti che corrispondono a questo nome! Scrivi il numero dell'utente corretto o 0 per cancellare:\n\n${msg.join('\n')}`)
    .catch(console.error);
  if (!sent) return null;
  function filter(message) {
    return !isNaN(message.content) && message.content >= 0 && message.content <= member.length && message.author.id == id;
  }
  if (client && client.cooldown) client.cooldown.set(message.author.id, message.author);
  await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
    .then(collected => {
      if (collected.first().content == '0') {
        message.channel.send('Comando cancellato!')
          .then(async s => {
            try {
              return s.delete({ timeout: 10000 });
            } catch (message) {
              return console.error(message);
            }
          })
          .catch(console.error);
        message.delete()
          .catch(console.error);
        sent.delete()
          .catch(console.error);
        collected.first().delete()
          .catch(console.error);
        return null;
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
        .then(async msg => {
          try {
            return msg.delete({ timeout: 10000 });
          } catch (message) {
            return console.error(message);
          }
        })
        .catch(console.error);
      sent.delete()
        .catch(console.error);
      message.delete()
        .catch(console.error);
    });
  if (client && client.cooldown) client.cooldown.delete(message.author.id);
  if (!member) return null;
  if (!Array.isArray(member)) return message.guild.members.cache.has(member.id) ? message.guild.members.cache.get(member.id) : member;
  return null;
};
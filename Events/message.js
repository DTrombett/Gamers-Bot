const version = 2.5;
const normalize = require('normalize-strings');
const { Util } = require('discord.js');

async function findMember(message, text, author, client) {
  if(client && client.cooldown.has(message.author.id)) {
    message.reply('Per favore, rispondi prima all\'ultimo comando o annullalo scrivendo 0').then(msg => msg.delete({ timeout: 10000})); message.delete(); return null}
  if(!text && author) return message.member; if(!text) return;
  if(!isNaN(text) && client && text.length == 18) return await client.users.fetch(text).catch(err => console.error(err));
  var members = [];
  if(!client) members = message.guild.members.cache.array(); if(client) {
    var guilds = [message.guild];
    var users = [];
    for(let g of client.guilds.cache.array().filter(g => !guilds.includes(g))) guilds.push(g);
    for(let guild of guilds) {
      let m = guild.members.cache.array();
      for(let o of m) {
        if(!users.includes(o.user)) {members.push(o); users.push(o.user)}
      }}}
  text = normalize(text).toLowerCase();
  if(!author) members = members.filter(m => m.user.id != message.author.id);
  member = message.mentions.members.first() || members.find(u => normalize(u.user.tag).toLowerCase() == text) || members.filter(u => normalize(u.user.username).toLowerCase() == text);
  if (!Array.isArray(member) && member != message.member) return member; if(!Array.isArray(member) && author) return message.member; if(!Array.isArray(member)) return;
  for(let m of members.filter(u => normalize(u.displayName).toLowerCase() == text && !member.includes(u))) member.push(m);
  for(let m of members.filter(u => normalize(u.user.tag).toLowerCase().startsWith(text) && !member.includes(u))) member.push(m);
  for(let m of members.filter(u => normalize(u.user.tag).toLowerCase().includes(text) && !member.includes(u))) member.push(m);
  for(let m of members.filter(u => normalize(u.user.tag).toLowerCase().endsWith(text) && !member.includes(u))) member.push(m);
  for(let m of members.filter(u => normalize(u.user.username).toLowerCase().endsWith(text) && !member.includes(u))) member.push(m);
  for(let m of members.filter(u => normalize(u.displayName).toLowerCase().startsWith(text) && !member.includes(u))) member.push(m);
  for(let m of members.filter(u => normalize(u.displayName).toLowerCase().includes(text) && !member.includes(u))) member.push(m);
  for(let m of members.filter(u => normalize(u.displayName).toLowerCase().endsWith(text) && !member.includes(u))) member.push(m);
  if(!member[0]) {return} else if(member.length == 1) return member[0];
  var msg = []; var i = 1;
  if(member.length > 10) member.splice(10, member.length - 10);
  for(let user of member) {msg.push(`${i}. **${Util.escapeMarkdown(user.user.tag)}**`); i++}
  const id = message.author.id;
  var sent = await message.channel.send(`Ho trovato più utenti che corrispondono a questo nome! Scrivi il numero dell'utente corretto o 0 per cancellare:\n\n${msg.join('\n')}`);
  const filter = (message) => {
    return !isNaN(message.content) && message.content >= 0 && message.content <= member.length && message.author.id == id;
  }; if(client) client.cooldown.set(message.author.id, message.author);
  await message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] }).then(collected => {
    if(collected.first().content == '0') {
      message.channel.send('Comando cancellato!').then(s => s.delete({ timeout: 10000}));
      message.delete(); sent.delete(); collected.first().delete(); return;
    }
    member = member[collected.first().content - 1]; sent.delete(); collected.first().delete();
  }).catch(err => {
    console.log(err);
    message.reply('Non hai inserito una risposta, comando cancellato!').then(msg => msg.delete({ timeout: 10000 })); sent.delete(); message.delete();
  }); if(client) client.cooldown.delete(message.author.id); if(!member) return null; if(!Array.isArray(member)) return member; return null}

module.exports = {
    name: 'message',
    description: '',
    async execute(message, client, prefix, db) {
      try {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        var args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if(!client.commands.has(command)) return;
        const guild = client.guilds.cache.get('781085699487039520');
        await client.commands.get(command).execute(message, args, client, prefix, db, findMember, guild);
        console.log(`${message.author.tag} ha usato il comando ${command} in ${message.channel.name}`);
      } catch (err) {
        console.log(err);
      }
    }};
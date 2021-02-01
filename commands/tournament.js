const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

function resolveLink(file, message) {
  try {
    let client = message.client;
    let error =  'Devi inserire un link torneo valido!';
    let parts = file.split(`<li class='content'>`);
    if (parts) parts.shift();
    else return 'Devi inserire un link torneo valido!';
    if (!parts) return 'Devi inserire un link torneo valido!';
    let lastRule = parts.pop();
    if (!lastRule) return 'Devi inserire un link torneo valido!';
    lastRule = lastRule.split(`</li>`)[0];
    var rulesArray = [];
    for (let p of parts) rulesArray.push(p.split(`</li>`)[0].trim());
    if (lastRule) rulesArray.push(lastRule);
    var rules = rulesArray.join('\n');
    let part = file.split(`<title>`)[1];
    if (!part) return 'Devi inserire un link torneo valido!';
    var tournamentName = part.split(`</title>`)[0];
    var description = file.split(`<p class='content'>`)[1];
    if (!description) return 'Devi inserire un link torneo valido!';
    description = description.split(`</p>`)[0].replace('</a>', '');
    if (!description) return 'Devi inserire un link torneo valido!';
    if (description.includes(`<a href=`)) {
      let link = description.split('<a href=')[1];
      if (!link) return 'Devi inserire un link torneo valido!';
      link = link.split(`target="_blank">`)[0];
      link = `<a href=${link}target="_blank">`;
      description = description.replace(link, '');
    }
    var time = file.split(`<span class='time'>`)[1];
    if (!time) return 'Devi inserire un link torneo valido!';
    time = time.split(`</span>`)[0];
    var author = file.split(`<div class='organiser-wrapper'>Organised by <span class='bold'>`)[1];
    if (!author) return 'Devi inserire un link torneo valido!';
    author = author.split(`</span>`)[0];
    let member = message.guild.members.cache.find(m => m.user.username == author);
    author = !!member ? member.user.tag : author;
    var pic = !!member ? member.user.displayAvatarURL({
      format: 'png',
      dynamic: true,
      size: 4096
    }) : client.customAvatar;
    var tournamentEmbed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle(tournamentName)
      .setURL(args[0])
      .setAuthor(author, pic, pic)
      .setDescription(description)
      .setThumbnail(message.guild.iconURL({
        format: 'png',
        dynamic: true,
        size: 4096
      }))
      .setFooter(`Orario torneo: ${time}`);
    for (var i = 0; i < rulesArray.length; i++) tournamentEmbed.addField(`Regola N°${i + 1}`, rulesArray[i].slice(3));
    if (tournamentEmbed) return tournamentEmbed;
    else return 'Devi inserire un link torneo valido!';
  } catch (err) {
    client.error(err, message);
    return 'Devi inserire un link torneo valido!';
  }
}

module.exports = {
  name: 'tournament',
  description: 'Vedi le informazioni riguardo un torneo!',
  help: 'Scopri le informazioni riguardo un torneo inserendo il suo collegamento.',
  usage: ' {link al torneo}',
  aliases: [],
  time: 5000,
  examples: [' https://www.game.tv/tournaments/Jessie-1v1-Brawl-Stars---Dom-31--0bcf9d3e3e7040228e2c3ba953c5a631'],
  execute: async function(message, args, client, prefix) {
    try {
      if (!args[0]) return message.channel.send('Devi inserire il link del torneo!')
        .catch(console.error);
      if (!message.guild.available) return client.error('Guild is unavailable.', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      message.delete()
        .catch(console.error);
      var sent = await message.channel.send('Caricamento...')
        .catch(console.error);
      if (!sent) return;
      var date = Date.now();
      var url = args[0];
      if (!url.startsWith('https://www.game.tv/tournaments/')) return message.channel.send('Devi inserire un link torneo valido!')
        .catch(console.error);
      if (url.startsWith('https://www.game.tv/') && url.slice(22).startsWith('/tournaments/')) url = url.replace(url.charAt(20) + url.charAt(21) + url.charAt(22), '');
      var file = await fetch(url)
        .then(res => res.text())
        .catch(err => client.error(err, message));
      if (!file) return sent.edit('Devi inserire un link torneo valido!')
        .catch(console.error);
      var tournamentEmbed = resolveLink(file, message);
      return typeof tournamentEmbed === 'object' ? sent.edit('', tournamentEmbed) : sent.edit(tournamentEmbed);
    } catch (err) {
      client.error(err, message);
    }
  }
};
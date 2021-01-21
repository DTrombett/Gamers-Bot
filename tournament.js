const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'tournament',
  description: 'Vedi le informazioni riguardo un torneo!',
  async execute(message, args, client, db) {
    try {
      message.delete();
      var sent = await message.channel.send('Caricamento...');
      var date = Date.now();
      var url = args[0];
      if(url.startsWith('https://www.game.tv/') && url.slice(22).startsWith('/tournaments/')) url = url.replace(url.charAt(20) + url.charAt(21) + url.charAt(22), '');
      var file = await fetch(url).then(res => res.text());
      if(!file) return sent.edit('Si è verificato un problema! Controlla il link e riprova.');
      let parts = file.split(`<li class='content'>`);
      parts.shift();
      let lastRule = parts.pop().split(`</li>`)[0];
      var rulesArray = [];
      for(let p of parts) rulesArray.push(p.split(`</li>`)[0].trim());
      if(lastRule) rulesArray.push(lastRule);
      var rules = rulesArray.join('\n');
      let part = file.split(`<title>`)[1];
      var tournamentName = part.split(`</title>`)[0];
      var description = file.split(`<p class='content'>`)[1].split(`</p>`)[0].replace('</a>', '');
      if(description.includes(`<a href=`)) {
        let link = description.split('<a href=')[1].split(`target="_blank">`)[0];
        link = `<a href=${link}target="_blank">`;
        description = description.replace(link, '');
      }
      var time = file.split(`<span class='time'>`)[1].split(`</span>`)[0];
      var author = file.split(`<div class='organiser-wrapper'>Organised by <span class='bold'>`)[1].split(`</span>`)[0];
      let member = message.guild.members.cache.find(m => m.user.username == author);
      author = !!member ? member.user.tag : author;
      var pic = !!member ? member.user.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 4096
      }) : client.customAvatar;
      const tournamentEmbed = new MessageEmbed()
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
      for(var i = 0; i < rulesArray.length; i++) tournamentEmbed.addField(`Regola N°${i + 1}`, rulesArray[i].slice(3));
      console.log(Date.now() - date);
      sent.edit('', tournamentEmbed);
      } catch (err) {
      sent.edit('Si è verificato un problema! Controlla il link e riprova.');
      console.log(err, message)
    }
  }
};
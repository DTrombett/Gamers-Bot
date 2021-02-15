const { MessageEmbed } = require('discord.js');

module.exports = (file, message, args) => {
  try {
    var client = message.client;
    var error = 'Devi inserire un link torneo valido!';
    let parts = file.split(`<li class='content'>`);
    if (parts)
      parts.shift();
    else
      return error;
    if (!parts)
      return error;
    let lastRule = parts.pop();
    if (!lastRule)
      return error;
    lastRule = lastRule.split(`</li>`)[0];
    var rulesArray = [];
    for (let p of parts)
      rulesArray.push(p.split(`</li>`)[0].trim());
    if (lastRule)
      rulesArray.push(lastRule);
    let part = file.split(`<title>`)[1];
    if (!part)
      return error;
    var tournamentName = part.split(`</title>`)[0];
    var description = file.split(`<p class='content'>`)[1];
    if (!description)
      return error;
    description = description.split(`</p>`)[0].replace('</a>', '');
    if (!description)
      return error;
    if (description.includes(`<a href=`)) {
      let link = description.split('<a href=')[1];
      if (!link)
        return error;
      link = link.split(`target="_blank">`)[0];
      link = `<a href=${link}target="_blank">`;
      description = description.replace(link, '');
    }
    var time = file.split(`<span class='time'>`)[1];
    if (!time)
      return error;
    time = time.split(`</span>`)[0];
    var author = file.split(`<div class='organiser-wrapper'>Organised by <span class='bold'>`)[1];
    if (!author)
      return error;
    author = author.split(`</span>`)[0];
    let member = message.guild.members.cache.find(m => {
      return m.user.username == author;
    });
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
    for (var i = 0; i < rulesArray.length; i++)
      tournamentEmbed.addField(`Regola N°${i + 1}`, rulesArray[i].slice(3));
    if (tournamentEmbed)
      return tournamentEmbed;
    else
      return error;
  } catch (err) {
    client.error(err, message);
    return error;
  }
}
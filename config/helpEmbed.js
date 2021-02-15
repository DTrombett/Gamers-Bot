const { MessageEmbed } = require('discord.js');

module.exports = (n, client) => {
  var i = Math.ceil(client.commands.filter(c => {
    return !!c.description;
  }).size / 10);
  if (!n)
    n = i;
  const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle('Help Message')
    .setDescription('Ecco i comandi!')
    .setFooter(`Pagina ${n} di ${i}`)
    .setTimestamp()
    .setThumbnail(client.customAvatar);
  return embed;
};
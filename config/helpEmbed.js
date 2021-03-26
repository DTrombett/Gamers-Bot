const { MessageEmbed, Client } = require('discord.js');

/**
 * Create the help embed.
 * @param {Number} n - The page number
 * @param {Client} client - The client that instantiated this
 */
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
    .setThumbnail(client.user.buildAvatar());
  return embed;
};
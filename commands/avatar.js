const { MessageEmbed } = require('discord.js');
const { Command } = require('../config');
const error = require('../config/error');
const findMember = require('../config/findMember');

const command = new Command('avatar',

  async function (message, args) {
    try {
      var member = await findMember(message, args.join(' '));
      if (member === null)
        return null;
      if (!member)
        return message.channel.send('Non ho trovato nessun utente!')
          .catch(console.error);
      const user = member.user || member;
      const avatar = user.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 4096
      });
      var color = member.displayHexColor || message.guild.roles.highest.color;
      let name = member.displayName || user.username;
      if (!name || !color || !avatar)
        return error('Content failed to load.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      const avatarEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle('Avatar di ' + name)
        .setURL(avatar)
        .setImage(avatar)
        .setFooter(`Requested by ${message.author.tag}`);
      return message.channel.send(avatarEmbed)
        .catch(console.error);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription("Guarda l'avatar di un utente!")
  .setHelp('Usa questo comando per visualizzare l\'avatar di qualsiasi utente tramite l\'ID, username o menzione!')
  .setUsage('(@utente | username | ID )')
  .addAlias('pfp')
  .addExample('', ' @DTrombett#2000', ' Trombett', ' 597505862449496065')
  .setCooldown(2000);

module.exports = command;
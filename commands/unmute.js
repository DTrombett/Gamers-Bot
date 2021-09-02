const { escapeMarkdown } = require('discord.js');
const { Command } = require('../config');
const error = require('../config/error');
const findMember = require('../config/findMember');
const { getMemberVar, resetVar } = require('../config/variables');

const command = new Command('unmute',

  async function (message, args) {
    try {
      if (!message.member.hasPermission("MANAGE_ROLES"))
        return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
          .catch(console.error);
      if (!args[0])
        return message.channel.send('Devi specificare il membro da smutare!')
          .catch(console.error);
      var target = await findMember(message, args.join(' '), false, true);
      if (target === null)
        return null;
      if (!target)
        return message.channel.send("Non ho trovato questo membro!")
          .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.hasPermission('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id)
        return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
          .catch(console.error);
      var muteRole = message.guild.roles.cache.find(rr => {
        return rr.name.toLowerCase() === "muted";
      }) || message.guild.roles.cache.find(rr => {
        return rr.name.toLowerCase() === 'mutato';
      });
      var has = target.roles.cache.has(muteRole.id);
      if (!target.manageable)
        return has ? message.channel.send('Non ho abbastanza permessi per smutare questo membro!')
          .catch(console.error) : (resetVar('muted', 'member', target), message.channel.send(`**${escapeMarkdown(target.user.tag)}** è stato smutato!`));
      if (!muteRole)
        return message.channel.send('Non ho trovato il ruolo "Muted"')
          .catch(console.error);
      if (!has && !getMemberVar('muted', target))
        return message.reply("Questo membro non è mutato!")
          .catch(console.error);
      if (!target.user.tag)
        return error('Failed to get target tag.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      var mute;
      if (has)
        mute = await target.roles.remove(muteRole.id)
          .catch(err => {
            return error(err, message);
          });
      if (!mute && has)
        return message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      resetVar('muted', 'member', target);
      return message.channel.send(`**${escapeMarkdown(target.user.tag)}** è stato smutato!`)
        .catch(console.error);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription("Smuta un membro nel server!")
  .setHelp('Disattiva il mute ad ad un membro levando il ruolo muted.')
  .setUsage('{@utente | username | ID}')
  .addAlias('smute')
  .addExample(' @DTrombett#2000', ' Trombett', ' 597505862449496065');

module.exports = command;
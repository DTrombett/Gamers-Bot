const { escapeMarkdown } = require('discord.js');
const Command = require('../config/Command');
const error = require('../config/error');
const findMember = require('../config/findMember');
const { getMemberVar, setMemberVar } = require('../config/variables');

const command = new Command('warn',

  /**
   * Avverti un utente!
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      if (!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.channel.send('Non hai abbastanza permessi per eseguire questa azione!')
          .catch(console.error);
      if (!args[0])
        return message.channel.send('Devi specificare il membro da avvertire!')
          .catch(console.error);
      var target = await findMember(message, args.join(' '), false, true);
      if (target === null)
        return null;
      if (!target)
        return message.channel.send('Non ho trovato questo membro!')
          .catch(console.error);
      if (target.bot)
        return message.channel.send('Non puoi avvertire un bot!')
          .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.hasPermission('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id)
        return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
          .catch(console.error);
      let warn = getMemberVar('warn', target);
      if (warn === undefined)
        return error('Failed to get warns of the user.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      warn = setMemberVar('warn', warn + 1, target);
      if (!warn)
        return error('Failed to warn the user.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      var a = warn == 1 ? 'avvertimento' : 'avvertimenti';
      return message.channel.send(`Ho avvertito **${escapeMarkdown(target.user.tag)}**! Ora ha **${warn}** ${a}.`)
        .catch(console.error);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('Avverti un utente!')
  .setHelp('Usa questo comando per avvertire un utente. Gli avvertimenti verranno salvati e potrai successivamente ricontrollarli')
  .setUsage('{@utente | username | ID}')
  .addExample(' @DTrombett#2000', ' Trombett', ' 597505862449496065');

module.exports = command;
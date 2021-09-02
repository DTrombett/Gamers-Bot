const { escapeMarkdown } = require('discord.js');
const { Command } = require('../config');
const error = require('../config/error');
const findMember = require('../config/findMember');
const { getMemberVar } = require('../config/variables');

const command = new Command('warncount',

  async function (message, args) {
    try {
      var member = await findMember(message, args.join(' '), true, true);
      if (member === null)
        return null;
      if (!member)
        return message.channel.send('Non ho trovato questo membro!')
          .catch(console.error);
      var warns = getMemberVar('warn', member);
      let avv = warns == 1 ? 'avvertimento' : 'avvertimenti';
      if (!member.user.tag)
        return error('Failed to get member tag.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      return message.channel.send(`**${escapeMarkdown(member.user.tag)}** ha **${warns}** ${avv}.`)
        .catch(console.error);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('Controlla il numero di avvertimenti di un membro')
  .setHelp('Usa questo comando per controllare quanti avvertimenti ha un utente. Puoi anche resettarli tramite l\'apposito comando.')
  .setUsage('(@utente | username | ID)')
  .addAlias('warns')
  .addExample('', ' @DTrombett#2000', ' Trombett', ' 597505862449496065');

module.exports = command;
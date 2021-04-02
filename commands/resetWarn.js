const { escapeMarkdown, Message } = require('discord.js');
const Command = require('../config/Command');
const error = require('../config/error');
const findMember = require('../config/findMember');
const { resetVar } = require('../config/variables');

const command = new Command('resetwarn',

  /**
   * Reimposta gli avvertimenti dei membri!
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send('Non hai abbastanza permessi ler eseguire questa azione!')
          .catch(console.error);
      if (!args[0]) {
        var sent = await message.channel.send('Sei sicuro di voler cancellare gli avvertimenti di tutti i membri del server? **NOTA: Questa azione non può essere annulata!**')
          .catch(console.error);
        if (!sent)
          return null;
        let reacted = await sent.react('✅')
          .then(() => {
            return sent.react('❎');
          })
          .catch(console.error);
        if (!reacted)
          return sent.edit('Non ho abbastanza permessi per aggiungere reazioni al messaggio!')
            .catch(console.error);
        function filter(reaction, user) {
          return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id;
        }
        await sent.awaitReactions(filter, {
          max: 1,
          time: 60000,
          errors: ['time']
        })
          .then(async (collected) => {
            const reaction = collected.first();
            if (reaction.emoji.name === '✅') {
              resetVar('warn', 'id', message.guild.id);
              message.channel.send('Fatto! Ho resettato gli avvertimenti di tutti i membri del server.')
                .catch(console.error);
              return sent.delete()
                .catch(console.error);
            } else {
              let sent2 = await message.channel.send('Ok! Comando cancellato.')
                .catch(console.error);
              if (sent2)
                return sent2.delete({ timeout: 10000 })
                  .catch(console.error);
            }
          })
          .catch(async (err) => {
            console.error(err);
            message.channel.send('Non hai scelto nessuna risposta! Comando cancellato.')
              .catch(console.error);
            message.delete()
              .catch(console.error);
            sent.delete()
              .catch(console.error);
            sent.delete({ timeout: 10000 })
              .catch(console.error);
          });
        return null;
      }
      var target = await findMember(message, args.join(' '), true, true);
      if (target === null)
        return null;
      if (!target)
        return message.channel.send('Non ho trovato questo membro!')
          .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.hasPermission('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id)
        return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
          .catch(console.error);
      if (!target.user.tag)
        return error('Failed to get member tag.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      resetVar('warn', 'member', target);
      return message.channel.send(`Fatto! Ho resettato tutti gli avvertimenti di **${escapeMarkdown(target.user.tag)}**.`)
        .catch(console.error);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('Reimposta gli avvertimenti dei membri')
  .setHelp('Usa questo comando se vuoi resettare gli avvertimenti di un membro del server o di tutti i membri.')
  .setUsage('(@utente | username | ID )')
  .addAlias('reset-warn', 'reset')
  .addExample('', ' @DTrombett#2000', ' Trombett', ' 597505862449496065')
  .setCooldown(5000);

module.exports = command;
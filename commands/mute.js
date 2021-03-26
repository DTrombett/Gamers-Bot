const { escapeMarkdown, Message } = require('discord.js');
const Command = require('../config/Command');
const error = require('../config/error');
const findMember = require('../config/findMember');
const { getMemberVar, setMemberVar } = require('../config/variables');

const command = new Command('mute',

  /**
   * Silenzia un membro nel server!
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      if (!message.member.permissions.has("MANAGE_ROLES"))
        return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
          .catch(console.error);
      var target = await findMember(message, args.join(' '));
      if (target === null)
        return null;
      if (!target)
        return message.channel.send("Non ho trovato questo membro!")
          .catch(console.error);
      if (target.bot)
        return message.channel.send('Non puoi mutare un bot!')
          .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.hasPermission('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id)
        return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
          .catch(console.error);
      if (!target.manageable)
        return (setMemberVar('muted', true, target), message.channel.send('Non ho abbastanza permessi per assegnare il ruolo mutato a questo membro ma cancellerò manualmente i messaggi inviati da lui nel server se possibile!')
          .catch(console.error));
      let muteRole = message.guild.roles.cache.find(rr => {
        return rr.name === "Muted";
      });
      if (target.roles.cache.find(r => {
        return r.name === "Muted";
      }) || getMemberVar("muted", target))
        return message.reply("Questo membro è già mutato!")
          .catch(console.error);
      let m = target.roles.add(muteRole.id)
        .catch(err => {
          return (error(err, message), message.channel.send('Si è verificato un errore e non ho potuto assegnare il ruolo all\'utente ma cancellerò manualmente i messaggi inviati da lui nel server se possibile!')
            .catch(console.error));
        });
      if (!m)
        return setMemberVar('muted', true, target);
      if (!target.user.tag)
        return error('Target tag unavailable.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      setMemberVar('muted', true, target);
      return message.channel.send(`**${escapeMarkdown(target.user.tag)}** è stato mutato!`)
        .catch(console.error);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription("Silenzia un membro nel server!")
  .setHelp('Silenzia un utente nel server assegnandogli il ruolo "muted".')
  .setUsage('{@utente | username | ID}')
  .addExample(' @DTrombett#2000', ' Trombett', ' 597505862449496065')
  .addAlias('silent', 'shh');

module.exports = command;
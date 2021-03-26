const { Message } = require("discord.js");
const Command = require("../config/Command");
const error = require("../config/error");
const findMember = require("../config/findMember");

const command = new Command('ban',

  /**
   * Banna un membro!
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      if (!message.member.permissions.has("BAN_MEMBERS"))
        return message.channel.send("Mi dispiace ma non hai abbastanza permessi per eseguire questa azione.")
          .catch(console.error);
      var target = await findMember(message, args.join(' '));
      if (target === null)
        return null;
      if (!target)
        return message.channel.send('Non ho trovato questo membro.')
          .catch(console.error);
      if (target.bot)
        return message.channel.send('Non puoi bannare un bot!')
          .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.permissions.has('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id)
        return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
          .catch(console.error);
      if (!target.bannable)
        return message.channel.send('Non ho abbastanza permessi per bannare questo membro!')
          .catch(console.error);
      let banned = await target.ban({ days: 7, reason: `Banned by ${message.author.tag}` })
        .catch(err => {
          return error(err, message);
        });
      if (!banned)
        return message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      if (!target.user.tag)
        return error('Target tag undefined.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      return message.channel.send(`**${target.user.tag}** è stato bannato correttamente!`)
        .catch(console.error);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('Banna un membro!')
  .setHelp('Banna un utente permanente dal server tramite ID, username o menzione. Potrà rientrare solo dopo che un moderatore disattivi il ban dalle impostazioni server o tramite il comando `unban`.')
  .setUsage('{@utente | username | ID}')
  .addExample(' @DTrombett#2000', ' Trombett', ' 597505862449496065')
  .addAlias('bann');

module.exports = command;
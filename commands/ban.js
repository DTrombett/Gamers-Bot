const { Command } = require('../config');
const error = require("../config/error");
const { findMember } = require("../config/findMember");

const command = new Command('ban',

  async function (message, args) {
    try {
      if (!message.member.permissions.has("BAN_MEMBERS"))
        return message.channel.send("Mi dispiace ma non hai abbastanza permessi per eseguire questa azione.")
          .catch(console.error);
      args = args.join(' ').split(/ *\/ */);
      let str = args[0], reason = `Moderatore: ${message.author.tag + args[1] ? ` Motivo: ${args[1]}` : ''}`, days = args[2] || 0;
      var target = await findMember(message, str, {
        author: false,
        allUsers: false,
        filters: [{ message: 'Non puoi bannare un amministratore!', use: m => !m.hasPermission('ADMINISTRATOR') || message.author.id === message.guild.ownerID }, { message: 'Non puoi bannare un membro con un ruolo più alto del tuo!', use: m => message.member.roles.highest.position > m.roles.highest.position || message.guild.ownerID === message.author.id }, { message: 'Non ho abbastanza permessi per bannare questo membro!', use: m => m.bannable }]
      });
      if (!target) return null;
      let banned = await target.ban({ days: days, reason: reason })
        .catch(err => error(err, message));
      if (!banned)
        return message.channel.send('Si è verificato un errore!')
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
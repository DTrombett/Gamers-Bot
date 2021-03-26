const { Message } = require("discord.js");
const Command = require("../config/Command");
const error = require("../config/error");
const { getIDVar, setIDVar } = require("../config/variables");

const command = new Command('removeprefix',

  /**
   * Rimuovi un prefisso dal server!
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      if (!message.member.permissions.has('MANAGE_SERVER'))
        try {
          return message.channel.send('Mi displiace ma non hai abbastanza permessi per utilizzare questo comando!');
        } catch (message_1) {
          return console.error(message_1);
        }
      if (!args[0])
        try {
          return message.channel.send('Devi inserire il prefisso da rimuovere!');
        } catch (message_1) {
          return console.error(message_1);
        }
      var all = getIDVar('prefix', message.guild.id);
      var prefixes = all.filter(p => {
        return !p.includes(message.client.user.id);
      });
      if (!prefixes.includes(args[0]))
        try {
          return message.channel.send('Questo prefisso non esiste!');
        } catch (message_1) {
          return console.error(message_1);
        }
      prefixes = setIDVar('prefix', all.remove(args[0]), message.guild.id);
      if (!prefixes)
        return (error('Failed to remove prefix', message), message.channel.send('Si è verificato un errore!')
          .catch(console.error));
      try {
        return message.channel.send(`Fatto! Ho rimosso il prefisso \`${args[0]}\``);
      } catch (message_1) {
        return console.error(message_1);
      }
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('Rimuovi un prefisso dal server!')
  .setHelp('Usa questo comando 0er rimuovere un prefisso del bot nel server!')
  .setUsage('{prefix}')
  .addAlias('remove')
  .addExample(' -', ' !')
  .setCooldown(2000);

module.exports = command;
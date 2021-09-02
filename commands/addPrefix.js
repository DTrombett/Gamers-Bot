const { Command } = require('../config');
const error = require("../config/error");
const { getIDVar, setIDVar } = require("../config/variables");

const command = new Command('addprefix',

  async function (message, args) {
    try {
      if (!message.member.permissions.has('MANAGE_SERVER'))
        try {
          return message.channel.send('Mi dispiace ma non hai abbastanza permessi per utilizzare questo comando!');
        } catch (message_1) {
          return console.error(message_1);
        }
      if (!args[0])
        try {
          return message.channel.send('Devi inserire il prefisso da aggiungere!');
        } catch (message_1) {
          return console.error(message_1);
        }
      if (args[0].length > 10)
        try {
          return message.channel.send('Attento, il prefisso non può essere più lungo di 10 caratteri!');
        } catch (message_1) {
          return console.error(message_1);
        }
      if (['`', '\u200b', '\n', '@'].some(p => args[0].includes(p)))
        try {
          return message.channel.send('Attento! Non puoi usare questo carattere come prefisso.');
        } catch (message_1) {
          return console.error(message_1);
        }
      var prefixes = getIDVar('prefix', message.guild.id);
      if (prefixes.includes(args[0]))
        try {
          return message.channel.send('Questo prefisso è già stato aggiunto!');
        } catch (message_1) {
          return console.error(message_1);
        }
      if (prefixes.length >= 12)
        try {
          return message.channel.send('Mi dispiace ma puoi aggiungere fino a 10 prefissi! Rimuovine uno con il comando `removeprefix` e riprova.');
        } catch (message_1) {
          return console.error(message_1);
        }
      prefixes.push(args[0]);
      prefixes = setIDVar('prefix', prefixes, message.guild.id);
      if (!prefixes)
        return (error('Failed to add prefix', message), message.channel.send('Si è verificato un errore!')
          .catch(console.error));
      try {
        return message.channel.send(`Fatto! Ho aggiunto il prefisso \`${args[0]}\` xD`);
      } catch (message_1) {
        return console.error(message_1);
      }
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('Imposta il prefisso del bot nel tuo server!')
  .setHelp('Usa questo comando per aggiungere un prefisso per il bot all\'interno del server.')
  .setUsage('{prefix}')
  .addAlias('setprefix')
  .addExample(' !', ' +')
  .setCooldown(2000);

module.exports = command;
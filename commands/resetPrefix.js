const { Command } = require('../config');
const error = require("../config/error");
const { resetVar } = require("../config/variables");

const command = new Command('resetprefix',

  async function (message) {
    try {
      if (!message.member.permissions.has('MANAGE_SERVER'))
        try {
          return message.channel.send('Mi displiace ma non hai abbastanza permessi per utilizzare questo comando!');
        } catch (message_1) {
          return console.error(message_1);
        }
      resetVar('prefix', 'id', message.guild.id);
      try {
        return message.channel.send(`Fatto! Ho resettato tutti i prefissi nel server!`);
      } catch (message_1) {
        return console.error(message_1);
      }
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('Reimposta il prefisso nel server!')
  .setHelp('Cancella tutti i prefissi impostati nel server! Potrai continuare ad usare il prefisso predefinito `-` o menzionare il bot.')
  .addAlias('reset')
  .setCooldown(2000);

module.exports = command;
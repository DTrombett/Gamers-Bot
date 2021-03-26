const { resolveColor, Message } = require('discord.js');
const Command = require('../config/Command');
const error = require('../config/error');

const command = new Command('hex',

  /**
   * Scopri l'hex code di un colore!
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      if (!args[0])
        try {
          return message.channel.send('Devi scrivere il colore che vuoi cercare!');
        } catch (message_1) {
          return console.error(message_1);
        }
      var color;
      if (args.length == 3 && args.every(a => {
        return !isNaN(a);
      })) {
        for (let arg of args)
          if (arg < 0 || arg > 255 || arg.includes('.'))
            try {
              return message.channel.send('Questo colore non esiste! Fai attenzione alla scrittura.');
            } catch (message_1) {
              return console.error(message_1);
            }
        try {
          color = resolveColor([Math.round(args[0]), Math.round(args[1]), Math.round(args[2])]);
        } catch (err) { }
      }
      if (color === undefined) {
        try {
          color = resolveColor(args.join('_').toUpperCase());
        } catch (err) { }
      }
      if (isNaN(color))
        try {
          return message.channel.send('Questo colore non esiste! Fai attenzione alla scrittura.');
        } catch (message_1) {
          return console.error(message_1);
        }
      color = color.toString(16);
      if (color.length < 6)
        while (color.length < 6)
          color = '0' + color;
      var hex = `#${color}`.toUpperCase();
      try {
        return message.channel.send(`Hex code corrispondente: **${hex}**`);
      } catch (message_1) {
        return console.error(message_1);
      }
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription(`Scopri l'hex code di un colore!`)
  .setHelp('Trova il codice hex di un colore tramite il suo nome o codice RGB.')
  .setUsage('{nome colore}')
  .addExample(' light green', ' red')
  .addAlias('hexcode', 'code', 'color');

module.exports = command;
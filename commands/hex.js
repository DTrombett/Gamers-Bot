const { resolveColor } = require('discord.js');

var commandObject = {
  name: 'hex',
  description: `Scopri l'hex code di un colore!`,
  help: 'Trova il codice hex di un colore tramite il suo nome o codice RGB.',
  usage: ' {nome colore}',
  examples: [' light green', ' red'],
  aliases: ['hexcode', 'code', 'color'],
  execute: (message, args, client, prefix) => {
    try {
      if (!args[0])
        return message.channel.send('Devi scrivere il colore che vuoi cercare!')
          .catch(console.error);
      var color;
      if (args.length == 3 && args.every(a => {
        return !isNaN(a);
      })) {
        for (let arg of args)
          if (arg < 0 || arg > 255 || arg.includes('.'))
            return message.channel.send('Questo colore non esiste! Fai attenzione alla scrittura.')
              .catch(console.error);
        try {
          color = resolveColor([Math.round(args[0]), Math.round(args[1]), Math.round(args[2])]);
        } catch (err) {
          client.error(err, message);
        }
      }
      if (color === undefined) {
        try {
          color = resolveColor(args.join('_').toUpperCase());
        } catch (err) {
          client.error(err, message);
        }
      }
      if (isNaN(color))
        return message.channel.send('Questo colore non esiste! Fai attenzione alla scrittura.')
          .catch(console.error);
      color = color.toString(16);
      if (color.length < 6)
        while (color.length < 6)
          color = '0' + color;
      var hex = `#${color}`.toUpperCase();
      if (!hex)
        return client.error('Failed to get hex code.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      return message.channel.send(`Hex code corrispondente: **${hex}**`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;
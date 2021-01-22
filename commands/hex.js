const { resolveColor } = require('discord.js');

module.exports = {
  name: 'hex',
  description: '',
  execute(message, args, client, db) {
    try {
      if (!args[0]) return message.channel.send('Devi scrivere il colore che vuoi cercare!')
        .catch(console.error);
      var color;
      if (args.length == 3 && args.every(a => !isNaN(a))) {
        for (let a of args)
          if (a < 0 || a > 255 || a.includes('.')) return message.channel.send('Questo colore non esiste! Fai attenzione alla scrittura.')
            .catch(console.error);
        try {
          color = resolveColor([Math.round(args[0]), Math.round(args[1]), Math.round(args[2])]);
        } catch (err) {
          console.error(err);
        }
      }
      if (color === undefined) {
        try {
          color = resolveColor(args.join('_').toUpperCase());
        } catch (err) {
          console.error(err);
        }
      }
      if (isNaN(color)) return message.channel.send('Questo colore non esiste! Fai attenzione alla scrittura.')
        .catch(console.error);
      color = color.toString(16);
      if (color.length < 6)
        while (color.length < 6) color = '0' + color;
      var hex = `#${color}`.toUpperCase();
      message.channel.send(`Hex code corrispondente: **${hex}**`)
        .catch(console.error);
    } catch (err) {
      console.log(err, message);
    }
  }
};
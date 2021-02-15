const fetch = require('node-fetch');
const { resolveLink } = require('../config/resolveLink');

var commandObject = {
  name: 'tournament',
  description: 'Vedi le informazioni riguardo un torneo!',
  help: 'Scopri le informazioni riguardo un torneo inserendo il suo collegamento.',
  usage: ' {link al torneo}',
  time: 5000,
  examples: [' https://www.game.tv/tournaments/Jessie-1v1-Brawl-Stars---Dom-31--0bcf9d3e3e7040228e2c3ba953c5a631'],
  execute: async (message, args, client, prefix) => {
    try {
      if (!args[0])
        return message.channel.send('Devi inserire il link del torneo!')
          .catch(console.error);
      if (!message.guild.available)
        return client.error('Guild is unavailable.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      message.delete()
        .catch(console.error);
      var sent = await message.channel.send('Caricamento...')
        .catch(console.error);
      if (!sent)
        return;
      var url = args[0];
      if (!url.startsWith('https://www.game.tv/tournaments/'))
        return message.channel.send('Devi inserire un link torneo valido!')
          .catch(console.error);
      if (url.startsWith('https://www.game.tv/') && url.slice(22).startsWith('/tournaments/'))
        url = url.replace(url.charAt(20) + url.charAt(21) + url.charAt(22), '');
      var file = await fetch(url)
        .then(res => {
          return res.text();
        })
        .catch(err => {
          return client.error(err, message);
        });
      if (!file)
        return sent.edit('Devi inserire un link torneo valido!')
          .catch(console.error);
      var tournamentEmbed = resolveLink(file, message);
      return typeof tournamentEmbed === 'object' ? sent.edit('', tournamentEmbed) : sent.edit(tournamentEmbed);
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;
const ytsearch = require('yt-search');
const ytdl = require('ytdl-core');
const Video = require('../config/Video.js');
const { Util } = require('discord.js');
const { escapeMarkdown, removeMentions } = Util;

var commandObject = {
  name: 'play',
  description: '',
  help: '',
  usage: ' ',
  aliases: ['p', 'start'],
  examples: [],
  time: 10000,
  execute: async (message, args, client, prefix) => {
    try {
      var voice = message.member.voice.channel;
      if (!voice)
        return message.channel.send('Devi prina entrare in un canale vocale!')
          .catch(console.error);
      if (!args[0])
        return message.reply('Devi scrivere cosa vuoi ascoltare!')
          .catch(console.error);
      if (message.guild.playing)
        return message.reply('Ehy! Una canzone è già in riproduzione. Mi dispiace ma ancora non supporto la creazione di una queue ma lo farò presto!')
          .catch(console.error);
      var perms = voice.permissionsFor(message.guild.me);
      if (!perms || !perms.has('SPEAK') || !perms.has('CONNECT'))
        return message.reply('Mi dispiace ma non ho abbastanza permessi per riprodurre musica nel tuo canale!')
          .catch(console.error);
      var msg = await message.channel.send('Sto cercando la tua canzone...')
        .catch(console.error);
      if (!msg)
        return;
      var video = await ytsearch(args.join(' '))
        .then(vs => {
          return vs.videos[0];
        });
      if (!video)
        return msg.edit('Non ho trovato nessun risultato!')
          .catch(console.error);
      msg.edit('Ok! Ho trovato il brano. Iniziando la riproduzione...');
      video = new Video(video);
      message.guild.video = video;
      var playing, connection;
      connection = await message.member.voice.channel.join()
        .catch(console.error);
      if (!connection)
        return (msg.edit('Mi dispiace ma non ho abbastanza permessi per riprodurre musica nel tuo canale!'), message.guild.playing = false);
      playing = connection.play(ytdl(video.url, { quality: 'highestaudio', filter: 'audioonly' }), { bitrate: 'auto', highWaterMark: 1 });
      connection.on('debug', console.info);
      connection.on('warn', console.warn);
      connection.on('reconnecting', () => {
        return console.log(`Connection in ${voice.name} is reconnecting...`);
      });
      connection.on('resume', () => {
        return playing.resume();
      });
      playing.on('start', () => {
        return msg.edit(`Ok! Ho iniziato la riproduzione di **${removeMentions(escapeMarkdown(video.title + ' in ' + voice.toString()))}**`);
      });
      playing.on('finish', () => {
        return (voice.leave(), message.channel.send('La riproduzione è terminata e sono uscito dalla vocale.'), message.guild.playing = false);
      });
      playing.on('debug', console.info);
      playing.on('error', () => {
        return (voice.leave(), message.channel.send('Si è verificato un errore e non è stato possibile riprodurre la canzone!'), message.guild.playing = false);
      });
      message.guild.me.voice.setSelfDeaf(true);
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;
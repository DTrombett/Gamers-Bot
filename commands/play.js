module.exports = {
     name: 'play',
     description: "description",
     async execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles) {
       try {
        if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      } else {
      message.reply('You need to join a voice channel first!');
      }
     const ytdl = require('ytdl-core');
     connection.play(ytdl('https://www.youtube.com/watch?v=ZlAU_w7-Xp8', { filter: 'audioonly' }));
     message.channel.send('Started!');
       } catch (err) {
         console.log(err);
       }
     }}

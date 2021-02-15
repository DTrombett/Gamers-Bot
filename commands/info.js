const { MessageEmbed } = require('discord.js');
const format, { i18n } = require('dateformat');
const time = require('pretty-ms');
const { getEmoji } = require('../config/getEmoji');

i18n = {
  dayNames: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
  monthNames: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic", "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
  timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
};

var commandObject = {
  name: 'info',
  description: 'Scopri le informazioni di un utente!',
  help: 'Guarda le informazioni su un utente nel server. Puoi anche usare l\'ID per utenti che non sono nel server!',
  usage: ' (@utente | username | ID)',
  examples: ['', ' @DTrombett#2000', ' Trombett', ' 597505862449496065'],
  aliases: ['ui', 'user', 'userinfo', 'member'],
  time: 2000,
  execute: async (message, args, client, prefix) => {
    try {
      if (!message.guild.available)
        return client.error('Guild unavailable.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      if (!message.author.tag)
        return client.error('Author tag undefined.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      var member = await client.findMember(message, args.join(' '), true, client);
      if (member === null)
        return;
      if (!member)
        return message.channel.send('Non ho trovato questo utente!')
          .catch(console.error);
      var user = member.user || member;
      var bot = !!user.bot ? 'Sì' : 'No';
      var createdAt = format(user.createdAt, 'dddd dd mmmm yyyy HH:MM:ss');
      var passed = time(Date.now() - user.createdAt, { verbose: true, secondsDecimalDigits: 0 }).replace('year ', 'anno ').replace('years', 'anni').replace('days', 'giorni').replace('day ', 'giorno').replace('hours', 'ore').replace('hour ', 'ora ').replace('minute ', 'minuto ').replace('minutes', 'minuti').replace('second ', 'secondo ').replace('seconds', 'secondi');
      var emojiFlags = [];
      var flags = !!user.flags && !user.flags.toArray() ? user.flags.toArray() : await user.fetchFlags().then(f => {
        return f.toArray();
      });
      if (flags)
        for (let flag of flags.filter(b => {
          return b != 'TEAM_USER' && b != 'SYSTEM' && b != 'VERIFIED_DEVELOPER' && b != 'DISCORD_PARTNER';
        }))
          emojiFlags.push(getEmoji(flag, client));
      emojiFlags = !emojiFlags[0] ? 'None' : emojiFlags.join(' ');
      var id = user.id;
      var status = user.presence.status;
      var tag = user.tag;
      var avatar = user.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 4096
      });
      let color = member.displayHexColor || message.guild.roles.highest.color;
      if (!color || !tag || !avatar || !id || !emojiFlags || !createdAt || !passed || !status || !bot)
        return client.error('Failed to fetch user info.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      const embedInfo = new MessageEmbed()
        .setColor(color)
        .setTitle('User info')
        .setURL(avatar)
        .setAuthor(tag, avatar, avatar)
        .setDescription(id)
        .setThumbnail(message.guild.iconURL({
          format: 'png',
          dynamic: true,
          size: 4096
        }))
        .addFields({ name: 'Badges', value: emojiFlags }, { name: 'Data creazione', value: createdAt + ` (\`${passed} fa\`)` }, { name: 'Stato', value: status }, { name: 'Bot', value: bot })
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
          size: 4096
        }));
      if (!embedInfo)
        return client.error('Failed to create embed.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      return message.channel.send(embedInfo)
        .catch(err => {
          return console.error(err);
        });
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;
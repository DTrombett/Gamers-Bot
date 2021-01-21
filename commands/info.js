const Discord = require('discord.js');
const format = require('dateformat');
const time = require('pretty-ms');

format.i18n = {
 dayNames: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
 monthNames: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic", "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
 timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
};

function getEmoji(flag, guild) {
  return guild.emojis.cache.find(e => e.name == flag).toString();
}

module.exports = {
  name: 'info',
  description: 'Scopri le informazioni di un utente!',
  async execute(message, args, client, db, findMember, guild) {
    try {
      var member = await findMember(message, args.join(' '), true, client)
      .catch(err => console.error(err));
      if(member === null) return;
      if(!member) return message.channel.send('Non ho trovato questo utente!');
      var user;
      if(member.user) {
        user = member.user;
      } else user = member;
      
      var bot = user.bot;
      if(user.bot) {
        bot = 'Sì';
      } else bot = 'No';
      var createdAt = format(user.createdAt, 'DDDD dd mmmm yyyy HH:MM:ss');
      var day = format(user.createdAt, 'DDDD');
      var date = format(user.createdAt, 'dd mmmm yyyy');
      switch(day) {
        case 'Yesterday':
          createdAt = createdAt.replace('Yesterday', 'Ieri').replace(`${date} `, '');
          break;
          case 'Today':
            createdAt = createdAt.replace('Today', 'Oggi').replace(`${date} `, '');
            break;
      }
      var passed = time(Date.now() - user.createdAt, {verbose: true, secondsDecimalDigits: 0}).replace('year ', 'anno ').replace('years', 'anni').replace('days', 'giorni').replace('day ', 'giorno').replace('hours', 'ore').replace('hour ', 'ora ').replace('minute ', 'minuto ').replace('minutes', 'minuti').replace('second ', 'secondo ').replace('seconds', 'secondi');
      var emojiFlags = [];
      var flags = await user.fetchFlags();
      if(flags) {
        for(let flag of flags.toArray().filter(b => b != 'TEAM_USER' && b != 'SYSTEM' && b != 'VERIFIED_DEVELOPER' && b != 'DISCORD_PARTNER')) {
          emojiFlags.push(getEmoji(flag, message.guild));
        }}
      if(!emojiFlags[0]) {
        emojiFlags = 'None';
      } else emojiFlags = emojiFlags.join(' ');
      var id = user.id;
      var status = user.presence.status;
      var tag = user.tag;
      var avatar = user.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 4096
      });
      
      let color = member.displayHexColor;
      if (!color) color = message.guild.roles.highest.color;
      
      const embedInfo = new Discord.MessageEmbed()
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
      .addFields(
        { name: 'Badges', value: emojiFlags},
        { name: 'Data creazione', value: createdAt + ` (\`${passed} fa\`)`},
        { name: 'Stato', value: status},
        { name: 'Bot', value: bot}
        )
        .setTimestamp()
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
          format: 'png',
          dynamic: true,
          size: 4096
        }));
        message.channel.send(embedInfo)
        .catch(err => console.error(err));
        } catch (err) {
        console.log(err, message);
      }
  }};
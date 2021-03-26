const { MessageEmbed, Message } = require('discord.js');
const format = require('dateformat');
const time = require('pretty-ms');
const getEmoji = require('../config/getEmoji');
const Command = require('../config/Command');
const findMember = require('../config/findMember');
const error = require('../config/error');

const command = new Command('info',

  /**
   * Scopri le informazioni di un utente!
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      var member = await findMember(message, args.join(' '), true, message.client);
      if (member === null)
        return null;
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
          emojiFlags.push(getEmoji(flag, message.client));
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
        return error('Failed to fetch user info.', message) && message.channel.send('Si è verificato un errore!')
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
        return error('Failed to create embed.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      return message.channel.send(embedInfo)
        .catch(err => {
          return console.error(err);
        });
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription('Scopri le informazioni di un utente!')
  .setHelp('Guarda le informazioni su un utente nel server. Puoi anche usare l\'ID per utenti che non sono nel server!')
  .setUsage('(@utente | username | ID)')
  .addExample('', ' @DTrombett#2000', ' Trombett', ' 597505862449496065')
  .addAlias('ui', 'user', 'userinfo', 'member')
  .setCooldown(2000);

module.exports = command;
const ms = require('ms');
const { escapeMarkdown, Message } = require('discord.js');
const Command = require('../config/Command');
const { getMemberVar, setMemberVar, resetVar } = require('../config/variables');
const findMember = require('../config/findMember');
const error = require('../config/error');

const command = new Command('tempmute',

  /**
   * Silenzia un membro nel server per un periodo di tempo!
   * @param {Message} message - The message with the command
   * @param {Array<String>} args - The args of this message
   */
  async function (message, args) {
    try {
      if (!args[1])
        return message.channel.send('Devi specificare il membro da mutare!')
          .catch(console.error);
      var time = args.pop();
      if (!isNaN(time))
        time = time + 's';
      if (!message.member.hasPermission("MANAGE_ROLES"))
        return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
          .catch(console.error);
      if (!ms(time))
        return message.channel.send("Devi scrivere la durata del mute!");
      var target = await findMember(message, args.join(' '), false, true);
      if (target === null)
        return null;
      if (!target)
        return message.channel.send("Non ho trovato questo membro!")
          .catch(console.error);
      if (target.bot)
        return message.channel.send('Non puoi mutare un bot!')
          .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.hasPermission('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id)
        return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
          .catch(console.error);
      if (!target.manageable)
        return (setMemberVar('muted', true, target), setTimeout(() => {
          resetVar('muted', 'member', target);
        }, ms(time)), message.channel.send('Non ho abbastanza permessi per assegnare il ruolo mutato a questo membro ma cancellerò manualmente i messaggi inviati da lui nel server se possibile!')
          .catch(console.error));
      let muteRole = message.guild.roles.cache.find(rr => {
        return rr.name.toLowerCase() === "muted";
      }) || message.guild.roles.cache.find(rr => {
        return rr.name.toLowerCase() === 'mutato';
      });
      if (!muteRole)
        return message.channel.send('Devi prima creare un ruolo da assegnare agli utenti mutati!')
          .catch(console.error);
      if (target.roles.cache.find(r => {
        return r.name == "Muted";
      }) || getMemberVar('muted', target))
        return message.reply("Questo membro è già mutato!")
          .catch(console.error);
      let formal = ms(ms(time));
      if (!target.user.tag)
        return error('Failed to get target tag.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      if (!formal)
        return error('Failed to convert time.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      let m = target.roles.add(muteRole.id)
        .catch(err => {
          return (error(err, message), message.channel.send('Si è verificato un errore e non ho potuto assegnare il ruolo all\'utente ma cancellerò manualmente i messaggi inviati da lui nel server se possibile!')
            .catch(console.error));
        });
      if (!m)
        return (message.client.setTimeout(() => {
          resetVar('muted', 'member', target);
        }, ms(time)), setMemberVar('muted', true, target));
      setMemberVar('muted', true, target);
      message.channel.send(`**${escapeMarkdown(target.user.tag)}** è stato mutato per ${formal}`)
        .catch(console.error);
      return message.client.setTimeout(() => {
        resetVar('muted', 'member', target);
        target.roles.remove(muteRole.id)
          .catch(console.error);
      }, ms(time));
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription("Silenzia un membro nel server per un periodo di tempo!")
  .setHelp('Silenzia un membro assegnandogli il ruolo muted in modo che non possa più scrivere per un certo periodo di tempo.')
  .setUsage('{@utente | username | ID} {tempo}')
  .addAlias('temp')
  .addExample('@DTrombett#2000 5m', ' Trombett 2h', ' 597505862449496065 40m');

module.exports = command;
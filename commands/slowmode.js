const ms = require('ms');

module.exports = {
  name: 'slowmode',
  description: 'Modifica la slowmode del canale!',
  help: 'Usa questo comando per attivare, disattivare o modificare la slowmode nel canale.',
  usage: ' (tempo)',
  aliases: ['set-slowmode', 'slow'],
  examples: [' ', '5m'],
  execute: async function(message, args, client, prefix) {
    try {
      let perms = message.channel.permissionsFor(message.member);
      if (!perms || !perms.has('MANAGE_CHANNELS')) return message.channel.send('Non hai abbastanza permessi per eseguire questa azione!')
        .catch(console.error);
      if (!message.channel.manageable) return message.channel.send('Non ho abbastanza permessi per eseguire questa azione!')
        .catch(console.error);
      var seconds, msg, reason;
      if (!!args[0]) {
        let mill = Math.round((isNaN(args[0]) ? ms(args[0]) : args[0] * 1000) / 1000) * 1000;
        seconds = mill / 1000;
        if (seconds > 21600 || seconds < 0 || isNaN(seconds)) return message.channel.send('Devi inserire un tempo valido tra 1 secondo e 6 ore!')
          .catch(console.error);
        let form = ms(mill);
        if (!form) return client.error('Failed to convert milliseconds.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
        msg = mill !== 0 ? `Ok! Ho impostato la slowmode a ${form}.` : `Ok! Ho disattivato la slowmode nel canale.`;
        args.shift();
        reason = args.join(' ');
      } else {
        if (!!message.channel.rateLimitPerUser)
          msg = 'Ok! Ho disattivato la slowmode nel canale.';
        else {
          seconds = 120;
          msg = 'Ok! Ho impostato la slowmode a 2m.';
        }
      }
      let ch = await message.channel.setRateLimitPerUser(seconds || 0, reason || `Changed by ${message.author.tag}`)
        .catch(err => client.error(err, message));
      if (!ch) return message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      return message.channel.send(msg || 'Ok! Ho modificato la slowmode del canale.')
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};
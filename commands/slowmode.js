const ms = require('ms');

module.exports = {
  name: 'slowmode',
  description: 'Cambia la slowmode del canale!',
  async execute(message, args, client, db) {
    try {
      if (!message.channel.manageable) return message.channel.send('Non ho abbastanza permessi per eseguire questa azione!');
      let perms = message.channel.permissionsFor(message.member);
      if (!perms || !perms.has('MANAGE_CHANNELS')) return message.channel.send('Non hai abbastanza permessi per eseguire questa azione!')
        .catch(console.error);
      var seconds;
      var msg;
      var reason;
      if (!!args[0]) {
        let mill = Math.round((isNaN(args[0]) ? ms(args[0]) : args[0] * 1000) / 1000) * 1000;
        seconds = mill / 1000;
        if (seconds > 21600 || seconds < 0 || isNaN(seconds)) return message.channel.send('Devi inserire un tempo valido tra 1 secondo e 6 ore!')
          .catch(console.error);
        msg = mill !== 0 ? `Ok! Ho impostato la slowmode a ${ms(mill)}.` : `Ok! Ho disattivato la slowmode nel canale.`;
        args.shift();
        reason = args.join(' ');
      } else {
        if (!!message.channel.rateLimitPerUser) {
          msg = 'Ok! Ho disattivato la slowmode nel canale.';
        } else {
          seconds = 120;
          msg = 'Ok! Ho impostato la slowmode a 2m.';
        }
      }
      let ch = await message.channel.setRateLimitPerUser(seconds || 0, reason || `Changed by ${message.author.tag}`)
        .catch(console.error);
      if (!ch) return message.chanel.send('Si è verificato un errore!')
        .catch(console.error);
      return message.channel.send(msg || 'Si è verificato un errore!')
        .catch(console.error);
    } catch (err) {
      console.log(err, message);
    }
  }
};
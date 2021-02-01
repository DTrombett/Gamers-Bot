module.exports = {
  name: 'addprefix',
  description: 'Imposta il prefisso del bot nel tuo server!',
  help: 'Usa questo comando per aggiungere un prefisso per il bot all\'interno del server.',
  usage: ' {prefix}',
  aliases: ['setprefix'],
  examples: [' !', ' +'],
  time: 2000,
  execute: function(message, args, client, prefix) {
    try {
      if (!message.member.permissions.has('MANAGE_SERVER')) return message.channel.send('Mi displiace ma non hai abbastanza permessi per utilizzare questo comando!')
        .catch(console.error);
      if (!args[0]) return message.channel.send('Devi inserire il prefisso da aggiungere!')
        .catch(console.error);
      if (args[0].length > 10) return message.channel.send('Attento, il prefisso non può essere più lungo di 10 caratteri!')
        .catch(console.error);
      if (['`', '\u200b', '\n'].some(args[0].includes)) return message.channel.send('Attento! Non puoi usare questo carattere come prefisso.')
        .catch(console.error);
      var prefixes = client.getIDVar('prefix', message.guild.id);
      if (prefixes.includes(args[0])) return message.channel.send('Questo prefisso è già stato aggiunto!')
        .catch(console.error);
      if (prefix.length > 11) return message.channel.send('Mi dispiace ma puoi aggiungere fino a 10 prefissi! Rimuovine uno con il comando `removeprefix` e riprova.')
        .catch(console.error);
      prefixes = client.setIDVar('prefix', prefixes.push(args[0]));
      if (!prefixes) return (client.error('Failed to add prefix', message), message.channel.send('Si è verificato un errore!')
        .catch(console.error));
      return message.channel.send(`Fatto! Ho aggiunto il prefisso \`${args[0]}\``)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};
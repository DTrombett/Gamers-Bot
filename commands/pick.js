module.exports = {
  name: 'pick',
  description: 'Lancia il dado... e prendi un numero random!',
  help: 'Mostra un numero casuale tra 1 e 100 o un intervallo scelto da te!',
  usage: ' (max | min) (max)',
  examples: ['', ' 10', '10 100'],
  aliases: ['dice', 'roll'],
  execute: async function(message, args, client, prefix) {
    try {
      if (!!args[0] && isNaN(args[0]) || !!args[1] && isNaN(args[1])) return message.channel.send('Non hai inserito un numero valido!')
        .catch(console.error);
      var sent = await message.channel.send('Sto tirando il dado...')
        .catch(err => client.error(err, message));
      if (!sent) return;
      var random;
      if (!args[0]) {
        random = Math.floor(Math.random() * 101);
      } else if (!args[1]) {
        random = Math.floor(Math.random() * args[0] + 1);
      } else {
        let min = Math.ceil(args[0]);
        let max = Math.floor(args[1]);
        random = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      if (isNaN(random)) return message.channel.send('Non hai inserito un numero valido!')
        .catch(console.error);
      return setTimeout(() => {
        return sent.edit(`È uscito il numero **${random}**!`)
          .catch(console.error);
      }, 800);
    } catch (err) {
      client.error(err, message);
    }
  }
};
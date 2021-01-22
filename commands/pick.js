module.exports = {
  name: 'pick',
  description: 'Lancia il dado... e prendi un numero random!',
  async execute(message, args, client, db) {
    try {
      if (!!args[0] && isNaN(args[0]) || !!args[1] && isNaN(args[1])) return message.channel.send('Non hai inserito un numero valido!')
        .catch(console.error);
      var sent = await message.channel.send('Sto tirando il dado...')
        .catch(console.error);
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
      setTimeout(function() {
        return sent.edit(`È uscito il numero **${random}**!`)
          .catch(console.error);
      }, 900);
    } catch (err) {
      console.log(err, message);
    }
  }
};
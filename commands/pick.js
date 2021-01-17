module.exports = {
  name: 'pick',
  description: 'Lancia il dado... e prendi un numero random!',
  async execute(message, args, client, db) {
    try {
      if (!!args[0] && isNaN(args[0]) || !!args[1] && isNaN(args[1])) return message.channel.send('Non hai inserito un numero valido!');
      var random;
      if(!args[0]) {
        random = Math.floor(Math.random() * 100);
      } else if(!args[1]) {
        random = Math.floor(Math.random() * args[0]);
      } else {
        let min = Math.ceil(args[0]);
        let max = Math.floor(args[1]);
        random = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var sent = await message.channel.send('Sto lanciando il dado...');
      setTimeout(function() {
        sent.edit(`È uscito il numero **${random}**!`);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  }
};
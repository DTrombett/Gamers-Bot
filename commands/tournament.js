const fetch = require('node-fetch');

module.exports = {
  name: 'tournament',
  description: '',
  async execute(message, args, client, db) {
    try {
      await message.channel.send('Caricamento...');
      var page = await fetch(args[0]).then(res => res.text());
      let parts = page.split(`<li class='content'>`);
      part.shift();
      let last = part.pop().split(`</li>`)[0];
      var array = [];
      for(let p of parts) array.push(p.substring(0, p.length - 5));
      array.push(last);
      sent.edit(array.join('\n'));
    } catch (err) {
      console.log(err);
    }
  }
};
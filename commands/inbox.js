const fetch = require('node-fetch');

module.exports = {
  name: 'inbox',
  description: '',
  async execute(message, args, client, db) {
    try {
      const file = fetch('https://inbox.brawlstars.com').then(res => res.text());
      var parts = text.split(`<a href="`);
      parts.shift();
      
      var links = []; var categories = []; var titles = []; var images = [];
      for(var i = 0; i < parts.length; i++) {
        if(parts[i].startsWith('brawlstars://extlink?page=')) {
          link.push(parts[i].split(`"`)[0].replace('brawlstars://extlink?page=', ''))
        } else if(parts[i].startsWith('https://inbox.brawlstars.com/news/')) {
          links.push(parts[i].split(`"`)[0]);
        } else links.push('');
        categories.push(parts[i].split('data-ga-category="')[1].split('"')[0]);
        titles.push(parts[i].split('data-ga-label="')[1].split('"')[0].replace(' - articleExternal', ''));
        images.push(parts[i].split('data-ga-creative="')[1].split('"')[0]);
      }
      console.log(titles, categories, links, images);
    } catch (err) {
      console.log(err);
    }
  }
};
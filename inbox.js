const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');
String.prototype.decode = function() {
  var map = {"gt":">" /* , … */};
  return this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, function($0, $1) {
    if ($1[0] === "#") {
      return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16)  : parseInt($1.substr(1), 10));
      } else {
        return map.hasOwnProperty($1) ? map[$1] : $0;
      }
  });
};

module.exports = {
  name: 'inbox',
  description: 'Get last Brawl News!',
  async execute(message, args, client, db) {
    try {
      const date = Date.now();
      const file = await fetch('https://inbox.brawlstars.com').then(res => res.text());
      var parts = file.split(`<a href="`);
      parts.shift();
      var links = []; var categories = []; var titles = []; var images = [];
      for(var i = 0; i < parts.length; i++) {
        if(parts[i].startsWith('brawlstars://extlink?page=')) {
          links.push(parts[i].split(`"`)[0].replace('brawlstars://extlink?page=', ''));
        } else if(parts[i].startsWith('https://inbox.brawlstars.com/news/')) {
          links.push(parts[i].split(`"`)[0].split('?')[0]);
        } else links.push('');
        categories.push(parts[i].split('data-ga-category="')[1].split('"')[0].decode());
        titles.push(parts[i].split('data-ga-label="')[1].split('"')[0].replace(' - articleExternal', '').decode());
        images.push(parts[i].split('data-ga-creative="')[1].split('"')[0].split('?')[0]);
      }
      const embed = new MessageEmbed()
      .setTitle('Brawl Stars News')
      .setColor('YELLOW')
      .setURL('https://www.brawlstarsitalia.com/')
      .setThumbnail('https://cdn.starlist.pro/misc/Brawl-Stars-Logo.png')
      .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 4096
      }))
      .setTimestamp();
      for(var n = 0; n < titles.length; n++) if(!!links[n]) embed.addField(categories[n], `[${titles[n]}](${links[n]})`);
      console.log(Date.now() - date);
      message.channel.send(embed);
    } catch (err) {
      console.log(err, message);
    }
  }
};
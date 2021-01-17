module.exports = {
     name: 'lyrics',
     description: "description",
     async execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles) {
       try {
        const fetch = require('node-fetch');
        let content = args.join(' ');
        const elements = content.replace(/ {2,}/g,' ');
        var author = elements.split('/')[0];
        var title = elements.split('/')[1];
        if(!author || !title) return message.channel.send('Non hai fornito un autore e titolo! Ricorda di scriverli entrambi separati da uno slash!');
        author = author.trim().replace(/[^a-zA-Z0-9]/g,'%20').toLowerCase();
        title = title.trim().replace(/[^a-zA-Z0-9]/g,'%20').toLowerCase();
        fetch(`https://private-anon-94b0eaeb45-lyricsovh.apiary-proxy.com/v1/${author}/${title}`).then(response => {
        console.log(response);
        response.json().then(async data => {
        console.log(data);
        if(data.lyrics === '') return message.channel.send('Non ho trovato nessuna lyrics per questa canzone, assicurati di aver usato correttamente il comando!');
        author = author.toLowerCase().split('%20');
        for (let i = 0; i < author.length; i++) {
        author[i] = author[i].charAt(0).toUpperCase() + author[i].substring(1); 
        }
        var text = data.lyrics.replace(/\n{3,}/g, '\n');
        var array = [];
        var pages = [];
        var splitted = text.split('\n\n');
        for(let page of splitted) {
          array.push(page);
          if(array.join('\n\n').length >= 1000 || splitted[splitted.length - 1] == page) {
            array.pop();
            pages.push(array.join('\n\n'));
            array = [page];
          }
          pages = pages;
          array = array;
        }
        pages = pages;
        function lyrics(page, number) {
        const embed = new Discord.MessageEmbed()
        .setAuthor(author.join(' '))
        .setTitle(title.charAt(0).toUpperCase() + title.toLowerCase().replace(/%20/g, ' ').slice(1))
        .setFooter(`Requested by ${message.author.tag}`)
        .addFields(
          {name: '​', value: page},
          {name: 'Page', value: `**${number}/${pages.length}**`}
          )
        .setThumbnail(message.guild.iconURL({
          format: 'png',
          dynamic: true,
          size: 4096
        }))
        .setTimestamp()
        .setColor('RED');
        return embed;
        }
        const page1 = lyrics(pages[0], 1);
        const page2 = lyrics(pages[1], 2);
        const page3 = lyrics(pages[2], 3);
        const page4 = lyrics(pages[3], 4);
        const page5 = lyrics(pages[4], 5);
        var sent = await message.channel.send(page1);
        if(pages.length > 1) {
        await sent.react('◀️');
        await sent.react('▶️');
        const filter = (reaction, user) => {
	      return ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        var i = 1;
        await sent.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
        	.then(collected => {
        		let reaction = collected.first();
        		if (reaction.emoji.name === '◀️') {
        		  i--;
        		  if(i < 1) return i++;
        			sent.edit(eval('page' + i));
        		} else {
        		  i++;
        		  if(i > pages.length) return i--;
        			sent.edit(eval('page' + i));
        		}
         i = i;
        	})
        	.catch(collected => {
         console.log(collected);
        	});
        let userReactions = sent.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
        try {
        	for (let reaction of userReactions.values()) {
        		await reaction.users.remove(message.author.id);
        	}
        } catch (error) {
        	console.error(error);
        }
        i = i;
        }
        });
        });
       } catch (err) {
         console.log(err);
       }
     }};
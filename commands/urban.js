const Discord = require('discord.js');

function defEmbed(def, message, i, length) {
  const { MessageEmbed } = require('discord.js');
  var definition = def.definition.replace(/[\[\]']+/g,'');
  definition = definition.charAt(0).toUpperCase() + definition.slice(1);
  var link = def.permalink;
  var up = def.thumbs_up;
  var down = def.thumbs_down;
  var date = def.written_on.replace(/T/, ' ').replace(/\..+/, '');
  var example = def.example.replace(/[\[\]']+/g,'');
  const embed = new MessageEmbed()
  .setTitle(def.word)
  .setAuthor(message.author.tag, 'https://slack-files2.s3-us-west-2.amazonaws.com/avatars/2018-01-11/297387706245_85899a44216ce1604c93_512.jpg', 'https://www.urbandictionary.com')
  .setColor('ORANGE')
  .setURL(link)
  .setDescription(definition)
  .setThumbnail(message.guild.iconURL({
    format: 'png',
    dynamic: true,
    size: 4096
    }))
    .setFooter(`👍${up} - 👎${down} | Scritto il ${date} | ${i} di ${length}`)
    .addField('Example', example);
    return embed;
}

async function removeUserReactions(sent, message) {
  try {
    let userReactions = sent.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
    for (let reaction of userReactions.values()) {
      await reaction.users.remove(message.author.id);
      }
      } catch (error) {
        console.error(error);
        }
}

module.exports = {
    name: 'dictionary',
    description: "",
    async execute(message, args, client, db, findMember) {
      const fetch = require('node-fetch');
      const querystring = require('querystring');
        if (!args.length) return message.channel.send('Devi scrivere un termine di ricerca!');
      	const query = querystring.stringify({ term: args.join(' ') });
      	if(query.length > 256) return message.channel.send('Scrivi una ricerca più corta!');
        var { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());
        list = list.filter(x => x.definition.length < 2048 && x.example.length < 1024);
        def = list.shift();
        if(!def) return message.channel.send("Non ho trovato nessuna definizione per questa parola!");
        console.log(list, def);
        var length = list.length;
        var i = 1;
        var sent = await message.channel.send(defEmbed(def, message, i, length));
        if (length > 1) {
          await sent.react('◀️');
          await sent.react('▶️');
          const filter = (reaction, user) => {
            return ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            await sent.awaitReactions(filter, {
              max: 1,
              time: 60000,
              errors: ['time']
              })
              .then(collected => {
                let reaction = collected.first();
                if (reaction.emoji.name === '◀️') {
                  i--;
                  if (i < 1) return i++;
                  sent.edit(defEmbed(list[i - 1], message, i, length));
                  } else {
                    i++;
                    if (i > length) return i--;
                    sent.edit(defEmbed(list[i - 1], message, i, length));
                    }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            }
        }};
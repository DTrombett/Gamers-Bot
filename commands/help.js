function helpEmbed(n, client, Discord) {
  var i = 0;
  for (let cmd of client.commands) {
    if (cmd[1].description !== '') {
      i++;
      }
      }
      i = Math.ceil(i / 10);
      const embed = new Discord.MessageEmbed()
      .setColor('RED')
      .setTitle('Help message')
      .setDescription('Ecco i comandi!')
      .setFooter(`Pagina ${n} di ${i}`)
      .setTimestamp()
      .setThumbnail(client.user.displayAvatarURL({
        format: 'png',
        dynamic: true,
        size: 4096
        }));
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
    name: 'help',
    description: "Mostra questo messaggio con tutti i miei comandi!",
    async execute(message, args, Discord, client, prefix, fs, db, command) {
        try {
            var array = [];
            var i = 10;
            var n = 0;
            for (let cmd of client.commands) {
                if (cmd[1].description !== '') {
                    if (i == 10) {
                        n++;
                        i = 1;
                        eval(`var page${n} = helpEmbed(${n}, client, Discord)`);
                        array.push(eval(`page${n}`));
                    }
                    eval(`page${n}.addFields({
                        name: prefix + cmd[0],
                        value: cmd[1].description
                    });`);
                    i++;
                }
            }
            var sent = await message.channel.send(page1);
            if (array.length > 1) {
                await sent.react('◀️');
                await sent.react('▶️');
                const filter = (reaction, user) => {
                    return ['◀️', '▶️'].includes(reaction.emoji.name) && user.id === message.author.id;
                };
                i = 1;
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
                       sent.edit(eval('page' + i));
                      } else {
                       i++;
                       if (i > array.length) return i--;
                        sent.edit(eval('page' + i));
                      }
                    })
                    .catch (collected => {
                    console.log(collected);
                });
                removeUserReactions(sent, message);
            }
        } catch (err) {
            console.log(err);
        }
    }
}
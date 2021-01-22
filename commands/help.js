const { Collection, MessageEmbed } = require('discord.js');

function helpEmbed(n, client) {
  var i = Math.ceil(client.commands.filter(c => !!c.description).size / 10);
  if (!n) n = i;
  const embed = new MessageEmbed()
    .setColor('RED')
    .setTitle('Help Message')
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

module.exports = {
  name: 'help',
  description: "Mostra questo messaggio con tutti i miei comandi!",
  async execute(message, args, client, db) {
    try {
      var validCommands = client.commands.filter(c => !!c.description);
      var commands = new Collection();
      var embeds = [];
      for (var i = 0; i < validCommands.size; i++) {
        let cmd = validCommands.array()[i];
        commands.set(cmd.name, { d: cmd.description, n: client.prefix + cmd.name });
        if (commands.size == 10 || i + 1 == validCommands.size) {
          let n = i + 1 == validCommands.size ? undefined : Math.round(i / 10);
          let embed = helpEmbed(n, client);
          for (let c of commands.array()) embed.addField(c.n, c.d);
          embeds.push(embed);
          commands = new Collection();
        }
      }
      var sent = await message.channel.send(embeds[0])
        .catch(console.error, message);
      if (embeds.length == 1 || !sent) return;
      var error;
      sent.react('◀️')
        .then(() => sent.react('▶️'))
        .then(() => sent.react('❌'))
        .catch(err => {
          console.error(err);
          error = true;
        });
      if (error) return;
      var i = 0;
      const filter = (reaction, user) => {
        return ['❌', '▶️', '◀️'].includes(reaction.emoji.name) && user.id === message.author.id;
      };
      const collector = sent.createReactionCollector(filter, { time: 60000 });
      collector.on('collect', (reaction, user) => {
        var embed;
        switch (reaction.emoji.name) {
          case '◀️':
            if (i - 1 < 0) return;
            i -= 1;
            embed = embeds[i];
            sent.edit(embed)
              .catch(console.error);
            break;
          case '▶️':
            if (i + 1 >= embeds.length) return;
            i += 1;
            embed = embeds[i];
            sent.edit(embed)
              .catch(console.error);
            break;
          case '❌':
            collector.stop('Stopped by the user');
            break;
          default:
            return;
        }
        return reaction.users.remove(user.id)
          .catch(console.error);
      });
      collector.on('end', (collected, reason) => {
        if (reason == 'Stopped by the user') {
          const stopped = helpEmbed('', client)
            .setFooter('Made by DTrombett')
            .setDescription('Hai chiuso la pagina di aiuto!');
          sent.edit(stopped)
            .catch(console.error);
        }
        return sent.reactions.removeAll()
          .catch(console.error);
      });
    } catch (err) {
      console.log(err, message);
    }
  }
};
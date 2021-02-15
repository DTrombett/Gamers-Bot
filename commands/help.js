const { Collection, MessageEmbed } = require('discord.js');
const normalize = require('normalize-strings');
const ms = require('ms');
const { helpEmbed } = require('../config/helpEmbed');

var commandObject = {
  name: 'help',
  description: "Mostra questo messaggio con tutti i miei comandi!",
  help: 'Mostra tutti i comandi del bot o delle informazioni riguardo un comando in particolare!',
  usage: ' (comando)',
  examples: ['', ' avatar'],
  aliases: ['h', 'aiuto', 'comandi', 'commands'],
  time: 5000,
  execute: async (message, args, client, prefix) => {
    try {
      message.delete()
        .catch(console.error);
      var validCommands = client.commands.filter(c => {
        return !!c.description;
      });
      if (args[0]) {
        var command = normalize(args[0]).toLowerCase();
        command = validCommands.get(command) || validCommands.find(c => {
          return c.aliases.includes(command);
        });
        if (!command)
          return message.channel.send('Hey, mi dispiace ma non ho trovato il comando che cercavi!')
            .catch(console.error);
        var commandHelp = new MessageEmbed()
          .setColor('RED')
          .setThumbnail(client.customAvatar)
          .setAuthor(client.user.tag, client.customAvatar, client.customAvatar)
          .setTitle(`Comando: ${command.name}`)
          .setDescription(command.help)
          .addField('Uso', prefix + command.name + command.usage)
          .addField('Esempi', command.examples.map(c => {
            return `${prefix}${c}`;
          }).join('\n'))
          .addField('Alias', command.aliases.map(a => {
            return `${prefix}${a}`;
          }).join('\n') || 'none')
          .addField('Cooldown', ms(command.time || 1000))
          .setTimestamp()
          .setFooter('Made by DTrombett');
        return message.channel.send(commandHelp);
      }
      var commands = new Collection();
      var embeds = [];
      for (var i = 0; i < validCommands.size; i++) {
        let cmd = validCommands.array()[i];
        commands.set(cmd.name, { desc: cmd.description, name: prefix + cmd.name });
        if (commands.size == 10 || i + 1 == validCommands.size) {
          let n = i + 1 == validCommands.size ? void 0 : Math.round(i / 10);
          let embed = helpEmbed(n, client);
          for (let comm of commands.array())
            embed.addField(comm.name, comm.desc);
          embeds.push(embed);
          commands = new Collection();
        }
      }
      if (!embeds[0])
        return client.error('Help embed unavailable.') && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      var sent = await message.channel.send(embeds[0])
        .catch(err => {
          return client.error(err, message);
        });
      if (embeds.length == 1 || !sent)
        return;
      let reaction = await sent.react('◀️')
        .then(() => {
          return sent.react('▶️');
        })
        .then(() => {
          return sent.react('❌');
        })
        .catch(console.error);
      if (!reaction)
        return;
      var i = 0;
      function filter(reaction, user) {
        return ['❌', '▶️', '◀️'].includes(reaction.emoji.name) && user.id === message.author.id;
      }
      const collector = sent.createReactionCollector(filter, { time: 300000 });
      collector.on('collect', (reaction, user) => {
        var embed;
        switch (reaction.emoji.name) {
          case '◀️':
            if (i - 1 < 0)
              return;
            i -= 1;
            embed = embeds[i];
            sent.edit(embed)
              .catch(console.error);
            break;
          case '▶️':
            if (i + 1 >= embeds.length)
              return;
            i += 1;
            embed = embeds[i];
            sent.edit(embed)
              .catch(console.error);
            break;
          case '❌':
            collector.stop('1000');
            break;
          default:
            return;
        }
        return reaction.users.remove(user.id)
          .catch(console.error);
      });
      collector.on('end', (collected, reason) => {
        if (reason === '1000') {
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
      client.error(err, message);
    }
  }
};

module.exports = commandObject;
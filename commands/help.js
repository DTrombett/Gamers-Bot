const { Collection, MessageEmbed } = require('discord.js');
const normalize = require('normalize-strings');
const ms = require('ms');
const helpEmbed = require('../config/helpEmbed');
const { Command } = require('../config');
const error = require('../config/error');

const command = new Command('help',

  async function (message, args, prefix) {
    try {
      message.delete()
        .catch(console.error);
      var validCommands = message.client.commands.filter(c => {
        return !!c.description;
      });
      var customClientAvatar = customClientAvatar;
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
          .setThumbnail(customClientAvatar)
          .setAuthor(message.client.user.tag, customClientAvatar, customClientAvatar)
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
          let embed = helpEmbed(n, message.client);
          for (let comm of commands.array())
            embed.addField(comm.name, comm.desc);
          embeds.push(embed);
          commands = new Collection();
        }
      }
      if (!embeds[0])
        return error('Help embed unavailable.') && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      var sent = await message.channel.send(embeds[0])
        .catch(err => {
          return error(err, message);
        });
      if (embeds.length == 1 || !sent)
        return null;
      let reaction = await sent.react('◀️')
        .then(() => {
          return sent.react('▶️');
        })
        .then(() => {
          return sent.react('❌');
        })
        .catch(console.error);
      if (!reaction)
        return null;
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
              return null;
            i -= 1;
            embed = embeds[i];
            sent.edit(embed)
              .catch(console.error);
            break;
          case '▶️':
            if (i + 1 >= embeds.length)
              return null;
            i += 1;
            embed = embeds[i];
            sent.edit(embed)
              .catch(console.error);
            break;
          case '❌':
            collector.stop('1000');
            break;
          default:
            return null;
        }
        return reaction.users.remove(user.id)
          .catch(console.error);
      });
      collector.on('end', (collected, reason) => {
        if (reason === '1000') {
          const stopped = helpEmbed('', message.client)
            .setFooter('Made by DTrombett')
            .setDescription('Hai chiuso la pagina di aiuto!');
          sent.edit(stopped)
            .catch(console.error);
        }
        return sent.reactions.removeAll()
          .catch(console.error);
      });
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription("Mostra questo messaggio con tutti i miei comandi!")
  .setHelp('Mostra tutti i comandi del bot o delle informazioni riguardo un comando in particolare!')
  .setUsage('(comando)')
  .addExample('', ' avatar')
  .addAlias('h', 'aiuto', 'comandi', 'commands')
  .setCooldown(5000);

module.exports = command;
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { readdirSync, readFile, unlink } = require('fs');
const Zip = require('adm-zip');
const ms = require('ms');
const rimraf = require('rimraf');
const fetch = require('node-fetch');

var commandObject = {
  name: 'debug',
  aliases: ['try', 'test'],
  execute: async (message, args, client, prefix) => {
    try {
      if (message.author.id != '597505862449496065')
        return;
      var date = Date.now();
      message.delete();
      switch (args[0].toLowerCase()) {
        case 'uptime':
          return message.channel.send(ms(client.uptime));
          break;
        case 'backup':
          function getDirectories(source) {
            return readdirSync(source, { withFileTypes: true })
              .filter(dirent => {
                return dirent.isDirectory();
              })
              .map(dirent => {
                return dirent.name;
              })
              .filter(dirent => {
                return !dirent.startsWith('.');
              })
              .filter(dirent => {
                return !['node_modules', 'variables', 'backup'].includes(dirent);
              });
          }
          var attachments = [];
          for (let dir of getDirectories('./')) {
            let zip = new Zip();
            zip.addLocalFolder(`./${dir}`);
            zip.writeZip(`./backup/${dir}.zip`);
            let att = new MessageAttachment(`./backup/${dir}.zip`, dir + '.zip');
            attachments.push(att);
          }
          message.channel.send(`Backup completed! Took **${Date.now() - date}ms**`, attachments);
          rimraf('./backup', () => console.log('Backup completed and files deleted. ', `Took ${Date.now() - date}`));
          break;
        case 'fetch':
          message.delete();
          var text;
          var json;
          var error = [];
          var attachment;
          await fetch(args[2]).then(async res => {
            if (!res.ok) {
              message.channel.send('Failed!');
              return console.log(res);
            }
            switch (args[1].toLowerCase()) {
              case 'text':
                text = await res.text()
                  .catch(err => {
                    console.error(err);
                    error.push('text');
                  });
                if (!error.includes('text'))
                  attachment = new MessageAttachment(Buffer.from(text), 'fetched.html');
                break;
              case 'json':
                json = await res.json()
                  .catch(err => {
                    console.error(err);
                    error.push('json');
                  });
                if (!error.includes('json'))
                  attachment = new MessageEmbed()
                    .setDescription('Check the console for results!');
                console.log(json);
                break;
              default:
                return message.channel.send('Invalid options!');
            }
            if (attachment)
              return message.channel.send(`Success! Took **${Date.now() - message.createdTimestamp}ms**`, attachment);
            return message.channel.send('Failed to parse!');
          });
          break;
        case 'sendfile':
          const file = args[1];
          message.channel.send({
            files: [{
              attachment: file,
              name: file,
            }]
          })
            .catch(err => {
              console.log(err);
              message.channel.send('File not found!');
            });
          break;
        case 'sendtextfile':
          readFile(args[1], 'utf8', function (err, data) {
            if (err) {
              message.channel.send('File not found');
              throw err;
            }
            message.channel.send('\`\`\`js\n' + data + '\`\`\`');
          });
          break;
        case 'sendmessage':
          message.delete();
          args.shift();
          let channel = client.channels.cache.find(c => c.toString() == args[0]) || client.channels.cache.find(c => c.id == args[0]) || client.channels.cache.find(c => c.name == args[0]);
          if (!channel)
            channel = message.channel;
          else
            args.shift();
          channel.send(args.join(' '));
          break;
        case 'ram':
          let used = process.memoryUsage().heapUsed / 1024 / 1024;
          used = Math.round(used * 100) / 100 + 'MB';
          message.channel.send(used);
          break;
        case 'man':
          var man = client.setVar('man', !client.getVar('man'));
          if (man)
            await client.user.setPresence({
              status: 'idle',
              activity: {
                name: 'Maintenance!',
                type: 'WATCHING',
              }
            });
          else
            await client.user.setPresence({
              status: 'online',
              activity: {
                name: '-help',
                type: 'LISTENING',
              }
            });
          message.channel.send('Fatto!');
          break;
        default:
          client.commands.get('eval').execute(message, args, client, prefix);
      }
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;
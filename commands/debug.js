const fetch = require('node-fetch');
const { MessageAttachment, MessageEmbed } = require('discord.js');
const { readdirSync, readFile } = require('fs');
const canvacord = require('canvacord');
var Zip = require("adm-zip");
const format = require('dateformat');

module.exports = {
  name: 'debug',
  description: '',
  async execute(message, args, client, db) {
    try {
      if (message.author.id != '597505862449496065') return;
      var date = Date.now();
      message.delete();
      switch (args[0].toLowerCase()) {
        case "backup":
          const getDirectories = source =>
          readdirSync(source, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
          .filter(dirent => !dirent.startsWith('.'))
          .filter(dirent => dirent != 'node_modules');
          var attachments = [];
          for(let dir of getDirectories('./')) {
            let zip = new Zip();
            zip.addLocalFolder(`./${dir}`);
            zip.writeZip(`./config/${dir}.zip`);
            let att = new MessageAttachment(`./config/${dir}.zip`, dir + '.zip');
            attachments.push(att);
          }
          await message.channel.send(`Backup completed! Took **${Date.now() - date}ms**`, attachments);
          for(let dir of getDirectories('./')) fs.unlink(`./config/${dir}.zip`, err => {
            if(err) throw err;
          });
          break;
        case "fetch":
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
                if (!error.includes('text')) attachment = new MessageAttachment(Buffer.from(text), 'fetched.html');
                break;
              case 'json':
                json = await res.json()
                  .catch(err => {
                    console.error(err);
                    error.push('json');
                  });
                if (!error.includes('json')) attachment = new MessageEmbed()
                  .setDescription('Check the console for results!');
                console.log(json);
                break;
              default:
                return message.channel.send('Invalid options!');
            }
            if (attachment) return message.channel.send(`Success! Took **${Date.now() - message.createdTimestamp}ms**`, attachment);
            return message.channel.send('Failed to parse!');
          });
          break;
        case "sendfile":
          const file = args[1];
          message.channel.send({
              files: [{
                attachment: file,
                name: file,
              }]
            })
            .catch(err => {
              console.log(err);
              message.channel.send("File not found!");
            });
          break;
        case "sendtextfile":
          readFile(args[1], 'utf8', function(err, data) {
            if (err) {
              message.channel.send('File not found');
              throw err;
            }
            message.channel.send('\`\`\`js\n' + data + '\`\`\`');
          });
          break;
        case "sendmessage":
          message.delete();
          args.shift();
          let channel = client.channels.cache.find(c => c.toString() == args[0]) || client.channels.cache.find(c => c.id == args[0]) || client.channels.cache.find(c => c.name == args[0]);
          if(!channel) channel = message.channel; else args.shift();
          channel.send(args.join(' '));
          break;
        case "ram":
          let used = process.memoryUsage().heapUsed / 1024 / 1024;
          used = Math.round(used * 100) / 100 + 'MB'
          message.channel.send(used);
          break;
        default:
          client.commands.get('eval').execute(message, args, client, db);
      }
    } catch (err) {
      console.log(err, message);
    }
  }
};
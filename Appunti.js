module.exports = {
  name: '',
  description: '',
  help: '',
  usage: '',
  aliases: [],
  examples: [],
  execute: async function(message, args, client, prefix) {
    try {

    } catch (err) {
      client.error(err, message);
    }
  }
};

displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })
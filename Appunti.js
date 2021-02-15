var commandObject = {
  name: '',
  description: '',
  help: '',
  usage: ' ',
  aliases: [],
  examples: [],
  time: 1000,
  execute: async (message, args, client, prefix) => {
    try {
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;

displayAvatarURL({ format: 'png', dynamic: true, size: 4096 })
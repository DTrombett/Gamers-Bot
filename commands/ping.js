const { Command } = require('../config');
const error = require("../config/error");

const command = new Command('ping',

  async function (message) {
    try {
      var sent = await message.channel.send(`🏓 Pong!`)
        .catch(console.error);
      if (!sent)
        return null;
      return sent.edit(`🏓 Pong! Latency: **${Math.floor(sent.createdTimestamp - message.createdTimestamp)}ms** API: **${message.client.ws.ping}ms**`)
        .catch(console.error);
    } catch (err) {
      error(err, message);
    }
  })
  .setDescription("Pong!")
  .setHelp('Pong!')
  .addAlias('latency');

module.exports = command;
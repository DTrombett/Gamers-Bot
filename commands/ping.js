var commandObject = {
  name: 'ping',
  description: "Pong!",
  help: 'Pong!',
  aliases: ['latency'],
  execute: async (message, args, client, prefix) => {
    try {
      var sent = await message.channel.send(`🏓 Pong!`)
        .catch(console.error);
      if (!sent)
        return;
      return sent.edit(`🏓 Pong! Latency: **${Math.floor(sent.createdTimestamp - message.createdTimestamp)}ms** API: **${client.ws.ping}ms**`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;
module.exports = {
    name: 'ping',
    description: "Pong!",
    execute(message, args, client, db) {
      try {
        message.channel.send(`🏓 Pong! Latency: **${Math.round(Date.now() - message.createdTimestamp)}ms** API: **${client.ws.ping}ms**`);
      } catch (err) {
        console.log(err, message);
      }
    }};
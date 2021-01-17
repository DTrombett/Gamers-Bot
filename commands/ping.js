module.exports = {
    name: 'ping',
    description: "description",
    async execute(message, args, Discord, client, prefix, fs, db, command) {
      try {
        message.channel.send(`🏓 Pong! Latency: **${Math.Round(Date.now() - message.createdTimestamp)}ms** Api: **${client.ws.ping}ms**`)
      } catch (err) {
        console.log(err);
      }
    }}
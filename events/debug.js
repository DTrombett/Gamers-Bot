module.exports = (info, client) => {
  try {
    if (info.includes('[HeartbeatTimer]')) return;
    if (info.includes('Heartbeat acknowledged')) {
      let splitted = info.split(' ');
      var ping = splitted[splitted.length - 1];
      if (ping < 200) return;
      return console.info(`Latency -> ${ping} [${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}]`);
    }
    console.info(`info -> ${info} [${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}]`);
    if (info.startsWith('429 hit on route ')) return process.exit('Hitted rate limit!');
  } catch (err) {
    client.error(err, info);
  }
}
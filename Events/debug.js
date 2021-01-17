module.exports = {
    name: 'debug',
    description: '',
    execute(info, client, db) {
      try {
        if(info.includes('[HeartbeatTimer]') || info.includes('Heartbeat acknowledged') && info.split(' ')[info.split(' ').length - 1].length == 5) return;
        console.info(`info -> ${info}`);
      } catch (err) {
        console.log(err);
      }
    }};
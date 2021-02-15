module.exports = (message) => {
  return message.channel.send('Non ho trovato questo messaggio all\'interno del server')
    .catch(console.error);
}
module.exports = (message) => {
  return message.channel.send('Si è verificato un errore durante l\'elaborazione della richiesta! Per favore controlla i miei permessi!')
    .catch(console.error);
}
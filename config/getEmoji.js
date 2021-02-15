module.exports = (flag, client) => {
  return client.emojis.cache.find(e => {
    return e.name == flag;
  }).toString();
}

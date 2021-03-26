const { Client } = require("discord.js");

/**
 * Get the emoji of a user flag.
 * @param {String} flag - The flag
 * @param {Client} client - The client that instantiated this
 */
module.exports = (flag, client) => {
  var emoji = client.emojis.cache.find(e => {
    return e.name == flag.toUpperCase();
  });
  if (!emoji) return '';
  return emoji.toString();
}

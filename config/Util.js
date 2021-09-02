// @ts-nocheck
const { Guild, MessageAttachment, TextChannel, User, Message, Client, Collection } = require("discord.js");
const { readdir } = require("fs");
const normalizeStrings = require("normalize-strings");
const { Command } = require('../config');
const { getIDVar, getDefault } = require("./variables");

global._requireUncachedAsync = async path => new Promise((resolve, reject) => {
  try {
    path = require.resolve(`.${path}`);
  } catch (error) {
    reject(error);
    return;
  }
  delete require.cache[path];
  resolve(require(path));
});

global._requireAsync = async path => new Promise((resolve, reject) => {
  try {
    resolve(require(path));
  } catch (error) {
    reject(error);
  }
});

i18n = {
  dayNames: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
  monthNames: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic", "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
  timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
};

/**
 * Get a key from an object by its value
 * @param {Object} object - The Object to read
 * @param {*} value - The value to find
 * @returns {String} The key for this value
 */
Object.getKey = (object, value) => Object.keys(object).find(key => object[key] === value);

/**
 * Capitalize the first letter of a string.
 * @param {Number} [n=0] - Number of letters to capitalize
 * @returns {?String} The string capitalized
 */
String.prototype.capitalize = function (n = 1) {
  if (this === null) return null;
  if (n === 0) n = this.length;
  let up = String.prototype;
  for (var i = 0; i < n; i++) up += this.charAt(i).toUpperCase();
  var capitalized = up + this.slice(n);
  return capitalized;
};

/**
 * Encode a string to HTML.
 * @returns {?String} The encoded string
 */
String.prototype.encodeHTML = function () {
  if (this === null) return null;
  var map = { "gt": ">" /* , … */ };
  var HTMLEncoded = this.replace(/&(#(?:x[0-9a-f]+|\d+)|[a-z]+);?/gi, ($0, $1) => {
    if ($1[0] === "#") {
      return String.fromCharCode($1[1].toLowerCase() === "x" ? parseInt($1.substr(2), 16) : parseInt($1.substr(1), 10));
    } else {
      return map.hasOwnProperty($1) ? map[$1] : $0;
    }
  });
  return HTMLEncoded;
};

/**
 * Encode a string to binary.
 * @returns {?String} The encoded String
 */
String.prototype.toBinary = function () {
  if (this === null) return null;
  var binaryEncoded = (parseInt(this, 10) >>> 0).toString(2);
  return binaryEncoded;
};

/**
 * Remove elements in place from array.
 * @param {...*} arguments - The values to remove from array
 * @returns {Array<*>} The new array
 */
Array.prototype.remove = function () {
  var what, ax, a = arguments, length = a.length;
  while (length && this.length) {
    what = a[--length];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};

Client.prototype.manteinance = false;

/**
 * Asynchronously load bot commands
 * @returns {Promise<Collection<string, Command>>}
 */
Client.prototype.loadCommands = async function loadCommands() {
  const man = this.manteinance;
  this.manteinance = true;
  return new Promise((resolve, reject) => readdir('./commands/', async (err, files) => {
    if (err) {
      reject(err);
      return;
    }
    files = files.filter(file => file.endsWith('.js'));
    this.commands = new Collection();
    const promises = [];
    for (const file of files) promises.push(_requireUncachedAsync(`./commands/${file}`)
      .then(command => this.commands.set(command.name, command))
      .catch(console.error));
    const collections = await Promise.all(promises);
    resolve(collections[0]);
    this.manteinance = man;
  }));
}

/**
 * Get the log channel of a guild if any. Otherwise the default log channel will returned.
 * @returns {TextChannel} The log channel found
 */
Guild.prototype.getLogChannel = function () {
  return this.client.channels.cache.get('786270849006567454');
};

/**
 * Get the type of an attachment.
 * @returns {?String} The type of this attachment
 */
MessageAttachment.prototype.type = function () {
  if (!this.name) return null;
  var splitted = this.name.split('.');
  if (splitted.length < 2) return null;
  return splitted[splitted.length - 1];
};

/**
 * Get the avatar of a user with default values.
 * @param {String} [format] - The format of the avatar
 * @param {Boolean} [dynamic=true] - If true, the format will dynamically change to gif for animated avatars
 * @param {Number} [size] - The size of the avatar
 */
User.prototype.buildAvatar = function (format = 'png', dynamic = true, size = 4096) {
  const options = { format: format, dynamic: dynamic, size: size };
  return this.displayAvatarURL(options);
}

Object.defineProperty(Message.prototype, "prefix", {

  /**
   * The prefix used in a message, if any.
   * @returns {?String}
   */
  get: function prefix() {
    if (!this.guild || !this.author || !this.content) return null;
    var prefixes = getIDVar('prefix', this.guild.id), def = getDefault('prefix');
    if (this.author.id === '597505862449496065' && def !== prefixes) def.forEach(p => prefixes.push(p));
    for (let p of prefixes)
      if (this.content.startsWith(p)) return p;
    return null;
  }
});

Object.defineProperty(Message.prototype, "args", {

  /**
  * The args of a message.
  * @returns {Array<String>}
  */
  get: function args() {
    if (!this.content) return [];
    const prefix = this.prefix || '';
    return this.content.slice(prefix.length).trim().split(/ +/);
  }
});

Object.defineProperty(Message.prototype, "command", {

  /**
   * Find the command in a message.
   * @returns {?Command}
   */
  get: function command() {
    if (!this.args[0]) return null;
    let commandString = normalizeStrings(this.args[0].toLowerCase());
    return this.client.commands.get(commandString) || this.client.commands.find(cmd => cmd.aliases.includes(commandString)) || null;
  }
});

function messages() {
  let collection = new Collection();
  const channels = this.channels.cache.filter(c => c.isText());
  channels.forEach(c => collection = collection.concat(c.messages.cache));
  collection.sort((_v1, _v2, a, b) => a - b);
  return collection;
}

Object.defineProperty(Guild.prototype, "messages", {

  /**
  * A collection of messages in the guild.
  * @returns {Collection<Snowflake, Message>}
  */
  get: messages
});

Object.defineProperty(Client.prototype, "messages", {

  /**
  * A collection of all cached messages by the client.
  * @returns {Collection<Snowflake, Message>}
  */
  get: messages
});

Object.defineProperty(Client.prototype, "commandUses", {

  /**
  * A collection of all command uses.
  * @returns {Collection<Snowflake, CommandUse>}
  */
  get: function commandUses() {
    const collection = new Collection(), commands = this.commands.array();
    for (let i = 0; i < commands.length; i++) collection.concat(commands[i].uses);
    return collection;
  }
});
const { Collection } = require('discord.js');

module.exports = class Command {
  constructor(object) {
    this.name = object.name;
    this.description = object.description;
    this.help = object.help || '';
    this.usage = object.usage || '';
    this.aliases = object.aliases || [];
    this.examples = object.examples ? object.examples.map(t => this.name + t) : [this.name];
    this.execute = object.execute || (() => { });
    this.time = object.time || 1000;
    this.cooldown = new Collection();
  }
};
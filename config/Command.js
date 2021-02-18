const { Collection, Message } = require('discord.js');
const ms = require('ms');

/**
 * Represents a command of the bot.
 */
class Command {
    /**
     * @param {String} name The name of this command
     * @param {Function} [callback] The callback to execute when this command is called
     */
    constructor(name, callback = () => { }) {
        /**
         * Name of the command
         * @type {String}
         */
        this.name = name;

        /**
         * The callback of the command
         * @type {Function}
         */
        this.callback = callback;

        /**
         * The description of the command
         * @type {?String}
         */
        this.description = null;

        /**
         * The cooldown in milliseconds of the command
         * @type {Number}
         */
        this.time = 1000;

        /**
         * A Twitter snowflake, except the epoch is 2015-01-01T00:00:00.000Z
         * ```
         * If we have a snowflake '266241948824764416' we can represent it as binary:
         *
         * 64                                          22     17     12          0
         *  000000111011000111100001101001000101000000  00001  00000  000000000000
         *       number of ms since Discord epoch       worker  pid    increment
         * ```
         * @typedef {String} Snowflake
         */

        /**
         * Users in cooldown
         * @type {Collection<Snowflake, Message>}
         */
        this.cooldown = new Collection();

        /**
         * A Collection with number of uses for every user
         * @type {Collection<Snowflake, Number>}
         */
        this.uses = new Collection();

        /**
         * The help message for this command
         * @type {String}
         */
        this.help = '';

        /**
         * The usage of this command
         * @type {String}
         */
        this.usage = '';

        /**
         * Aliases for the command
         * @type {Array}
         */
        this.aliases = [];

        /**
         * Example of this command
         * @type {Array}
         */
        this.examples = [];
    }

    /**
     * Add new aliases for this command.
     * @param  {...String} args - Aliases to add
     * @returns {Command} The new Command
     * @example
     * // Add the alias "test"
     * command.addAlias('test');
     * @example
     * // Add more than one alias
     * command.addAlias('test', 'echo');
     */
    addAlias(...args) {
        args = args.map(arg => arg.toString());
        Array.isArray(this.aliases) ? args.forEach(alias => this.aliases.push(alias)) : this.aliases = args;
        return this;
    }

    /**
     * Add examples of the command.
     * @param  {...String} args - Examples to add without command name
     * @returns {Command} The new Command
     * @example
     * // Add an example to the command
     * command.addExample("Hello world!");
     */
    addExample(...args) {
        args = args.map(arg => arg.toString());
        Array.isArray(this.examples) ? args.forEach(ex => this.examples.push(this.name + ex)) : this.examples = args.map(t => `${this.name} ${t}`);
        return this;
    }

    /**
     * Add a description to the command, it will be shown in the help command.
     * @param  {String} description - A short description of the command
     * @returns {Command} The new Command
     * @example
     * command.setDescription("Hello world!");
     */
    setDescription(description) {
        description = description.toString();
        this.description = description;
        return this;
    }

    /**
     * Add a cooldown to the command.
     * @param  {Number} time - The cooldown for every user in milliseconds
     * @returns {Command} The new Command
     * @example
     * // Set the cooldown to 2 seconds
     * command.setCooldown(2000);
     */
    setCooldown(time) {
        time = parseInt(time);
        if (isNaN(time)) throw new TypeError('Invalid time given. Number expected.');
        this.time = time;
        return this;
    }

    /**
     * Add an help message for this command.
     * @param  {String} message - A detailed help message
     * @returns {Command} The new Command
     * @example
     * // Set a new help message
     * command.setHelp("This is a detailed description of the command.");
     */
    setHelp(message) {
        message = message.toString();
        this.help = message;
        return this;
    }

    /**
     * Add info about the usage of this command.
     * @param  {String} usage - The info without command name
     * @returns {Command} The new Command
     * @example
     * // Set a new usage of the command
     * command.setUsage("{user}");
     */
    setUsage(usage) {
        usage = usage.toString();
        this.usage = usage;
        return this;
    }

    /**
     * Execute this command.
     * @param {Message} message - The message with the command
     * @param {Array<String>} args - The args of message
     * @param {String} prefix - The prefix used
     * @returns {?Promise<*>} The response of callback function
     */
    async execute(message, args, prefix) {
        let permissions = message.channel.permissionsFor(message.guild.me);
        if (!permissions || !permissions.has('SEND_MESSAGES')) return null;
        let msg = this.cooldown.get(message.author.id);
        if (msg) {
            var time = this.time - (message.createdTimestamp - msg.createdTimestamp);
            if (this.cooldown <= 1000 || time <= 500) return null;
            time = ms(time);
            if (!time) return null;
            message.channel.send(`Ehy ${msg.author}, attendi ancora **${time}** prima di poter riutilizzare questo comando.`);
            return null;
        }
        var uses = this.uses.get(message.author.id);
        if (!uses) (uses = 0, this.uses.set(message.author.id, 0));
        uses++;
        console.info(`${message.author.tag} (${message.author.id}) executed the command ${this.name} in channel ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id}).`);
        return await this.callback(message, args, prefix);
    }
};

module.exports = Command;
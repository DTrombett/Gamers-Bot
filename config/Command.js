const { Collection, Message, TextChannel } = require('discord.js');
const ms = require('ms');
const error = require('./error');

/**
 * Represents a command of the bot.
 */
class Command {
    /**
     * @param {String} name The name of this command
     * @param {Function} [callback] The callback to execute when this command is called
     */
    constructor(name, callback = function () { }) {
        /**
         * Name of the command
         */
        this.name = name;

        /**
         * The callback of the command
         */
        this.callback = callback;

        /**
         * The description of the command
         * @type {?String}
         */
        this.description = null;

        /**
         * The cooldown in milliseconds of the command
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
         * @type Collection<Snowflake, Message>
         */
        this.cooldown = new Collection();

        /**
         * The help message for this command
         */
        this.help = '';

        /**
         * The usage of this command
         */
        this.usage = '';

        /**
         * Aliases for the command
         */
        this.aliases = [];

        /**
         * Example of this command
         */
        this.examples = [];
    }

    /**
     * Add new aliases for this command.
     * @param  {...String} args - Aliases to add
     * @returns The new Command
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
     * @returns The new Command
     * @example
     * // Add an example to the command
     * command.addExample("Hello world!");
     */
    addExample(...args) {
        args = args.map(arg => arg.toString());
        Array.isArray(this.examples) ? args.forEach(ex => this.examples.push(this.name + ex)) : this.examples = args.map(t => `${this.name}${t}`);
        return this;
    }

    /**
     * Add a description to the command, it will be shown in the help command.
     * @param  {String} description - A short description of the command
     * @returns The new Command
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
     * @returns The new Command
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
     * @returns The new Command
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
     * @returns The new Command
     * @example
     * // Set a new usage of the command
     * command.setUsage("{user}");
     */
    setUsage(usage) {
        usage = usage.toString();
        this.usage = ` ${usage}`;
        return this;
    }

    /**
     * Send a message to the user if the usage of the command is wrong.
     * @param {TextChannel} channel - The channel where the bot will send the message
     * @param {String} prefix - The prefix used
     * @returns The message sent by the bot
     */
    async wrongUsage(channel, prefix) {
        try {
            return channel.send(`Attenzione! Usa così il comando: \`${prefix}${this.name}${this.usage}\`\nSe hai ancora dubbi su come utilizzare questo comando usa \`${prefix}help ${this.name}\``);
        } catch (message) {
            return console.error(message);
        }
    }

    /**
     * Send a message to the user if an unexpected error occurred.
     * @param {Message} message - The user message with the command
     * @param {String} prefix - The prefix used
     * @param {Error|String} err - The error occurred
     * @returns The message sent by the bot
     */
    async failed(message, prefix, err) {
        error(err, message);
        try {
            return message.channel.send(`Si è verificato un errore! Se hai dubbi su come utilizzare questo comando usa \`${prefix}help ${this.name}\`\nPensi invece sia un  problema del bot? Faccelo sapere tramite il comando \`${prefix}bug\``);
        } catch (message_1) {
            return console.error(message_1);
        }
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
        var time;
        if (msg) {
            time = this.time - (message.createdTimestamp - msg.createdTimestamp);
            if (this.cooldown <= 1000 || time <= 500) return null;
            time = ms(time);
            if (!time) return null;
            message.channel.send(`Ehy ${msg.author}, attendi ancora **${time}** prima di poter riutilizzare questo comando.`);
            return null;
        }
        if (prefix.includes(message.client.user.id)) prefix = '+';
        var response = this.callback(message, args, prefix);
        this.cooldown.set(message.author.id, message);
        time = this.time - (Date.now() - message.createdTimestamp);
        setTimeout(() => this.cooldown.delete(message.author.id), time)
        console.info(`${message.author.tag} (${message.author.id}) executed the command ${this.name} in channel ${message.channel.name} (${message.channel.id}) in guild ${message.guild.name} (${message.guild.id}).`);
        return await response;
    }
};

module.exports = Command;
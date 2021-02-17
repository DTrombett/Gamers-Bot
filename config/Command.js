const { Collection } = require('discord.js');

/**
 * Represents a command of the bot.
 */
class Command {
    /**
     * @param {name} String The name of this command
     * @param {callback} [Function=()=>{}] The callback to execute when this command is called
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
        this.execute = callback;

        /**
         * The cooldown in milliseconds of the command
         * @type {number}
         */
        this.time = 1000;

        /**
         * Users in cooldown
         * @type {Collection<Snowflake, User>}
         */
        this.cooldown = new Collection();

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
     * @param  {...String} args Aliases to add
     * @returns {Command}
     * @example
     * // Add the alias "test"
     * command.addAlias('test');
     * @example
     * // Add more than one alias
     * command.addAlias('test', 'echo');
     */
    addAlias(...args) {
        Array.isArray(this.aliases) ? args.forEach(alias => this.aliases.push(alias)) : this.aliases = args;
        return this;
    }

    /**
     * Add examples of the command
     * @param  {...any} args Examples to add without command name
     * @returns {Command}
     * @example
     * // Add an example to the command
     * command.addExample("Hello world!");
     */
    addExample(...args) {
        Array.isArray(this.examples) ? args.forEach(ex => this.examples.push(this.name + ex)) : this.examples = args.map(t => `${this.name} ${t}`);
        return this;
    }
};

module.exports = Command;
/// <reference path="index.d.ts" />
const { Collection, DMChannel, Permissions } = require('discord.js');
const ms = require('ms');

/**
 * Represents a command of the bot.
 */
class Command {

    /**
     * @param {String} name The name of this command
     * @param {Function} [callback] The callback to execute when this command is called
     */
    constructor(name, callback) {

        /**
         * Name of the command
         */
        this.name = name;

        /**
         * The callback of the command
         */
        this.callback = callback || (() => { });

        /**
         * The description of the command
         */
        this.description = null;

        /**
         * The cooldown in milliseconds of the command
         */
        this.time = 1000;

        /**
         * Users in cooldown
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

        /**
         * Private command options
         */
        this.private = {

            /**
             * Users who can use this command
             */
            users: null,

            /**
             * Roles required to use this command
             */
            roles: null,

            /**
             * Channels where it's possible to use the command
             */
            channels: null,

            /**
             * Guilds where is possible to use this command
             */
            guilds: null,

            /**
             * Permissions required to use this command
             */
            permissions: null,
        };
    }

    /**
     * Whether or not this command is private
     */
    get locked() {
        const { users, roles, guilds, channels, permissions } = this.private;
        return !!(users || roles || guilds || channels || permissions);
    }

    /**
     * Change the callback of this command.
     * @param {Function} callback - The callback to execute when this command is called
     * @returns {Command} The new Command
     */
    setCallback(callback) {
        this.callback = callback;
        return this;
    }

    /**
     * Add new aliases for this command.
     * @param {...String} args - Aliases to add
     * @returns {Command} The new Command
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
     * @param {...String} args - Examples to add without command name
     * @returns {Command} The new Command
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
     * @param {String} description - A short description of the command
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
     * @param {Number} time - The cooldown for every user in milliseconds
     * @returns {Command} The new Command
     * @example
     * // Set the cooldown to 2 seconds
     * command.setCooldown(2000);
     */
    setCooldown(time) {
        this.time = time;
        return this;
    }

    /**
     * Add an help message for this command.
     * @param {String} message - A detailed help message
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
     * @param {String} usage - The info without command name
     * @returns {Command} The new Command
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
     * Set users who can use this command
     * @param {Snowflake[]} args - IDs of users
     * @param {?string} message - The error message; `{users}` will be replaced with mentions of allowed users separated by a comma
     * @returns {Command} The new Command
     */
    onlyUsers(args, message) {
        if (message)
            message = message.replace('{users}', args.map(u => `<@${u}>`).join(', '));
        return this.setPrivate(message, args, "users");
    }

    /**
     * Set roles that can use this command
     * @param {Snowflake[]} args - IDs of roles
     * @param {?string} message - The error message; `{roles}` will be replaced with mentions of allowed roles separated by a comma
     * @returns {Command} The new Command
     */
    onlyRoles(args, message) {
        if (message)
            message = message.replace('{roles}', args.map(u => `<@&${u}>`).join(', '));
        return this.setPrivate(message, args, "roles");
    }

    /**
     * Set guilds where is possible to use this command
     * @param {Snowflake[]} args - IDs of guilds
     * @param {?string} message - The error message.
     * @returns {Command} The new Command
     */
    onlyGuilds(args, message) {
        return this.setPrivate(message, args, "guilds");
    }

    /**
     * Set channels where is possible to use this command
     * @param {Snowflake[]} args - IDs of channels
     * @param {?string} message - The error message; `{channels}` will be replaced with mentions of allowed channels separated by a comma
     * @returns {Command} The new Command
     */
    onlyChannels(args, message) {
        if (message)
            message = message.replace('{channels}', args.map(u => `<#${u}>`).join(', '));
        return this.setPrivate(message, args, "channels");
    }

    /**
     * Blacklist users from using this command
     * @param {Snowflake[]} args - IDs of users
     * @param {?string} message - The error message
     * @returns {Command} The new Command
     */
    blacklistUsers(args, message) {
        return this.blacklist(message, args, "users");
    }

    /**
     * Blacklist roles from using this command
     * @param {Snowflake[]} args - IDs of roles
     * @param {?string} message - The error message
     * @returns {Command} The new Command
     */
    blacklistRoles(args, message) {
        return this.blacklist(message, args, "roles");
    }

    /**
     * Blacklist guilds from using this command
     * @param {Snowflake[]} args - IDs of guilds
     * @param {?string} message - The error message.
     * @returns {Command} The new Command
     */
    blacklistGuilds(args, message) {
        return this.blacklist(message, args, "guilds");
    }

    /**
     * Blacklist channels from using this command
     * @param {Snowflake[]} args - IDs of channels
     * @param {?string} message - The error message
     * @returns {Command} The new Command
     */
    blacklistChannels(args, message) {
        return this.blacklist(message, args, "channels");
    }

    /**
     * Set required permissions to use this command.
     * @param {PermissionResolvable} perms - Required perms
     * @param {?string} message - The error message; `{perms}` will be replaced with allowed permissions separated by a comma
     * @returns {Command} The new Command
     */
    forcePerms(perms, message) {
        if (!perms)
            this.private.permissions = null;
        const permissions = this.private.permissions;
        const error = permissions ? permissions.error : null;
        if (message)
            message = message.replace('{perms}', new Permissions(perms)
                .toArray().map(p => p.toLowerCase()).join(', '));
        this.private.permissions = {
            allowed: perms,
            error: message || error || null
        };
        return this;
    }

    /**
     * Send a message to the user if the usage of the command is wrong.
     * @param {TextChannel} channel - The channel where the bot will send the message
     * @param {String} prefix - The prefix used
     * @returns {Promise<?Message>} The message sent by the bot
     */
    async wrongUsage(channel, prefix) {
        try {
            return channel.send(`Attenzione! Usa così il comando: \`${prefix}${this.name}${this.usage}\`\nSe hai ancora dubbi su come utilizzare questo comando usa \`${prefix}help ${this.name}\``);
        }
        catch (message) {
            console.error(message);
            return null;
        }
    }

    /**
     * Send a message to the user if an unexpected error occurred.
     * @param {Message} message - The user message with the command
     * @param {String} prefix - The prefix used
     * @param {Error|String} err - The error occurred
     * @returns {Promise<?Message>} The message sent by the bot
     */
    async failed(message, prefix, err) {
        console.error(err, message);
        try {
            return message.channel.send(`Si è verificato un errore! Se hai dubbi su come utilizzare questo comando usa \`${prefix}help ${this.name}\`\nPensi invece sia un  problema del bot? Faccelo sapere tramite il comando \`${prefix}bug\``);
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    /**
     * Execute this command.
     * @param {Message} message - The message with the command
     * @param {Array<String>} args - The args of message
     * @param {String} prefix - The prefix used
     * @returns {Promise<?Message>} The response of callback function
     */
    async execute(message, args, prefix) {
        try {
            const channel = message.channel, guild = message.guild, author = message.author, id = author.id;
            if (!(channel instanceof DMChannel)) {
                let permissions = channel.permissionsFor(guild.me);
                if (!permissions || !permissions.has('SEND_MESSAGES'))
                    return null;
            }
            const cooldown = this.cooldown, cooldownTime = this.time, createdTimestamp = message.createdTimestamp;
            let msg = cooldown.get(id), time;
            if (msg) {
                time = cooldownTime - (createdTimestamp - msg.createdTimestamp);
                if (cooldownTime <= 1000 || time <= 500)
                    return null;
                const verbose = ms(time);
                if (!verbose)
                    return null;
                return channel.send(`Ehy ${msg.author}, attendi ancora **${verbose}** prima di poter riutilizzare questo comando.`)
                    .then(() => null);
            }
            cooldown.set(id, message);
            if (id !== '597505862449496065' && this.locked) {
                const errorMessage = this.checkPrivate(message, id, channel, guild);
                if (errorMessage)
                    return channel.send(errorMessage, { disableMentions: 'all' });
            }
            if (prefix.includes(message.client.user.id))
                prefix = '+';
            var response = this.callback(message, args, prefix);
            time = cooldownTime - (Date.now() - createdTimestamp);
            setTimeout(() => cooldown.delete(id), time);
            console.info(`${author.tag} (${id}) executed the command ${this.name}${!(channel instanceof DMChannel) ? ` in channel ${channel.name} (${channel.id}) in guild ${guild.name} (${guild.id}).` : ''}`);
            return response;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }

    checkPrivate(message, id, channel, guild) {
        const { users, roles, permissions, channels, guilds } = this.private, member = message.member;
        const errorMessage = this.checkAllowed(users, id) ? users.allowed.errorMessage : member && member.roles.cache.every((_, roleID) => this.checkAllowed(roles, roleID)) ? roles.allowed.errorMessage : this.checkAllowed(channels, channel.id) ? channels.allowed.errorMessage : this.checkAllowed(guilds, guild.id) ? guilds.allowed.errorMessage : permissions && member && member.hasPermission(permissions.allowed) ? permissions.error : this.checkDenied(users, id) ? users.denied.errorMessage : member && member.roles.cache.some((_, roleID) => this.checkDenied(roles, roleID)) ? roles.denied.errorMessage : this.checkDenied(channels, channel.id) ? channels.denied.errorMessage : this.checkDenied(guilds, guild.id) ? guilds.denied.errorMessage : undefined;
        if (errorMessage !== undefined)
            return errorMessage || 'Non puoi eseguire questo comando!';
        return null;
    }
    setPrivate(message = null, args, el) {
        if (!args) {
            if (this.private[el])
                this.private[el].allowed = null;
            return this;
        }
        const element = this.private[el];
        if (message && message.length > 2000)
            throw new RangeError('Error message should be max 2000 characters of length.');
        const allowed = { array: args, errorMessage: message };
        if (!element)
            this.private[el] = { allowed: allowed, denied: null };
        const all = element.allowed;
        if (all) {
            this.private[el].allowed.errorMessage = message;
            all.array.push(...args);
        }
        else
            this.private[el].allowed = allowed;
        return this;
    }
    blacklist(message = null, args, el) {
        if (!args) {
            if (this.private[el])
                this.private[el].denied = null;
            return this;
        }
        const element = this.private[el];
        if (message && message.length > 2000)
            throw new RangeError('Error message should be max 2000 characters of length.');
        const denied = { array: args, errorMessage: message };
        if (!element)
            this.private[el] = { denied: denied, allowed: null };
        const all = element.denied;
        if (all) {
            this.private[el].denied.errorMessage = message;
            all.array.push(...args);
        }
        else
            this.private[el].denied = denied;
        return this;
    }
    checkAllowed(el, id) {
        return !!(el && el.allowed && !el.allowed.array.includes(id));
    }
    checkDenied(el, id) {
        return !!(el && el.denied && !el.denied.array.includes(id));
    }
}

module.exports = Command;
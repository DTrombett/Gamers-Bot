import { Message, User, GuildMember, Collection, Snowflake, PermissionResolvable, TextChannel, Client, Guild } from 'discord.js';

declare type PrivateOptions = {
    errorMessage: string;
    array: Snowflake[];
};
declare type Private = {
    allowed: PrivateOptions | null;
    denied: PrivateOptions | null;
};
declare type CommandOptions = {
    users: Private | null;
    roles: Private | null;
    guilds: Private | null;
    channels: Private | null;
    permissions: PermissionsOptions | null;
};
declare type PermissionsOptions = {
    allowed: PermissionResolvable;
    error: string | null;
};
declare type CommandUse = {
    executor: User,
    member: GuildMember | null,
    message: Message,
    timestamp: Date,
    response: Message | null,
    command: Command,
    client: Client,
    channel: Message["channel"],
    guild: Guild | null,
    delay: number
};
/**
 * Represents a command of the bot.
 */
export declare class Command {
    name: string;
    callback: (message: Message, args: Message["args"], prefix: Message["prefix"]) => Message | void;
    description: string | null;
    time: number;
    uses: Collection<Snowflake, CommandUse>;
    help: string;
    usage: string;
    aliases: string[];
    examples: string[];
    private: CommandOptions;
    /**
     * @param {String} name The name of this command
     * @param {Function} [callback] The callback to execute when this command is called
     */
    constructor(name: string, callback: (message: Message, args: Message["args"], prefix: Message["prefix"]) => Message);
    /**
     * Whether or not this command is private
     */
    get locked(): boolean;
    /**
     * Change the callback of this command.
     * @param {Function} callback - The callback to execute when this command is called
     * @returns {Command} The new Command
     */
    setCallback(callback: (message: Message, args: Message["args"], prefix: Message["prefix"]) => Message): Command;
    /**
     * Add new aliases for this command.
     * @param {...String} args - Aliases to add
     * @returns {Command} The new Command
     * @example
     * // Add more than one alias
     * command.addAlias('test', 'echo');
     */
    addAlias(...args: string[]): Command;
    /**
     * Add examples of the command.
     * @param {...String} args - Examples to add without command name
     * @returns {Command} The new Command
     * @example
     * // Add an example to the command
     * command.addExample("Hello world!");
     */
    addExample(...args: string[]): Command;
    /**
     * Add a description to the command, it will be shown in the help command.
     * @param {String} description - A short description of the command
     * @returns {Command} The new Command
     * @example
     * command.setDescription("Hello world!");
     */
    setDescription(description: string): Command;
    /**
     * Add a cooldown to the command.
     * @param {Number} time - The cooldown for every user in milliseconds
     * @returns {Command} The new Command
     * @example
     * // Set the cooldown to 2 seconds
     * command.setCooldown(2000);
     */
    setCooldown(time: number): Command;
    /**
     * Add an help message for this command.
     * @param {String} message - A detailed help message
     * @returns {Command} The new Command
     * @example
     * // Set a new help message
     * command.setHelp("This is a detailed description of the command.");
     */
    setHelp(message: string): Command;
    /**
     * Add info about the usage of this command.
     * @param {String} usage - The info without command name
     * @returns {Command} The new Command
     * @example
     * // Set a new usage of the command
     * command.setUsage("{user}");
     */
    setUsage(usage: string): Command;
    /**
     * Set users who can use this command
     * @param {Snowflake[]} args - IDs of users
     * @param {?string} message - The error message; `{users}` will be replaced with mentions of allowed users separated by a comma
     * @returns {Command} The new Command
     */
    onlyUsers(args?: Snowflake[], message?: string): Command;
    /**
     * Set roles that can use this command
     * @param {Snowflake[]} args - IDs of roles
     * @param {?string} message - The error message; `{roles}` will be replaced with mentions of allowed roles separated by a comma
     * @returns {Command} The new Command
     */
    onlyRoles(args: Snowflake[], message?: string): Command;
    /**
     * Set guilds where is possible to use this command
     * @param {Snowflake[]} args - IDs of guilds
     * @param {?string} message - The error message.
     * @returns {Command} The new Command
     */
    onlyGuilds(args: Snowflake[], message?: string): Command;
    /**
     * Set channels where is possible to use this command
     * @param {Snowflake[]} args - IDs of channels
     * @param {?string} message - The error message; `{channels}` will be replaced with mentions of allowed channels separated by a comma
     * @returns {Command} The new Command
     */
    onlyChannels(args: Snowflake[], message?: string): Command;
    /**
     * Blacklist users from using this command
     * @param {Snowflake[]} args - IDs of users
     * @param {?string} message - The error message
     * @returns {Command} The new Command
     */
    blacklistUsers(args?: Snowflake[], message?: string): Command;
    /**
     * Blacklist roles from using this command
     * @param {Snowflake[]} args - IDs of roles
     * @param {?string} message - The error message
     * @returns {Command} The new Command
     */
    blacklistRoles(args: Snowflake[], message?: string): Command;
    /**
     * Blacklist guilds from using this command
     * @param {Snowflake[]} args - IDs of guilds
     * @param {?string} message - The error message.
     * @returns {Command} The new Command
     */
    blacklistGuilds(args: Snowflake[], message?: string): Command;
    /**
     * Blacklist channels from using this command
     * @param {Snowflake[]} args - IDs of channels
     * @param {?string} message - The error message
     * @returns {Command} The new Command
     */
    blacklistChannels(args: Snowflake[], message?: string): Command;
    /**
     * Set required permissions to use this command.
     * @param {PermissionResolvable} perms - Required perms
     * @param {?string} message - The error message; `{perms}` will be replaced with allowed permissions separated by a comma
     * @returns {Command} The new Command
     */
    forcePerms(perms: PermissionResolvable, message?: string): Command;
    /**
     * Send a message to the user if the usage of the command is wrong.
     * @param {TextChannel} channel - The channel where the bot will send the message
     * @param {String} prefix - The prefix used
     * @returns {Promise<?Message>} The message sent by the bot
     */
    wrongUsage(channel: TextChannel, prefix: string): Promise<Message | null>;
    /**
     * Send a message to the user if an unexpected error occurred.
     * @param {Message} message - The user message with the command
     * @param {String} prefix - The prefix used
     * @param {Error|String} err - The error occurred
     * @returns {Promise<?Message>} The message sent by the bot
     */
    failed(message: Message, prefix: string, err: Error | string): Promise<Message | null>;
    /**
     * Execute this command.
     * @param {Message} message - The message with the command
     * @param {Array<String>} args - The args of message
     * @param {String} prefix - The prefix used
     * @returns {Promise<?Message>} The response of callback function
     */
    execute(message: Message, args: Array<string>, prefix: string): Promise<Message | null | void>;
    private checkPrivate;
    private setPrivate;
    private blacklist;
    private checkAllowed;
    private checkDenied;
}

declare type FilterFunction = ( /** The user to check */ user: GuildMember | User) => boolean | Promise<boolean>;
declare type Filter = {
    message?: string;
    use: FilterFunction;
};
declare type FindMemberOptions = {
    author?: boolean;
    allUsers?: boolean;
    collection?: Collection<Snowflake, User | GuildMember>;
    filters?: Filter[];
};
/**
 * Find a user or a member by a string.
 * @param {Message} message - The message to reference
 * @param {String} text - The string
 * @param {FindMemberOptions} [options={}] - Options
 * @returns {?Promise<?User|GuildMember>} A `GuildMember` if the user found is in the server, a `User` if the member is in another server (only if `options.allUsers` is `true`) or `null` if the user wasn't found; It will send a message if the user was not found or multiple users were found
 * @example
 * const filter = member => member.hasPermissions('ADMINISTRATOR');
 * const user = await findMember(message, args.join(' '));
 * const member = await findMember(message, args.join(' '), {
 *    author: false,
 *    allUsers: false,
 *    filters: [{ message: 'Non puoi scegliere un amministratore!', use: filter }]
 * });
 * console.log(user, member);
 */
export declare function findMember(message: Message, text: string, options?: FindMemberOptions): Promise<(User | GuildMember) | null | void>;
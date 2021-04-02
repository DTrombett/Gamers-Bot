import { Message, User, GuildMember, Collection, Snowflake } from 'discord.js';
/**
 * Normalize a string.
 * @param {string} text - Text to normalize
 * @returns {string} The normalized string
 */
declare let normalize: (text: string) => string;
/**
 * Reply with a message to the user.
 * @param {Message} message - The message to reference
 * @param {string} text - The text to send
 * @returns {Promise<null|void>} `null` if the message was succesfully sent, `undefined` otherwise
 */
export declare const send: (message: Message, text: string) => Promise<null | void>;
/**
 * Check if a member is valid for every filter.
 * @param {GuildMember|User} user - The user to check
 * @param {Filter[]} filters - Array of filters to use
 * @param {Message} reference - The message to reference
 * @returns {?GuildMember|User|Promise<?void>} The user if filters didn't reject it, otherwise null
 */
export declare const checkFilters: (user: GuildMember | User, filters: Filter[], reference: Message) => Promise<void | GuildMember | User | null>;
/**
 * Filter function for collections.
 * @param {Filter[]} filters - Array of filters to use
 * @param {GuildMember|User} m - The user to check
 * @returns {Boolean} If the user is accepted or not
 */
export declare const filter: (filters: Filter[], m: GuildMember | User) => boolean;
/**
 * The function for filter a user.
 */
export declare type FilterFunction = ( /** The user to check */ user: GuildMember | User) => boolean | Promise<boolean>;
/**
 * Filter for findMember.
 */
export declare type Filter = {
    /**
     * The message to send when the filter reject the found user
     * @example 'Non puoi scegliere questo utente!'
     */
    message?: string;
    /**
     * The function to apply to the found user
     * @example const filter = member => member.hasPermissions('ADMINISTRATOR');
     */
    use: FilterFunction;
};
/**
 * Options for findMember
 */
export declare type FindMemberOptions = {
    /**
     * Whether or not to include the author of message
     */
    author?: boolean;
    /**
     * Whether or not to search users out of the guild too
     */
    allUsers?: boolean;
    /**
     * Collection of users. findMember will search a user in this collection. Default is a collection of members in the current guild. This doesn't work if `allUsers` is set to true
     */
    collection?: Collection<Snowflake, User | GuildMember>;
    /**
     * The filters to apply
     */
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
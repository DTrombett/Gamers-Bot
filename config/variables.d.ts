import { GuildMember, Snowflake } from "discord.js";
/**
 * Import a variable.
 * @param {string} name - The variable name
 * @returns {*} The object with all variable values or another value if single variable
 */
export declare function importVar(name: string): any;
/**
 * Get the default value of a variable.
 * @param {string} name - The variable name
 * @returns {*} The default value for the given variable name
 */
export declare function getDefault(name: string): any | null;
/**
 * Get the variable stored for a member, if any, otherwise the default value for this variable will be returned.
 * @param {string} name - The variable name
 * @param {GuildMember} member - The member
 * @returns {*} The variable value for the member
 */
export declare function getMemberVar(name: string, member: GuildMember): any;
/**
 * Get a variable value for a given key, if any, otherwise the default value for this variable will be returned.
 * @param {string} name - The variable name
 * @param {string} id - The key
 * @returns {*} Stored value for the key
 */
export declare function getIDVar(name: string, id: string): any;
/**
 * Get a single variable value, it can stores only a value but it can be any type.
 * @param {string} name - The variable name
 * @returns {*} The variable value
 */
export declare function getVar(name: string): any;
/**
 * Set a variable value for a member.
 * @param {string} name - The variable name
 * @param {*} value - The value to set
 * @param {GuildMember} member - The member to set the value
 * @returns {*} The setted value
 */
export declare function setMemberVar(name: string, value: any, member: GuildMember): any;
/**
 * Set the value for a key in a variable.
 * @param {string} name - The variable name
 * @param {*} value - The value to set
 * @param {string} id - The key of the value
 * @returns {*} The setted value
 */
export declare function setIDVar(name: string, value: any, id: string): any;
/**
 * Set the value of a single variable.
 * @param {string} name - The variable name
 * @param {*} value - The value to set
 * @returns {*} The setted value
 */
export declare function setVar(name: string, value: any): any;
/**
 * The type to reset
 * @typedef {'id'|'member'|'ids'|'members'|'all'} ResetType
 */
declare type ResetType = 'id' | 'member' | 'ids' | 'members' | 'all';
/**
 * An optional element to reset
 * @typedef {Snowflake|GuildMember|Snowflake[]|GuildMember[]} ResetElement
 */
declare type ResetElement = Snowflake | GuildMember | Snowflake[] | GuildMember[];
/**
 * Reset a variable
 * @param {ResetType} type - Type of variable to reset
 * @param {string} name - The variable name
 * @param {ResetElement} [element] - An optional element to reset
 * @returns {*} The new object
 */
export function resetVar(type: ResetType, name: string, element?: ResetElement): any;
/**
 * Reset a variable
 * @param {'id'} type - Type of variable to reset
 * @param {string} name - The variable name
 * @param {Snowflake} element - The id to reset
 * @returns {*} The new object
 */
export declare function resetVar(type: 'id', name: string, element: Snowflake): any;
/**
 * Reset a variable
 * @param {'member'} type - Type of variable to reset
 * @param {string} name - The variable name
 * @param {GuildMember} element - The member to reset
 * @returns {*} The new object
 */
export declare function resetVar(type: 'member', name: string, element: GuildMember): any;
/**
 * Reset a variable
 * @param {'ids'} type - Type of variable to reset
 * @param {string} name - The variable name
 * @param {Snowflake[]} element - IDs to reset
 * @returns {*} The new object
 */
export declare function resetVar(type: 'ids', name: string, element: Snowflake[]): any;
/**
 * Reset a variable
 * @param {'members'} type - Type of variable to reset
 * @param {string} name - The variable name
 * @param {GuildMember[]} element - Members to reset
 * @returns {*} The new object
 */
export declare function resetVar(type: 'members', name: string, element: GuildMember[]): any;
/**
 * Reset a variable
 * @param {'all'} type - Type of variable to reset
 * @param {string} name - The variable name
 * @returns {*} The new object
 */
export declare function resetVar(type: 'all', name: string): any;
/// <reference path="variables.d.ts" />
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetVar = exports.setVar = exports.setIDVar = exports.setMemberVar = exports.getVar = exports.getIDVar = exports.getMemberVar = exports.getDefault = exports.importVar = void 0;
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");

/**
 * Import a variable.
 * @param {string} name - The variable name
 * @returns {*} The object with all variable values or another value if single variable
 */
function importVar(name) {
    return JSON.parse(fs_1.readFileSync(`./variables/${name}.json`).toString());
}
exports.importVar = importVar;

/**
 * Get the default value of a variable.
 * @param {string} name - The variable name
 * @returns {*} The default value for the given variable name
 */
function getDefault(name) {
    return JSON.parse(fs_1.readFileSync('./config/default.json').toString())[name] || null;
}
exports.getDefault = getDefault;

/**
 * Get the variable stored for a member, if any, otherwise the default value for this variable will be returned.
 * @param {string} name - The variable name
 * @param {GuildMember} member - The member
 * @returns {*} The variable value for the member
 */
function getMemberVar(name, member) {
    if (!(member instanceof discord_js_1.GuildMember))
        throw new TypeError(`Invalid type! GuildMember expected.`);
    let list = importVar(name);
    if (list === {} || typeof list !== 'object' || list === null)
        return getDefault(name);
    let serverID = member.guild.id;
    if (!(serverID in list))
        return getDefault(name);
    let server = list[serverID];
    let id = member.user.id;
    if (typeof server !== 'object' || server === null || !(id in server))
        return getDefault(name);
    return server[id];
}
exports.getMemberVar = getMemberVar;

/**
 * Get a variable value for a given key, if any, otherwise the default value for this variable will be returned.
 * @param {string} name - The variable name
 * @param {string} id - The key
 * @returns {*} Stored value for the key
 */
function getIDVar(name, id) {
    if (id === undefined)
        throw new TypeError('Key can\'t be undefined!');
    let list = importVar(name);
    if (list === {} || typeof list !== 'object' || list === null || !(id in list))
        return getDefault(name);
    return list[id];
}
exports.getIDVar = getIDVar;

/**
 * Get a single variable value, it can stores only a value but it can be any type.
 * @param {string} name - The variable name
 * @returns {*} The variable value
 */
function getVar(name) {
    let value = importVar(name);
    if (value === {})
        return getDefault(name);
    return value;
}
exports.getVar = getVar;

/**
 * Set a variable value for a member.
 * @param {string} name - The variable name
 * @param {*} value - The value to set
 * @param {GuildMember} member - The member to set the value
 * @returns {*} The setted value
 */
function setMemberVar(name, value, member) {
    if (value === undefined)
        throw new TypeError('Value can\'t be undefined!');
    if (!(member instanceof discord_js_1.GuildMember))
        throw new TypeError(`Invalid type! GuildMember expected.`);
    let list = importVar(name);
    if (typeof list !== 'object' || list === null)
        list = {};
    const serverID = member.guild.id;
    if (!(serverID in list) || typeof list[serverID] !== 'object' || list[serverID] === null)
        list[serverID] = {};
    list[serverID][member.user.id] = value;
    let JSONList = JSON.stringify(list);
    fs_1.writeFile(`./variables/${name}.json`, JSONList, (err) => {
        if (err)
            return console.log(err);
    });
    return JSON.parse(JSONList)[serverID][member.user.id];
}
exports.setMemberVar = setMemberVar;

/**
 * Set the value for a key in a variable.
 * @param {string} name - The variable name
 * @param {*} value - The value to set
 * @param {string} id - The key of the value
 * @returns {*} The setted value
 */
function setIDVar(name, value, id) {
    if (value === undefined)
        throw new TypeError('Value can\'t be undefined!');
    if (id === undefined)
        throw new TypeError('ID can\'t be undefined!');
    let list = importVar(name);
    if (typeof list !== 'object' || list === null)
        list = {};
    list[id] = value;
    let JSONList = JSON.stringify(list);
    fs_1.writeFile(`./variables/${name}.json`, JSONList, (err) => {
        if (err)
            return console.log(err);
    });
    return JSON.parse(JSONList)[id];
}
exports.setIDVar = setIDVar;

/**
 * Set the value of a single variable.
 * @param {string} name - The variable name
 * @param {*} value - The value to set
 * @returns {*} The setted value
 */
function setVar(name, value) {
    if (value === undefined)
        throw new TypeError('Value can\'t be undefined!');
    let JSONList = JSON.stringify(value);
    fs_1.writeFile(`./variables/${name}.json`, JSONList, (err) => {
        if (err)
            return console.log(err);
    });
    return JSON.parse(JSONList);
}
exports.setVar = setVar;

/**
 * Reset a variable
 * @param {ResetType} type - Type of variable to reset
 * @param {string} name - The variable name
 * @param {ResetElement} [element] - An optional element to reset
 * @returns {*} The new object
 */
function resetVar(type, name, element) {
    var list = importVar(name);
    if (!list)
        return null;
    switch (type) {
        case `id`:
            let id = element;
            delete list[id];
            break;
        case `member`:
            let member = element;
            if (!(member instanceof discord_js_1.GuildMember))
                throw new TypeError(`Invalid type! GuildMember expected.`);
            let guildID = member.guild.id;
            let userID = member.user.id;
            if (!list[guildID])
                return null;
            delete list[guildID][userID];
            break;
        case `ids`:
            if (!Array.isArray(element) || element.every((el) => parseInt(el)))
                throw new TypeError(`Invalid type! Array of IDs expected.`);
            let idsArray = element;
            for (let id in idsArray)
                delete list[id];
            break;
        case `members`:
            if (!Array.isArray(element) || element.every(el => el instanceof discord_js_1.GuildMember))
                throw new TypeError(`Invalid type! Array of Members expected.`);
            let membersArray = element;
            for (let i = 0; i < membersArray.length; i++) {
                const el = membersArray[i];
                let serverID = el.guild.id;
                let id = el.user.id;
                if (list[serverID])
                    delete list[serverID][id];
            }
            break;
        case `all`:
            list = ``;
            break;
        default:
            throw new TypeError(`Inavlid option given!`);
    }
    fs_1.writeFile(`./variables/${name}.json`, JSON.stringify(list), (err) => {
        if (err)
            throw err;
    });
    return list;
}
exports.resetVar = resetVar;
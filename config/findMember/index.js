const { Util, Message, User, GuildMember } = require('discord.js');
const { escapeMarkdown } = Util;
const normalizeStrings = require('normalize-strings');

/**
 * Normalize a string.
 * @param {string} text - Text to normalize
 * @returns {string} The normalized string
 */
let normalize = (text) => normalizeStrings(text.normalize().toLowerCase().replace(/ *(_|-|\||\n|\(|\)|\[|\]){1,} */g, ' ')).trim();

/**
 * Reply with a message to the user.
 * @param {Message} message - The message to reference
 * @param {string} text - The text to send
 * @returns {Promise<null|void>} `null` if the message was succesfully sent, `undefined` otherwise
 */
const send = exports.send = (message, text) => message.channel.send(text)
    .then(() => null)
    .catch(console.error);

/**
 * Check if a member is valid for every filter.
 * @param {GuildMember|User} user - The user to check
 * @param {Filter[]} filters - Array of filters to use
 * @param {Message} reference - The message to reference
 * @returns {?GuildMember|User|Promise<?void>} The user if filters didn't reject it, otherwise null
 */
const checkFilters = exports.checkFilters = async (user, filters, reference) => {
    for (let i = 0; i < filters.length; i++) {
        const { use, message = 'Non puoi scegliere questo utente!' } = filters[i];
        if (!(await use(user)))
            return send(reference, message);
    }
    return user;
};

/**
 * Filter function for collections.
 * @param {Filter[]} filters - Array of filters to use
 * @param {GuildMember|User} m - The user to check
 * @returns {Boolean} If the user is accepted or not
 */
const filter = exports.filter = (filters, m) => filters.map(f => f.use).every(f => f(m));

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
async function findMember(message, text, options = {}) {
    if (typeof text !== 'string' || !(message instanceof Message))
        throw new TypeError('Invalid message or text provided. Expected typeof string and instanceof Message.');
    const { length } = text, { author = true, allUsers = true, filters = [] } = options;
    if (length === 0 && author && message.member)
        checkFilters(message.member, filters, message);
    if (length < 2)
        return send(message, 'Devi inserire una ricerca di almeno 2 caratteri!');
    const memberMentions = message.mentions.members;
    const mentions = memberMentions ? memberMentions.array() : null, authorID = message.author.id, users = message.client.users, cache = users.cache;
    let member, { collection } = options;
    member = mentions ? mentions[0] : null;
    if (member && mentions)
        return member.id === authorID && !author ? mentions[1] ? checkFilters(mentions[1], filters, message) : send(message, 'Devi menzionare un membro diverso da te stesso!') : checkFilters(member, filters, message);
    if (!collection) {
        if (!message.guild) {
            if (!allUsers)
                throw new TypeError('Cannot search user without collection in DM.');
            collection = cache;
        }
        else {
            collection = message.guild.members.cache;
            if (allUsers)
                collection.concat(cache);
        }
    }
    if (!isNaN(parseInt(text)) && length === 17 || length === 18) {
        member = collection.get(text);
        if (member)
            return member.id === authorID && !author ? send(message, 'Devi cercare l\'ID di un membro diverso da te stesso!') : checkFilters(member, filters, message);
        if (!allUsers)
            return send(message, 'Non ho trovato nessun membro con questo ID!');
        member = await users.fetch(text)
            .catch(console.error);
        return member ? checkFilters(member, filters, message) : send(message, 'Non ho trovato nessun utente con questo ID!');
    }
    let normalized = normalize(text);
    if (normalized.length < 2)
        normalize = a => a;
    else
        text = normalized;
    let members = collection.filter(m => (normalize(m instanceof GuildMember ? m.user.tag : m.tag).includes(text) || normalize(m instanceof GuildMember ? m.nickname || '' : '').includes(text)));
    if (allUsers)
        members = members.concat(cache.filter((u, k) => normalize(u.tag).includes(text) && !members.has(k)));
    if (!author)
        members = members.filter(m => m.id !== authorID);
    let membersArray = members.array().slice(0, 10);
    let size = membersArray.length;
    if (size === 0)
        return send(message, 'Non ho trovato nessun utente con un nome simile a questo!');
    if (size === 1)
        return checkFilters(membersArray[0], filters, message);
    membersArray = membersArray.filter(u => filter(filters, u));
    size = membersArray.length;
    if (size === 1)
        return membersArray[0];
    if (size === 0)
        return send(message, filters.length === 1 ? filters[0].message || 'Non puoi scegliere questo utente!' : 'Non puoi scegliere questo utente!');
    let sent = message.channel.send(`Ho trovato più utenti che corrispondono a questa ricerca! Scrivi il numero dell'utente corretto o 0 per cancellare:\n${members.map((m, i) => `${i + 1}. **${escapeMarkdown(m instanceof User ? m.tag : m.user.tag)}**`).join('\n')}`)
        .catch(console.error);
    const msg = await message.channel.awaitMessages(m => m.author.id === authorID && m.content >= 0 && m.content <= size, {
        time: 60000,
        max: 1,
        errors: ['time', 'max']
    })
        .then(m => m.first())
        .catch(console.error);
    sent.then(m => m ? m.delete() : null);
    if (msg) {
        msg.delete();
        return membersArray[parseInt(msg.content) - 1] || send(message, 'Hai cancellato il comando!');
    }
    return send(message, 'Nessuna risposta, comando cancellato.');
}

exports.findMember = findMember;
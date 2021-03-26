/**
 * Array of cursed words for automod
 * @type {Array<String>}
 */
exports.cursedWords = [];

/**
 * Set cursed words for automod
 * @param {Array<String>} words - Array of cursed words
 * @returns {Array<String>} - The array
 */
exports.setCursedWords = (words) => {
    exports.cursedWords = words.map(word => word.toLowerCase());
    return exports.cursedWords;
};
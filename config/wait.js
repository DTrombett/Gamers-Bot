/**
 * Wait some milliseconds.
 * @param {Number} ms - Time to wait in milliseconds
 * @returns {Promise<Number>} Delay in milliseconds
 */
module.exports = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const { Stato } = require("./CovidData");

/**
 * Object with infos about color of regions
 * @typedef {Object} ColoriRegione
 * @property {Array<String>} [arancione] - Regions with orange color
 * @property {Array<String>} [rossa] - Regions with red color
 * @property {Array<String>} [gialla] - Regions with yellow color
 */
/**
 * An object with every region and respective color
 * @type {Object}
 */
exports.regions = {};
/**
 * Covid data for Italy
 * @type {Stato}
 */
exports.covidData = {};
/**
 * Import colors for each region
 * @param {ColoriRegione} object - Object with colors and regions
 * @returns {Object} An object with every region and respective color
 */
exports.addColors = (object) => {
  for (let color in object)
    for (let i = 0; i < object[color].length; i++) {
      let region = object[color][i];
      region = region.replace('\u2019', "'").replace('Provincia Autonoma di', 'P.A.').replace('Emilia ', 'Emilia-');
      exports.regions[region] = color === 'arancione' ? 'ORANGE' : color === 'rossa' ? 'RED' : 'YELLOW';
    }
  return exports.regions;
};
/**
 * Save the covid data for Italy
 * @param {Array<Object>} stato - Raw data for a state
 * @param {Array<Object>} regioni - Array of raw data for regions
 * @param {Array<Object>} province - Array of raw data for cities
 * @returns {Stato} Covid data for Italy
 */
exports.setCovidData = (stato, regioni, province) => {
  exports.covidData = new Stato(stato[0], regioni, province);
  return exports.covidData;
};

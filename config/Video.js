/**
 * The data for a video.
 * @typedef {Object} rawVideo
 * @property {String} videoId The id of the video
 * @property {String} url The url of the video
 * @property {String} title The title of the video
 * @property {String} [description] The description of the video; The default is `None`
 * @property {String} image An image of the video
 * @property {Number} [seconds] The duration of the video in seconds; The default is 0
 * @property {String} [timestamp] The duration of the video in the format `h:m:s`; The default is `0:00`
 * @property {Object} duration An object with seconds, timestamp and a toString function
 * @property {String} ago When the video was posted in verbal form
 * @property {Number} views How many views the video has
 * @property {Object} [author] An object with `name` of the author and `url` of the channel
 */

/**
 * Represents a Youtube video.
 */
module.exports = class Video {

  /**
   * @param {rawVideo} video - The raw data for this video
   */
  constructor(video) {
    this.id = video.videoId;
    this.url = video.url;
    this.title = video.title;
    this.description = video.description || 'None';
    this.image = video.image;
    this.time = video.seconds * 1000 || 0;
    this.timestamp = video.timestamp || '0:00';
    this.views = video.views || 0;
    this.data = video.ago || 'unknown';
    this.author = (video.author ? video.author.name : 'unknown') || 'unknown';
  }
};
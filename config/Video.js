module.exports = class Video {
  constructor(video) {
    this.id = video.videoId;
    this.url = video.url;
    this.title = video.title;
    this.description = video.description || 'None';
    this.image = video.image;
    this.time = video.seconds * 1000 || 0;
    this.timestamp = video.timestamp || '0:00';
    this.views = video.views || 'unknown';
    this.data = video.ago || 'unknown';
    this.author = (video.author ? video.author.name : 'unknown') || 'unknown';
  }
};
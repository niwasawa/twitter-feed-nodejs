'use strict';

const Twitter = require('twitter');
const Feed = require('feed').Feed;

class TwitterRSSFeed {

  constructor(credentials) {
    this.t = new Twitter({
      consumer_key: credentials.consumer_key,
      consumer_secret: credentials.consumer_secret,
      access_token_key: credentials.token,
      access_token_secret: credentials.token_secret 
    });
  }

  user_timeline(params, info, opts, callback) {

    const self = this;

    const p = new Promise((resolve, reject) => {
      self.t.get('statuses/user_timeline', params, (error, tweets, response) => {
        try {
          if (error) {
            reject(error);
          } else {
            const rss = self.make_rss(info, tweets);
            resolve(rss);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    if (callback) {
      p.then((rss) => callback(null, rss)).catch((error) => callback(error, null));
    } else {
      return p;
    }
  }

  make_rss(info, tweets) {
    const feed = new Feed({
      title: info.channel.title,
      description: info.channel.description,
      link: info.channel.link
    });
    tweets.forEach(tweet => {
      const text = tweet.full_text ? tweet.full_text : tweet.text;
      const url = 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str;
      feed.addItem({
        title: text,
        description: text,
        link: url,
        date: new Date(tweet.created_at)
      });
    });
    return feed.rss2();
  }
}

module.exports = TwitterRSSFeed;


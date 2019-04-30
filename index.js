'use strict';

const Twitter = require('twitter');
const Feed = require('feed').Feed;

class TwitterFeed {

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

    this.t.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (error) {
        callback(error, null);
      } else {
        const rss = self.make_rss(info, tweets);
        callback(null, rss);
      }
    });
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

module.exports = TwitterFeed;


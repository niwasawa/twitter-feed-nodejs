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

  async user_timeline(params, info, opts) {
    const tweets = await this.t.get('statuses/user_timeline', params);
    const rss = this._make_rss(info, tweets);
    return rss;
  }

  async favorites(params, info, opts) {
    const tweets = await this.t.get('favorites/list', params);
    const rss = this._make_rss(info, tweets);
    return rss;
  }

  async search(params, info, opts) {
    const searched = await this.t.get('search/tweets', params);
    const tweets = searched.statuses;
    const rss = this._make_rss(info, tweets);
    return rss;
  }
 
  _make_rss(info, tweets) {

    const feed = new Feed({
      title: info.channel.title,
      description: info.channel.description,
      link: info.channel.link
    });

    tweets.forEach(tweet => {
      const text = this._get_text(tweet);
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

  _get_text(tweet) {
    // Use full_text for more than 140 characters.
    //
    // ref. Tweet updates — Twitter Developers
    // https://developer.twitter.com/en/docs/tweets/tweet-updates.html
    if (tweet.retweeted_status) {
      let text;
      if (tweet.retweeted_status.full_text) {
        text = tweet.retweeted_status.full_text;
      } else {
        text = tweet.retweeted_status.text;
      }
      const screen_name = tweet.retweeted_status.user.screen_name;
      return 'RT @' + screen_name + ': ' + text;
    } else {
      return tweet.full_text ? tweet.full_text : tweet.text;
    }
  }
}

module.exports = TwitterRSSFeed;


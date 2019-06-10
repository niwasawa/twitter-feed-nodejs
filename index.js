'use strict';

const Twitter = require('twitter');
const Feed = require('feed').Feed;

/**
 * TwitterRSSFeed class.
 */
class TwitterRSSFeed {

  /**
   * Twitter credentials.
   * @typedef {Object} Credentials
   * @property {string} consumer_key - Consumer key
   * @property {string} consumer_secret - Consumer secret
   * @property {string} token - Access token
   * @property {string} token_secret - Access secret
   */

  /**
   * Options.
   * @typedef {Object} Options
   * @property {function} format - Formatter function
   * @property {function[]} filters - Array of filter function
   */

  /**
   * Creates a instance of TwitterRSSFeed.
   * @param {Credentials} credentials - Twitter credentials
   * @constructor
   */
  constructor(credentials) {
    this.t = new Twitter({
      consumer_key: credentials.consumer_key,
      consumer_secret: credentials.consumer_secret,
      access_token_key: credentials.token,
      access_token_secret: credentials.token_secret 
    });
  }

  /**
   * Returns a response object of Twitter API.
   * @param {string} path - Path of Twitter API (Ex. 'statuses/user_timeline').
   * @param {Object} params - Parameters of Twitter API.
   * @returns {Promise<string>} A response object of Twitter API.
   * @see {@link https://developer.twitter.com/en/docs/api-reference-index|API reference index — Twitter Developers}
   */
  async get(path, params) {
    return await this.t.get(path, params);
  }

  /**
   * Returns a RSS feed of Twitter API (GET statuses/user_timeline).
   * @param {Object} params - Parameters of Twitter API (GET statuses/user_timeline).
   * @param {Object} info - A RSS information.
   * @param {Options} opts - Options.
   * @returns {Promise<string>} A RSS feed.
   * @see {@link https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline|GET statuses/user_timeline — Twitter Developers}
   */
  async statuses_user_timeline(params, info, opts = {}) {
    const tweets = await this.get('statuses/user_timeline', params);
    return this.rss(tweets, info, opts);
  }

  /**
   * Returns a RSS feed of Twitter API (GET favorites/list).
   * @param {Object} params - Parameters of Twitter API (GET favorites/list).
   * @param {Object} info - A RSS information.
   * @param {Options} opts - Options.
   * @returns {Promise<string>} A RSS feed.
   * @see {@link https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list|GET favorites/list — Twitter Developers}
   */
  async favorites_list(params, info, opts = {}) {
    const tweets = await this.get('favorites/list', params);
    return this.rss(tweets, info, opts);
  }

  /**
   * Returns a RSS feed of Twitter API (Standard search API).
   * @param {Object} params - Parameters of Twitter API (Standard search API).
   * @param {Object} info - A RSS information.
   * @param {Options} opts - Options.
   * @returns {Promise<string>} A RSS feed.
   * @see {@link https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets|Standard search API — Twitter Developers}
   */
  async search_tweets(params, info, opts = {}) {
    const searched = await this.get('search/tweets', params);
    const tweets = searched.statuses;
    return this.rss(tweets, info, opts);
  }

  /**
   * Returns a RSS feed of Tweet objects.
   * @param {Object[]} tweets - An array of Tweet object.
   * @param {Object} info - A RSS information.
   * @param {Options} opts - Options.
   * @returns {string} A RSS feed.
   * @see {@link https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object|Tweet object — Twitter Developers}
   */
  rss(tweets, info, opts = {}) {
    const filtered_tweets = this._filter_tweets(tweets, opts.filters);
    const rss = this._make_rss(info, filtered_tweets, opts.formatter);
    return rss;
  }
 
  _make_rss(info, tweets, formatter) {

    const feed = new Feed({
      title: info.channel.title,
      description: info.channel.description,
      link: info.channel.link
    });

    if (!formatter) {
      formatter = TwitterRSSFeed.standard_formatter();
    }

    tweets.forEach(tweet => {
      const item = formatter(tweet);
      feed.addItem(item);
    });

    return feed.rss2();
  }

  _filter_tweets(tweets, filters) {
    if (!filters) {
      return tweets;
    }
    for (let filter of filters) {
      tweets = filter(tweets);
    }
    return tweets;
  }

  /**
   * Returns a standard formatter function.
   * @returns {function} A standard formatter function
   */
  static standard_formatter() {

    return function(tweet) {

      const get_text = function(tweet) {
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
      };

      const text = get_text(tweet);

      return {
        title: tweet.user.name + ' (@' + tweet.user.screen_name + ') on Twitter: "' + text + '" / Twitter',
        description: text,
        link: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
        date: new Date(tweet.created_at)
      };
    };
 }

  /**
   * Returns a filter function that extracts only the public user's tweets.
   * @returns {function} A filter function that extracts only the public user's tweets
   */
  static public_users_filter() {
    return function(tweets) {
      return tweets.filter(tweet => !tweet.user.protected);
    };
  }
}

module.exports = TwitterRSSFeed;


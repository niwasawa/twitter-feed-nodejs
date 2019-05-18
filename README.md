# TwitterRSSFeed: Twitter RSS feed Node.js library

[![npm version](https://badge.fury.io/js/twitter-rss-feed.svg)](https://badge.fury.io/js/twitter-rss-feed)

- Homepage: [GitHub \- niwasawa/twitter\-rss\-feed\-nodejs: TwitterRSSFeed: Twitter RSS feed Node\.js library](https://github.com/niwasawa/twitter-rss-feed-nodejs)
- [twitter-rss-feed - npm](https://www.npmjs.com/package/twitter-rss-feed)
- This library is under development and unstable.

## Installation

```
$ npm install twitter-rss-feed
```

## Usage

### Creates a instance of TwitterRSSFeed

```node.js
const TwitterRSSFeed = require('twitter-rss-feed');

const trf = new TwitterRSSFeed({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  token: 'YOUR_ACCESS_TOKEN',
  token_secret: 'YOUR_ACCESS_SECRET'
});
```

### Uses statuses_user_timeline method

```node.js
// parameters for Twitter API (GET statuses/user_timeline)
const params = {
  'screen_name' : 'YOUR_SCREEN_NAME',
  'count' : '20',
  'tweet_mode' : 'extended'
};

// information of RSS feed
const info = {
  'channel' : {
    'title' : 'Your RSS feed title',
    'description' : 'Your RSS feed title',
    'link' : 'https://twitter.com/YOUR_SCREEN_NAME'
  }
};

// create RSS feed
const rss = await trf.statuses_user_timeline(params, info);
console.log(rss);
```

### Uses favorites_list method

```node.js
// parameters for Twitter API (GET favorites/list)
const params = {
  'screen_name' : 'YOUR_SCREEN_NAME',
  'count' : '20',
  'tweet_mode' : 'extended'
};

// information of RSS feed
const info = {
  'channel' : {
    'title' : 'Your RSS feed title',
    'description' : 'Your RSS feed title',
    'link' : 'https://twitter.com/YOUR_SCREEN_NAME/likes'
  }
};

// set this filter to opts.filters
// if you want to extract only the tweets of public user's tweets
const opts = {
  'filters': [TwitterRSSFeed.public_users_filter()]
};

// create RSS feed
const rss = await trf.favorites_list(params, info, opts);
console.log(rss);
```

### Uses search_tweets method

```node.js
// parameters for Twitter API (Standard search API)
const params = {
  'q' : 'SEARCH_QUERY',
  'count' : '20',
  'tweet_mode' : 'extended'
};

// information of RSS feed
const info = {
  'channel' : {
    'title' : 'Your RSS feed title',
    'description' : 'Your RSS feed title',
    'link' : 'https://twitter.com/search?q=SEARCH_QUERY'
  }
};

// create RSS feed
const rss = await trf.search_tweets(params, info);
console.log(rss);
```

### Uses promise object

```nodejs
const promise = trf.statuses_user_timeline({
  'screen_name' : 'YOUR_SCREEN_NAME',
  'count' : '20',
  'tweet_mode' : 'extended'
}, {
  'channel' : {
    'title' : 'Your RSS feed title',
    'description' : 'Your RSS feed title',
    'link' : 'https://twitter.com/YOUR_SCREEN_NAME'
  },
});

promise
.then(function(rss) {
  console.log(rss);
})
.catch(function(error) {
  console.log(error);
});
```

## Examples

- [examples](https://github.com/niwasawa/twitter-rss-feed-nodejs/tree/master/examples)

## Documentation

- [TwitterRSSFeed API Reference](https://niwasawa.github.io/twitter-rss-feed-nodejs/)
- [GET statuses/user_timeline — Twitter Developers](https://developer.twitter.com/en/docs/tweets/timelines/api-reference/get-statuses-user_timeline)
- [GET favorites/list — Twitter Developers](https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-favorites-list)
- [Standard search API — Twitter Developers](https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets)
- [Tweet updates — Twitter Developers](https://developer.twitter.com/en/docs/tweets/tweet-updates.html)
  - more than 140 characters, tweet_mode=extended, full_text

## Development

### Install dependent packages

```
$ npm install
```

### Run testing

```
$ npm test
```

### Install local for testing

Specify a local repository directory.

```
$ npm install ../twitter-rss-feed-nodejs/
```

### Generate an API documentation

```
$ npm run jsdoc
```

### Release

```
$ rm package-lock.json
$ rm -r node_modules/
$ npm publish
```

```
$ git tag -a vX.X.X -m "YOUR TAGGING MESSAGE"
$ git push origin tags/vX.X.X
```

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).


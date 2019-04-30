# TwitterRSSFeed: Twitter RSS feed Node.js library

This library is under development and unstable.

## Installation

```
$ npm install twitter-rss-feed
```

## Usage

### Use promise object

```nodejs
'use strict';

const TwitterRSSFeed = require('twitter-rss-feed');

const trf = new TwitterRSSFeed({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  token: 'YOUR_ACCESS_TOKEN',
  token_secret: 'YOUR_ACCESS_SECRET'
});

const promise = trf.user_timeline({
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
  console.log('ERROR');
  console.log(error);
});
```

### Use callback function

```nodejs
'use strict';

const TwitterRSSFeed = require('twitter-rss-feed');

const trf = new TwitterRSSFeed({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  token: 'YOUR_ACCESS_TOKEN',
  token_secret: 'YOUR_ACCESS_SECRET'
});

trf.user_timeline({
  'screen_name' : 'YOUR_SCREEN_NAME',
  'count' : '20',
  'tweet_mode' : 'extended'
}, {
  'channel' : {
    'title' : 'Your RSS feed title',
    'description' : 'Your RSS feed title',
    'link' : 'https://twitter.com/YOUR_SCREEN_NAME'
  },
}, {
}, function(error, rss) {
  if (error) {
    console.log('ERROR');
    console.log(error);
  } else {
    console.log(rss);
  }
});
```

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).


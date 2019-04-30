# TwitterRSSFeed: Twitter RSS feed Node.js library

This library is under development and unstable.

## Installation

```
$ npm install twitter-rss-feed
```

## Usage

```nodejs
'use strict';

const TwitterRSSFeed = require('twitter-rss-feed');

const tf = new TwitterRSSFeed({
  consumer_key: 'YOUR_CONSUMER_KEY',
  consumer_secret: 'YOUR_CONSUMER_SECRET',
  token: 'YOUR_ACCESS_TOKEN',
  token_secret: 'YOUR_ACCESS_SECRET'
});

tf.user_timeline({
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
}, function(error, data) {
  if (error) {
    console.log('ERROR');
    console.log(error);
  } else {
    console.log(data);
  }
});
```

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).


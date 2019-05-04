'use strict';

// Run this example code
//
// $ cd your_working_directory
// $ npm install twitter-rss-feed
// $ cp node_modules/twitter-rss-feed/examples/user_timeline.js .
// $ node user_timeline.js your_twitter_credentials.json

// Twitter credentials JSON file format
//
// {
//  "consumer_key": "XXXXXXXXXXXXXXXXXXXXXXXXX",
//  "consumer_secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//  "token": "XXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//  "token_secret": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
// }

(async function() {

  try {

    // Read credentials JSON file
    const twitter_credentials_json_path = process.argv[2];
    const credentials = JSON.parse(require('fs').readFileSync(twitter_credentials_json_path));

    // Create a instance of TwitterRSSFeed
    const TwitterRSSFeed = require('twitter-rss-feed');
    const trf = new TwitterRSSFeed(credentials);
    
    // parameters for Twitter API (GET statuses/user_timeline)
    const params = {
      'count' : '3',
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
    const rss = await trf.user_timeline(params, info);
    console.log(rss);

  } catch(error) {
    console.log('ERROR');
    console.log(error);
  }

}());


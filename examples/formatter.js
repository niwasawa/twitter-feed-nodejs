'use strict';

// Run this example code
//
// $ cd your_working_directory
// $ npm install twitter-rss-feed
// $ cp node_modules/twitter-rss-feed/examples/simple_formatter.js .
// $ node simple_formatter.js your_twitter_credentials.json

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

    const my_formatter = function(tweet) {
      const text = tweet.full_text ? tweet.full_text : tweet.text;
      return {
        title: '@' + tweet.user.screen_name + ': "' + text + '" / Twitter',
        description: text,
        link: 'https://twitter.com/' + tweet.user.screen_name + '/status/' + tweet.id_str,
        date: new Date(tweet.created_at)
      };
    };

    // set your formatter to opts.formatter
    const opts = {
      'formatter': my_formatter
    };
    
    // create RSS feed
    const rss = await trf.statuses_user_timeline(params, info, opts);
    console.log(rss);

  } catch(error) {
    console.log('ERROR');
    console.log(error);
  }

}());


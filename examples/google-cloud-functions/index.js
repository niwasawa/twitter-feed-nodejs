// This sample for Google Cloud Functions

// Runtime: Node.js 10

// Examples of URL parameters:
//
// ?method=user_timeline
// ?method=user_timeline&screen_name=YOUR_SCREEN_NAME&count=3
//
// ?method=favorites
// ?method=favorites&screen_name=YOUR_SCREEN_NAME&count=3
//
// ?method=search&q=YOUR_SEARCH_QUERY&count=3

// your config
function get_config() {
  return {
    twitter_credentials : {
      consumer_key: 'YOUR_CONSUMER_KEY',
      consumer_secret: 'YOUR_CONSUMER_SECRET',
      token: 'YOUR_ACCESS_TOKEN',
      token_secret: 'YOUR_ACCESS_SECRET'
    },
    default_screen_name: 'YOUR_SCREEN_NAME',
    default_count: '100',
    default_q: 'YOUR_SEARCH_QUERY'
  };
}

// get instance of TwitterRSSFeed
function get_twitter_rss_feed(credentials) {
  const TwitterRSSFeed = require('twitter-rss-feed');
  return new TwitterRSSFeed(credentials);
}

// get user_timeline RSS
async function get_user_timeline_rss(query) {

  try {
    const config = get_config();
    const trf = get_twitter_rss_feed(config.twitter_credentials);

    const screen_name = query.screen_name || config.default_screen_name;
    const count = query.count || config.default_count;

    const params = {
      'screen_name': screen_name,
      'count' : count,
      'tweet_mode' : 'extended'
    };

    const info = {
      'channel' : {
        'title' : '@' + screen_name + ' user_timeline',
        'description' : '@' + screen_name + ' user_timeline',
        'link' : 'https://twitter.com/' + screen_name
      }
    };

    return await trf.user_timeline(params, info);

  } catch(error) {
    throw error;
  }
};

// get favorites RSS
async function get_favorites_rss(query) {

  try {
    const config = get_config();
    const trf = get_twitter_rss_feed(config.twitter_credentials);

    const screen_name = query.screen_name || config.default_screen_name;
    const count = query.count || config.default_count;

    const params = {
      'screen_name': screen_name,
      'count' : count,
      'tweet_mode' : 'extended'
    };

    const info = {
      'channel' : {
        'title' : '@' + screen_name + ' favorites',
        'description' : '@' + screen_name + ' favorites',
        'link' : 'https://twitter.com/' + screen_name + '/likes'
      }
    };

    return await trf.favorites(params, info);

  } catch(error) {
    throw error;
  }
};

// get search RSS
async function get_search_rss(query) {

  try {
    const config = get_config();
    const trf = get_twitter_rss_feed(config.twitter_credentials);

    const q = query.q || config.default_q;
    const count = query.count || config.default_count;

    const params = {
      'q' : q,
      'count' : count,
      'tweet_mode' : 'extended'
    };

    const info = {
      'channel' : {
        'title' : q + ' - Twitter Search',
        'description' : q + ' - Twitter Search',
        'link' : 'https://twitter.com/search?q=' + encodeURIComponent(q)
      }
    };

    return await trf.search(params, info);

  } catch(error) {
    throw error;
  }
};

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  switch(req.query.method) {
    case 'user_timeline':
      get_user_timeline_rss(req.query).then((rss) => {
        res.status(200).contentType('application/xml').send(rss);
      }).catch((error) => {
        res.status(500).send('ERROR: user_timeline');
      });
      break;
    case 'favorites':
      get_favorites_rss(req.query).then((rss) => {
        res.status(200).contentType('application/xml').send(rss);
      }).catch((error) => {
        res.status(500).send('ERROR: favorites');
      });
      break;
    case 'search':
      get_search_rss(req.query).then((rss) => {
        res.status(200).contentType('application/xml').send(rss);
      }).catch((error) => {
        res.status(500).send('ERROR: search');
      });
      break;
    default:
      res.status(500).send('ERROR: method');
  }
};


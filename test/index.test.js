'use strict';

describe('Test a class TwitterRSSFeed', () => {

  const TwitterRSSFeed = require('../index');
  const Parser = require('rss-parser');

  const trf = new TwitterRSSFeed({
    consumer_key: 'YOUR_CONSUMER_KEY',
    consumer_secret: 'YOUR_CONSUMER_SECRET',
    token: 'YOUR_ACCESS_TOKEN',
    token_secret: 'YOUR_ACCESS_SECRET'
  });

  test('Create a instance', () => {
    expect(trf).toEqual(expect.anything());
  });

  describe('Call _make_rss', () => {

    const info = {
      'channel' : {
        'title' : 'Your RSS feed title',
        'description' : 'Your RSS feed title',
        'link' : 'https://twitter.com/YOUR_SCREEN_NAME'
      }
    };
 
    test('For statuses_user_timeline', async () => {
  
      const tweets = require('./data/statuses_user_timeline.json');
  
      const rss = trf._make_rss(info, tweets);
  
      const parser = new Parser();
      const feed = await parser.parseString(rss);
  
      // title
      expect(feed.items[0].title).toEqual('@niwasawa: "test: more than 140 characters. test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,xyz" / Twitter');
      // link
      expect(feed.items[0].link).toEqual('https://twitter.com/niwasawa/status/1123219219397529601');
      // description
      expect(feed.items[0].content).toEqual('test: more than 140 characters. test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,xyz');
  
      // title
      expect(feed.items[1].title).toEqual('@niwasawa: "RT @maigolab_test: TEST: more than 140 characters. TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,XYZ" / Twitter');
      // link
      expect(feed.items[1].link).toEqual('https://twitter.com/niwasawa/status/1123218839552970753');
      // description
      expect(feed.items[1].content).toEqual('RT @maigolab_test: TEST: more than 140 characters. TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,XYZ');
    });

    test('For favorites_list', async () => {
  
      const tweets = require('./data/favorites_list.json');
  
      const rss = trf._make_rss(info, tweets);
  
      const parser = new Parser();
      const feed = await parser.parseString(rss);
  
      // title
      expect(feed.items[0].title).toEqual('@maigolab_test: "TEST: more than 140 characters. TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,ZZZ" / Twitter');
      // link
      expect(feed.items[0].link).toEqual('https://twitter.com/maigolab_test/status/1123825480799531010');
      // description
      expect(feed.items[0].content).toEqual('TEST: more than 140 characters. TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,ZZZ');
    });

    test('For search_tweets', async () => {
  
      const searched = require('./data/search_tweets.json');
      const tweets = searched.statuses;
  
      const rss = trf._make_rss(info, tweets);
  
      const parser = new Parser();
      const feed = await parser.parseString(rss);
  
      // title
      expect(feed.items[0].title).toEqual('@niwasawa: "search_test_maigolab: more than 140 characters. search test maigolab,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,ZZZZZZ" / Twitter');
      // link
      expect(feed.items[0].link).toEqual('https://twitter.com/niwasawa/status/1124295153470955520');
      // description
      expect(feed.items[0].content).toEqual('search_test_maigolab: more than 140 characters. search test maigolab,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,TEST,ZZZZZZ');
    });

  });

});


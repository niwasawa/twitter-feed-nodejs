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

  test('Call make_rss', async () => {

    const info = {
      'channel' : {
        'title' : 'Your RSS feed title',
        'description' : 'Your RSS feed title',
        'link' : 'https://twitter.com/YOUR_SCREEN_NAME'
      }
    };

    const tweets = require('./data/statuses_user_timeline.json');

    const rss = trf.make_rss(info, tweets);

    const parser = new Parser();
    const feed = await parser.parseString(rss);
    const item = feed.items[0];
    // title
    expect(item.title).toEqual('test: more than 140 characters. test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,xyz');
    // link
    expect(item.link).toEqual('https://twitter.com/niwasawa/status/1123219219397529601');
    // description
    expect(item.content).toEqual('test: more than 140 characters. test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,test,xyz');
  });
});


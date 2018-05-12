var db = require('../models');

module.exports = function(app) {
  app.get('/', function(req, res) {
    var hbsInfo = {
      subhead: 'Welcome to the survey',
      link: {
        url: '/friends',
        text: 'Go To Friends List'
      },
      home: true
    };
    res.render('index', hbsInfo);
  });

  app.get('/friends', function(req, res) {
    db.friends.findAll().then(function(data) {
      var hbsInfo = {
        friendList: data,
        subhead: 'Welcome to the friends list',
        link: {
          url: '/',
          text: 'Go To Survey'
        },
        home: false
      };
      res.render('index', hbsInfo);
    }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });
};
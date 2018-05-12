var db = require("../models");

module.exports = function (app) {
  app.get("/api/friends", function (req, res) {
    db.friends.findAll().then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  app.post("/api/friends", function (req, res) {
    console.log(req.body);

    var newFriend = req.body;

    db.friends.findAll()
      .then(function (friendsListRaw) {
        if (friendsListRaw.length === 0){
          return false;
        }


        var friendsListTotals = [];

        for (var i = 0; i < friendsListRaw.length; i++) {
          var scoreDiff = 0;
          for (var j = 0; j < newFriend.scores.length; j++) {
            scoreDiff += Math.abs(newFriend.scores[j] - friendsListRaw[i].scores[j]);
          }
          friendsListTotals.push({
            name: friendsListRaw[i].name,
            photo: friendsListRaw[i].photo,
            scoreDiff: scoreDiff
          });
        }
        
        var pickedFriend = friendsListTotals.sort(function (a, b) {
          return a.scoreDiff - b.scoreDiff;
        })[0];

        return pickedFriend;
      })
      .then(function (pickedFriend) {
        console.log(pickedFriend);
        db.friends
          .create(newFriend)
          .then(function (data) { 
            res.json(pickedFriend);
          })
          .catch(function (err) {
            console.log(err);
            res.json(err);
          });
      });
  });

  app.delete("/api/friends/:id", function (req, res) {
    db.friends
      .destroy({
        where: {
          id: parseInt(req.params.id)
        }
      })
      .then(function (data) {
        res.json(true);
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });
};
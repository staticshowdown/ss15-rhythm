(function(app, R) {
  'use strict';

  var performCardAction = R.curry(function (card, player) {
    card.action(player);
  });


  var networking = {
      title: 'Networking',
      description: 'Choose up to 3 connections to attack server.',
      finish: function (numberOfCards) {
         return app.utils.clamp(1, 3, numberOfCards);
      }
    };

  var attacking = {
      title: 'Attacking',
      description: 'Crack the passcode by selecting the numbers',
      action: function (passcode, index, guess) {
        var number = passcode.guess(index, guess);
        if (number === 0) { return 'passcode hacked!'; }
        if (number > 0) { return 'higher...'; }
        if (number < 0) { return 'lower...'; }
      },
      finish: function () {}
    };

  var admin = {
      title: 'Admin',
      description: 'Drawing Cards',
      finish: function (drawnCards, player) {
        R.forEach(performCardAction(player), drawnCards);
      }
    };

  app.stages = [networking, attacking, admin];
}(app, R));

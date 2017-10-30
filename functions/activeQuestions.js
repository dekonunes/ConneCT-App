const admin = require('firebase-admin');
var functions = require('firebase-functions');
var getUsers = require('./getUsers');
var getDaysCurrent = require('./getDaysCurrent');
var getPeriodicityQuestion = require('./getPeriodicityQuestion');

module.exports = functions.https.onRequest((req, res) => {
  let isFlag = false;
  var daysCurrent, periodicity;
  getUsers().then(users => {
    if(isFlag)
      return
    isFlag = true;
    for (var qtdDQs = 0; qtdDQs < users.length; qtdDQs++) {
      if (Object.keys(users[qtdDQs]) === null)
        return;
      if(users[qtdDQs].answers)
        for (var i = 0; i < users[qtdDQs].answers.length; i++) {
          daysCurrent = getDaysCurrent(users[qtdDQs],i);
          periodicity = getPeriodicityQuestion(users[qtdDQs],i);
          if(daysCurrent >= periodicity) {
            admin.database()
              .ref(`/${users[qtdDQs]['uidCT']}/users/${users[qtdDQs]['id']}/questions/${i}`)
               .update({
                 isActive: true
         });
        }
      }
    }
  });
});

const admin = require('firebase-admin');
var functions = require('firebase-functions');
var getUsers = require('./getUsers');
var getDaysCurrent = require('./getDaysCurrent');
var getPeriodicityQuestion = require('./getPeriodicityQuestion');

module.exports = functions.https.onRequest((req, res) => {
  let isFlag = false;
  getUsers().then(users => {
    if(isFlag)
      return
    isFlag = true;
    var promisesDay = [],promisesPeriodicity = [];
    for (var x = 0; x < users.length-1; x++) {
      if (Object.keys(users[x]) === null)
        return;
      for (var j = 0; j < Object.keys(users[x]).length -1; j++) {
        for (var i = 0; i <= 14; i++) {
          var promiseDay = new Promise (resolve =>
            getDaysCurrent(users[x]['uidCT'],users[x]['id'],i)
              .then(days => {
                // console.log(days);
                resolve(days)})
              );
          var promisePeriodicity = new Promise (resolve =>
              // getPeriodicityQuestion(users[x]['uidCT'],users[x]['id'],i)
              getPeriodicityQuestion('XIXd3PEO7pQIprUYJ8YF5y42EPi1','svJgJahjlzNGATXo8kwS5Uq6jdn1',i)
                .then(periodicity => resolve(periodicity))
              );
          promisesDay.push(promiseDay);
          promisesPeriodicity.push(promisePeriodicity);
        }
      }
    }
    Promise.all([promisesDay,promisesPeriodicity]).then(values => {
      var daysCurrents = [],periodicityQuestions = [];
      var itemsProcessedperiodicity = 0, itemsProcessedDay = 0;
      var promiseDays = new Promise (resolve => {
        values[0].forEach((value, i) => {
          // console.log(value);
          values[0][i].then(day => {
            daysCurrents.push(day);
            // console.log(daysCurrents);
            if(itemsProcessedDay === 14)
              resolve(daysCurrents);
            itemsProcessedDay++;
            })
          })
      });
      var promisePeri = new Promise (resolve => {
          values[1].forEach((value, i) => {
              values[1][i].then(periodicity => {
                periodicityQuestions.push(periodicity)
                if(itemsProcessedperiodicity === 14)
                  resolve(periodicityQuestions);
                itemsProcessedperiodicity++;
              })
          })
      });
      Promise.all([promiseDays,promisePeri]).then(values => {
        for (var x = 0; x < users.length; x++) {
          for (var j = 0; j < Object.keys(users[x]).length; j++) {
              for (var w = 0; w < 14; w++) {
                // console.log(values, 'Valor 1');
                // console.log(values[1][w], 'Valor 2');
                if(values[0][w] >= values[1][w]) {
                        admin.database()
                    .ref(`/${users[x]['uidCT']}/users/${users[x]['id']}/questions/${w}`)
                     .update( {
                       isActive: true
                     });
                }
              }
          }
        }
      })
    });
  });
});

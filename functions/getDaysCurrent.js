const admin = require('firebase-admin');
var db = admin.database();
var getDiferenceDays = require('./getDiferenceDays');

module.exports = function getDaysCurrent(idCT,idDQ,idAnswer) {
    return new Promise((resolve) => {
        db.ref(`/${idCT}/users/${idDQ}/answers/${idAnswer}`)
        .once("value").then(snapshot => {
          if(snapshot.val() != null) {
            let lastAnswerString = snapshot.val()[Object.keys(snapshot.val())[(Object.keys(snapshot.val()).length)-1]]['date'];
            // console.log(getDiferenceDays(new Date(),new Date(lastAnswerString)));
            resolve (getDiferenceDays(new Date(),new Date(lastAnswerString)));
          }
        })
    });
  }

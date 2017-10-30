'use strict';
var functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment-timezone');
admin.initializeApp(functions.config().firebase);
var db = admin.database();
exports.activeQuestions = require('./activeQuestions');

var values = [];
var average = (array) => array.reduce((a, b) => a + b) / array.length;
exports.setAverage = functions.database.ref('/{idCT}/users/{idDQ}/answers')
  .onWrite(event => {
    var lastProperty;
    const root = event.data.ref.root
    return root.child(`/${event.params.idCT}/users/${event.params.idDQ}`)
      .once('value')
      .then( snapshot => {
         snapshot.val().answers.forEach(_answer => {
             for (lastProperty in _answer){}
             values.push(_answer[lastProperty]['answersNumber']);
         })
         return values
      }).then((_values) => {
        values = [];
         admin.database()
          .ref(`/${event.params.idCT}/users/${event.params.idDQ}`)
          .update({averageAnswers: parseInt(average(_values))});
     });
});

let daysCurrent = 0;
exports.gamificationCarrer = functions.database.ref('/{idCT}/users/{idDQ}/answers')
  .onWrite(event => {
    let isFlag = false;
    db.ref(`/${event.params.idCT}/users/${event.params.idDQ}/answers/0`)
    .on("value", snapshot => {
      if(snapshot.val()[Object.keys(snapshot.val())[(Object.keys(snapshot.val()).length)-2]] != null) {
        let pastAnswerDate = snapshot.val()[Object.keys(snapshot.val())[(Object.keys(snapshot.val()).length)-2]]['date'];
        daysCurrent = getDiferenceDays(new Date(),pastAnswerDate);
      }
    }),
    db.ref(`/${event.params.idCT}/users/${event.params.idDQ}/gamification/1/quantity`)
    .on("value", snapshot => {
      if(isFlag)
        return
      isFlag = true;
      if((daysCurrent % 2) === 0) {
        admin.database()
         .ref(`/${event.params.idCT}/users/${event.params.idDQ}/gamification/1`)
         .update({
           quantity: (snapshot.val()+1),
           isActive: true
         });
      }
      if((daysCurrent % 7) === 0) {
        admin.database()
         .ref(`/${event.params.idCT}/users/${event.params.idDQ}/gamification/2`)
         .update({
           quantity: (snapshot.val()+1),
           isActive: true
         });
      }
      if(daysCurrent === 30) {
        admin.database()
         .ref(`/${event.params.idCT}/users/${event.params.idDQ}/gamification/3`)
         .update({
           quantity: (snapshot.val()+1),
           isActive: true
         });
      }
    })
  });

exports.gamificationTrophys = functions.database.ref('/{idCT}/users/{idDQ}/answers')
    .onWrite(event => {
      let isFlag = false;
      db.ref(`/${event.params.idCT}/users/${event.params.idDQ}/answers/0`)
      .on("value", snapshot => {
        if(isFlag)
          return
        isFlag = true;
        let firstAnswerDate = snapshot.val()[Object.keys(snapshot.val())[0]]['date'];
        if(firstAnswerDate != null) {
          let daysCurrent = getDiferenceDays(new Date(),firstAnswerDate);
          admin.database()
           .ref(`/${event.params.idCT}/users/${event.params.idDQ}/gamification/9`)
           .update({
             quantity: daysCurrent
           });
       } else
         return

      })
    });

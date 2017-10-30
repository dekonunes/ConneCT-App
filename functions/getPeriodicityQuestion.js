const admin = require('firebase-admin');
var db = admin.database();

module.exports = function getPeriodicityQuestion(idCT,idDQ,idQuestion) {
  return new Promise((resolve) => {
      db.ref(`/${idCT}/users/${idDQ}/questions/${idQuestion}`)
      .once("value").then(snapshot => {
        resolve (snapshot.val()['periodicity']);
      })
    });
}

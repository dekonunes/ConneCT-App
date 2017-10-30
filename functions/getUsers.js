const admin = require('firebase-admin');
var db = admin.database();

let usersCT = [],usersDQ = [],users = [];
module.exports = function getUsers() {
  return new Promise (resolve => {
    db.ref(`/`)
    .once("value").then(snapshot => {
      snapshot.forEach(childSnapshot => {
        usersCT.push(childSnapshot.val())
      });
      usersCT.forEach(childSnapshot => {
        if (childSnapshot.users)
          Object.keys(childSnapshot.users).forEach(user => {
            usersDQ.push(childSnapshot.users[user]);
          })
      });
      resolve(usersDQ);
    });
  });
}

const admin = require('firebase-admin');
var db = admin.database();

module.exports = function getPeriodicityQuestion(DQ,index) {
  if(DQ['questions'] == null)
    return 0;
  return DQ['questions'][index]['periodicity'];
}

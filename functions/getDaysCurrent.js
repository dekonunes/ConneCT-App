const admin = require('firebase-admin');
var db = admin.database();
var getDiferenceDays = require('./getDiferenceDays');

module.exports = function getDaysCurrent(DQ,index) {
  if(DQ['answers'] == null)
    return 0;
  var indexLastAnwer = Object.keys(DQ['answers'][index])[Object.keys(DQ['answers'][index]).length - 1];
  var lastAnswerString = DQ['answers'][index][indexLastAnwer]['date'];
  return getDiferenceDays(new Date(),new Date(lastAnswerString));
}

const admin = require('firebase-admin');
const moment = require('moment-timezone');
var getDiferenceDays = require('./getDiferenceDays');
module.exports = function getDaysCurrent(DQ, index) {
    if (DQ['answers'] === null)
        return 0;
    const indexLastAnwer = Object.keys(DQ['answers'][index])[Object.keys(DQ['answers'][index]).length - 1];
    const lastAnswerString = DQ['answers'][index][indexLastAnwer]['date'];
    return getDiferenceDays(moment(), moment(lastAnswerString).format());
};
//# sourceMappingURL=getDayCurrent.js.map
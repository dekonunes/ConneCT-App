"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
const getDiferenceDays_1 = require("./getDiferenceDays");
function getDaysCurrent(DQ, index) {
    if (!DQ.answers[index])
        return 0;
    const indexLastAnwer = Object.keys(DQ['answers'][index])[Object.keys(DQ['answers'][index]).length - 1];
    const lastAnswerString = DQ['answers'][index][indexLastAnwer]['date'];
    return getDiferenceDays_1.getDiferenceDays(moment(), moment(lastAnswerString).format());
}
exports.getDaysCurrent = getDaysCurrent;
//# sourceMappingURL=getDaysCurrent.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPeriodicityQuestion(DQ, index) {
    if (!DQ.questions)
        return 0;
    return DQ.questions[index].periodicity;
}
exports.getPeriodicityQuestion = getPeriodicityQuestion;
//# sourceMappingURL=getPeriodicityQuestion.js.map
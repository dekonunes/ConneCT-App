"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function daydiff(firstDate, secondDate) {
    return Math.round(Math.abs((new Date(firstDate).getTime() - new Date(secondDate).getTime()) / (1000 * 60 * 60 * 24)));
}
exports.daydiff = daydiff;
//# sourceMappingURL=dayDiff.js.map
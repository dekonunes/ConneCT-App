"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
const dayDiff_1 = require("./dayDiff");
function getDiferenceDays(initial, final) {
    return dayDiff_1.daydiff(moment(initial).tz("America/Sao_Paulo"), moment(final).tz("America/Sao_Paulo"));
}
exports.getDiferenceDays = getDiferenceDays;
//# sourceMappingURL=getDiferenceDays.js.map
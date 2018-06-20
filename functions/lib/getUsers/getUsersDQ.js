"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUsersCT_1 = require("./getUsersCT");
const usersDQ = [];
function getUsersDQ() {
    return new Promise((resolve) => {
        getUsersCT_1.getUsersCT().then((CTs) => {
            CTs.forEach(ct => {
                if (ct.users)
                    Object.keys(ct.users).forEach(dq => usersDQ.push(ct.users[dq]));
            });
            resolve(usersDQ);
        });
    });
}
exports.getUsersDQ = getUsersDQ;
;
//# sourceMappingURL=getUsersDQ.js.map
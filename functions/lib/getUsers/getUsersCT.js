"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const usersCT = [];
function getUsersCT() {
    return new Promise((resolve) => {
        return admin.database().ref(`/`)
            .once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
                usersCT.push(childSnapshot.val());
                if (childSnapshot.val())
                    resolve(usersCT);
            });
        });
    });
}
exports.getUsersCT = getUsersCT;
;
//# sourceMappingURL=getUsersCT.js.map
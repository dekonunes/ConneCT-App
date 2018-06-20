"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const questions_1 = require("./questions");
exports.activeQuestions = questions_1.activeQuestions;
admin.initializeApp();
// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!")
// });
//# sourceMappingURL=index.js.map
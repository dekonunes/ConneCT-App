"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const getUsers_1 = require("../getUsers");
const getDaysCurrent_1 = require("../util/getDaysCurrent");
const getPeriodicityQuestion_1 = require("./getPeriodicityQuestion");
exports.activeQuestions = functions.https.onRequest((req, response) => {
    let isFlag = false;
    getUsers_1.getUsersDQ().then((DQs) => {
        if (isFlag)
            return;
        isFlag = true;
        for (const dq of DQs) {
            if (!dq)
                return;
            if (dq.answers) {
                for (let i = 0; i < dq.answers.length; i++)
                    if (getDaysCurrent_1.getDaysCurrent(dq, i) >= getPeriodicityQuestion_1.getPeriodicityQuestion(dq, i))
                        admin.database().ref(`/${dq['uidCT']}/users/${dq['id']}/questions/${i}`).update({ isActive: true });
            }
        }
        response.send("Questoes ativadas!");
    }).catch(() => console.log('Error para ativar as questões'));
});
//# sourceMappingURL=index.js.map
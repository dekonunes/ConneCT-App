import * as functions from 'firebase-functions';
import * as admin from "firebase-admin";
import { getUsersDQ } from "../getUsers";
import { getDaysCurrent } from "../util/getDaysCurrent";
import { getPeriodicityQuestion } from "./getPeriodicityQuestion";

export const activeQuestions = functions.https.onRequest((req, response) => {
  let isFlag = false;
  getUsersDQ().then((DQs:Array<any>) => {
    if(isFlag)
      return
    isFlag = true;
    for (const dq of DQs) {
      if (!dq)
        return;
      if(dq.answers) {
        for (let i = 0; i < dq.answers.length; i++)
          if(getDaysCurrent(dq,i) >= getPeriodicityQuestion(dq,i)) 
            admin.database().ref(`/${dq['uidCT']}/users/${dq['id']}/questions/${i}`).update({isActive: true})
      }
    }
    response.send("Questoes ativadas!");
  }).catch(() => console.log('Error para ativar as questões'));
});

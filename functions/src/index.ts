import * as admin from "firebase-admin";
import { activeQuestions } from "./questions";
admin.initializeApp();



export { activeQuestions };

// export const helloWorld = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!")
// });


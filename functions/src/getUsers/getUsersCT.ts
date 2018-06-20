import * as admin from "firebase-admin";

const usersCT = [];
export function getUsersCT() {
    return new Promise((resolve) => {
        return admin.database().ref(`/`)
            .once('value').then((snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    usersCT.push(childSnapshot.val());
                    if (childSnapshot.val()) 
                      resolve(usersCT);
                });
            }
        )
    });
};
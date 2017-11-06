import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
  private currentUser: firebase.User;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

  signinWithEmail(user: {email: string, password: string}) {
    return new Promise(resolve => {
      this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => resolve(firebase.auth().signInWithEmailAndPassword(user.email,user.password)));
      });
  }

  getUID(): Promise<string> {
    return new Promise(resolve =>
      this.afAuth.authState.subscribe(_userUID => {
        if(_userUID)
          resolve(_userUID.uid)
        else
          resolve(null)
      })
    )
  }

   logOut() {
     return new Promise (() => {
       this.afAuth.auth.signOut();
     })
   }
}

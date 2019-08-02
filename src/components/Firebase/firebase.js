import * as firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAK2YKyzsG7PW1fVHTKBbhKVX38EAJQyjQ',
  authDomain: 'fir-tutorial-97fa3.firebaseapp.com',
  databaseURL: 'https://fir-tutorial-97fa3.firebaseio.com',
  projectId: 'fir-tutorial-97fa3',
  storageBucket: '',
  messagingSenderId: '764930871413',
  appId: '1:764930871413:web:7ebc89b9c46e7809'
};

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.auth = app.auth();
    this.db = app.database();

    this.doCreateUserWithEmailAndPassword = this.doCreateUserWithEmailAndPassword.bind(this);
    this.doSignInWithEmailAndPassword = this.doSignInWithEmailAndPassword.bind(this);
    this.doSignOut = this.doSignOut.bind(this);
    this.doPasswordReset = this.doPasswordReset.bind(this);
    this.doPasswordUpdate = this.doPasswordUpdate.bind(this);

    this.user = this.user.bind(this);
    this.users = this.users.bind(this);

    this.anonUserToNormal = this.anonUserToNormal.bind(this);
  }

  anonUserToNormal(email, password) {
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.auth.currentUser.linkAndRetrieveDataWithCredential(credential);
  }

  doCreateUserWithEmailAndPassword(email, password) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  doSignInWithEmailAndPassword(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  doSignOut() {
    return this.auth.signOut();
  }

  doPasswordReset(email) {
    return this.auth.sendPasswordResetEmail(email);
  }

  doPasswordUpdate(password) {
    return this.auth.currentUser.updatePassword(password);
  }

  // User api

  user(uid) {
    return this.db.ref(`users/${uid}`);
  }
  users() {
    return this.db.ref(`users`);
  }
}

export default Firebase;

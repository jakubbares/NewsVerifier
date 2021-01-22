import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth, User} from 'firebase/app';
import {Router} from '@angular/router';
import {SignIn, UserData} from '../helper/classes';
import {setMissing} from '../helper/functions';

@Injectable()
export class AuthService {
  user: any;
  userData: any;

  get userRef() {
    return this.db.firestore.doc(`users/${this.user.uid}`);
  }

  get loggedIn() {
    return this.user;
  }

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private db: AngularFirestore) {
    window['auth'] = this;
    this.afAuth.authState.subscribe(user => {
      if (user) { this.user = setMissing(this.user, user); this.loadUserData(); }
      // if (!user) {  this.router.navigate(['/admin/sign-in']);  }
    });
  }

  facebookAuth() {
    return this.authLogin(new auth.FacebookAuthProvider());
  }

  loadUserData() {
    this.userRef.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        this.userData = docSnapshot.data();
      }
    });
  }

  async relogin() {
    const { email, password } = this.user;
    const input = new SignIn(email, password);
    await this.login(input);
    this.loadUserData();
  }

  async login(input: SignIn) {
    const result = await this.afAuth.auth.signInWithEmailAndPassword(input.email, input.password);
    this.user = setMissing(this.user, result);
    this.user.password = input.password;
    this.storeUser(this.user);
    this.router.navigate(['settings']);
  }

  async register(input: SignIn) {
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(input.email, input.password);
    this.sendEmailVerification();
  }

  async sendEmailVerification() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['admin/verify-email']);
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.auth.signOut();
    this.storeUser(null);
    this.router.navigate(['admin/sign-in']);
  }

  authLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!');
      }).catch((error) => {
        console.log(error);
      });
  }

  storeUser(user) {
    this.user = user;
    chrome.storage.sync.set({ user });
  }
}

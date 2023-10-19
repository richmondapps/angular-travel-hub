import { Injectable } from '@angular/core';
import {
  Auth,
  signOut,
  signInWithPopup,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  OAuthProvider,
  linkWithPopup,
  unlink,
  updateEmail,
  updatePassword,
  User,
  reauthenticateWithPopup,
  authState,
  onAuthStateChanged,
  getAuth
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { doc } from 'firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GlobalConstants } from '../global-variables';
import { ReadService } from '../services/read.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth = false;
  user: any;
  user$: Observable<User | null>;
  isLoggedInUser: boolean;
  loggedInUserEmail: string;
  loggedInUserRole: any;
  constructor(
    private auth: Auth,
    private router: Router ,
    private readService: ReadService 
    ) {
    this.isAuth = true;
  //   this.user$ = new Observable((observer: any) =>
  //   onAuthStateChanged(auth, observer)
    
  // );
  this.user$ = new Observable((observer: any) =>
  onAuthStateChanged(auth, observer)
);
  

  console.log('USER', this.user$)
  this.user$.subscribe(d => {
    console.log('AUTH' , d)    
    if(d){
      localStorage.setItem('user', JSON.stringify(d));
      JSON.parse(localStorage.getItem('user'));
      this.fetchUserDataFn(d.email);
      this.fetchUserTravelProfileFn(d.email);
      this.loggedInUserEmail = d.email;
      this.isLoggedInUser = true;
      console.log('STATUS: LOGGED IN')
    } else {
      localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      console.log('STATUS: NO USER OUT')
      this.isLoggedInUser = false;
    }
  })
  }

  async fetchUserDataFn(email){
    const userData = await this.readService.returnPromiseWhereFn(
      `${GlobalConstants.rootEmployeeCollection}`,
      'personEmail',
      email
    );
    console.log('UserData', userData)
    const [r] = [...userData];
    if(r.personRoles.travelHub){
 console.log('Roles', r.personRoles.travelHub);

    this.loggedInUserRole = r.personRoles.travelHub;
    }
   

  }
  async fetchUserTravelProfileFn(email){
    const travelProfile = await this.readService.returnPromiseWhereFn(
      `${GlobalConstants.rootEmployeeCollection}/${email}/travelProfile`,
      'personEmail',
      email
    );

    const [d] = [...travelProfile];
    const fullName = `${d.personLegalNameFirst} ${d.personLegalNameLast}`;
    sessionStorage.setItem('RequesterFirstLastName', JSON.stringify(fullName));
    
    console.log('TravelProfile', travelProfile)
    console.log('fullName', fullName)
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }
  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   console.log('AUTH USER', user)
  //   return (user !== null && user.emailVerified !== false) ? true : false;
  // }

  logout(){
    sessionStorage.setItem('LoggedInUserEmail', null);
    sessionStorage.clear();
    // localStorage.clear();
    this.isAuth = false;
    // const snackClass = ['snackError'];
    // const message = `Signing Out: ${this.userEmail}`;
    // this.snackbarService.openSnackBar(message, snackClass);
    this.router.navigate(['/login']);
    signOut(this.auth);
  }

}



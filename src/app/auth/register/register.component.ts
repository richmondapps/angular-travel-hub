import { Component, OnInit } from '@angular/core';
import { browserSessionPersistence, getAuth, OAuthProvider, setPersistence, signInWithPopup } from "firebase/auth";
import { GlobalConstants } from 'src/app/global-variables';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  type: 'login' | 'signup' | 'reset' = 'login';
  afAuth: any;
  passwordlessForm: boolean;
  emailSent: boolean;
  errorMessage: string;
  isShowForm: boolean;
  isSocialSignup: boolean;
  constructor(
    private readService: ReadService,
  ) { }

  ngOnInit(): void {
  }
  get isLogin() {
    return this.type === 'login';
  }
  get isSignup() {
    return this.type === 'signup';
  }
  async sendEmailLink(email) {
    console.log('EMAIL', email);
    const actionCodeSettings = {
      //   url: 'https://sofi-job-fair.csc-usa.com/passwordless',
      url: 'http://localhost:5500/employees/passwordless-signin',
      handleCodeInApp: true,
    };
    try {
      await this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      this.passwordlessForm = false;
      this.emailSent = true;
      // setTimeout(() => {
      //   this.router.navigateByUrl('/');
      // }, 2000);
    } catch (err) {
      //  console.log('SEND LINK ERROR', err);
      this.errorMessage = 'You must enter a valid email address';
    }
  }

  showSocialGridFn() {
    this.isShowForm = false;
    this.isSocialSignup = true;
    return this.type === 'login';
  }
  
  async SSOFN(authProvider: string){
    this.isShowForm = false;
    const provider = new OAuthProvider('microsoft.com');
    const auth = getAuth();
   

    setPersistence(auth, browserSessionPersistence)
  .then(async () => {
      const user = await signInWithPopup(auth, provider);
      const userEmail = user.user.email;
      const userEmailVerified = user.user.emailVerified;
      const userProviderData = user.user.providerData;
      const userUid = user.user.uid;
      let userProviderId: string;
      userProviderData.forEach((e) => {
        userProviderId = e.providerId;
      });
      sessionStorage.setItem('LoggedInUserEmail', JSON.stringify(userEmail));
        sessionStorage.setItem(
          'EmailVerified',
          JSON.stringify(userEmailVerified)
        );
        sessionStorage.setItem('ProviderId', JSON.stringify(userProviderId));

        const docRef = await this.readService.returnPromiseWhereFn(
          `${GlobalConstants.rootEmployeeCollection}`,
          'personEmail',
          `${userEmail}`
        );

        console.log('USER CRED: ', user.user); // Do not send to your backend! Use an ID token instead.
        console.log('USER: ', user);
  }).catch((error) => {

  })
  
  }
  
}

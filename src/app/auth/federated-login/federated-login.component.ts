import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OAuthProvider, getAuth, setPersistence, browserSessionPersistence, signInWithPopup, sendSignInLinkToEmail } from 'firebase/auth';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/global-variables';
import { ReadService } from 'src/app/services/read.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-federated-login',
  templateUrl: './federated-login.component.html',
  styleUrls: ['./federated-login.component.css']
})
export class FederatedLoginComponent implements OnInit {
  type: 'login' | 'alternate'  = 'login';
 
  passwordlessForm: boolean;
  emailSent: boolean;
  errorMessage: string;
  isShowForm: boolean = false;
  isSocialSignup = true;
  passwordless: FormGroup;
  email: string;
  showSpinner = false;
  isEmailLink = false;
  showLoginGrid = true;
  miscImages: Observable<any>;
  isMS = true;
  isSignInMsg = true;
  constructor(
    private readService: ReadService,
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.miscImages = this.readService.returnObservableOrderByFn(
      `${GlobalConstants.corporateMiscImages}`,
      'imageTitle',
      'asc'
    )
    this.createPasswordlessForm();
  }

  createPasswordlessForm() {
    this.passwordless = this.fb.group({
      passwordlessEmail: ['', [Validators.required]],
    });
  }

  async sendEmailLink(email) {
    console.log('EMAIL', email);
    const actionCodeSettings = {
      //   url: 'https://sofi-job-fair.csc-usa.com/passwordless',
      url: 'http://localhost:5200/passwordless-signin',
      handleCodeInApp: true,
    };
    try {
      const auth = getAuth();

      sendSignInLinkToEmail(auth, email, actionCodeSettings).then(()=> {
        window.localStorage.setItem('emailForSignIn', email);
        this.passwordlessForm = false;
        this.emailSent = true;
      });
     
     
      // setTimeout(() => {
      //   this.router.navigateByUrl('/');
      // }, 2000);
    } catch (err) {
       console.log('SEND LINK ERROR', err.message);
       console.log('SEND LINK CODE', err.code);
      this.errorMessage = 'You must enter a valid email address';
    }
  }
  changeType(val) {
    this.type = val;
  }
  get isLogin() {
    return this.type === 'login';
  }
  get isAlternate() {
    return this.type === 'alternate';
  }

  showFormFn() {
    this.isShowForm = true;
    this.isSocialSignup = false;
    // return this.type === 'alternate';
  }

  showSocialGridFn(val) {
    this.isShowForm = false;
    this.isSocialSignup = true;
    this.isSignInMsg = true;
    this.isMS = true;
    return this.type = val;
  }
  showAlternateSignInFn(val?) {
    console.log(val)
    this.isMS = false;
    this.isSignInMsg = false;
    this.isShowForm = false;
   this.isSocialSignup = true;
    return this.type = val;
  }
  
  async SSOFN(authProvider: string){
    this.isShowForm = false;
    this.showSpinner = true;
    const provider = new OAuthProvider(authProvider);
    const auth = getAuth();
   

    setPersistence(auth, browserSessionPersistence)
  .then(async () => {
      const user = await signInWithPopup(auth, provider);
      this.showSpinner = false;
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

        // const docRef = await this.readService.returnPromiseWhereFn(
        //   `${GlobalConstants.rootEmployeeCollection}`,
        //   'personEmail',
        //   `${userEmail}`
        // );

        this.router.navigate(['/account']);
        console.log('USER CRED: ', user.user); // Do not send to your backend! Use an ID token instead.
        console.log('USER: ', user);
        // console.log('docRef: ', docRef);
  }).catch((error) => {
    console.log('Error: ', error);
  })
  
  }
  
}

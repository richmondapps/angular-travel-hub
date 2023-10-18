import { Component, OnInit } from '@angular/core';
import { sendSignInLinkToEmail } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  OAuthProvider,
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-alternate-signin',
  templateUrl: './alternate-signin.component.html',
  styleUrls: ['./alternate-signin.component.css'],
})
export class AlternateSigninComponent implements OnInit {
  branchDocId: any;
  branchNameLowerCase: any;
  branchNameTitleCase: any;
  email: string;
  emailUrl: string;
  errorMessage: string;
  emailSent: boolean;
  fullUrlIncSubDomain: any;
  isEmailLink = false;
  isMS = true;
  isSocialSignup = true;
  isShowForm: boolean = false;
  isSignInMsg = true;
  miscImages: any;
  passwordless: FormGroup;
  passwordlessForm: boolean;
  rootCollectionAndBranchDoc: any;
  showLoginGrid = true;
  showSpinner = false;
  rootEmployeeCollection: any;

  constructor(
    private readService: ReadService,
    private fb: FormBuilder,
    public authService: AuthService,
    private createService: CreateService,
    public dateTimeService: DateAndTimeService,
    private router: Router
  ) {
    this.fetchImagesFn();
  }

  ngOnInit(): void {
    this.rootCollectionAndBranchDoc = JSON.parse(
      sessionStorage.getItem('RootCollectionAndBranchDoc') as any
    );
    this.fullUrlIncSubDomain = JSON.parse(
      sessionStorage.getItem('FullUrlIncSubDomain') as any
    );
    this.branchNameLowerCase = JSON.parse(
      sessionStorage.getItem('BranchNameLowerCase') as any
    );
    this.branchDocId = JSON.parse(sessionStorage.getItem('BranchDocId') as any);

    this.branchNameTitleCase = JSON.parse(
      sessionStorage.getItem('BranchNameTitleCase') as any
    );
    this.rootEmployeeCollection = JSON.parse(
      sessionStorage.getItem('RootEmployeeCollection') as any
    );
    this.createPasswordlessForm();
  }

  async fetchImagesFn() {
    this.miscImages = await this.readService.returnPromiseOrderByFn(
      `${GlobalConstants.corporateMiscImages}`,
      'imageTitle',
      'asc'
    );
  }

  createPasswordlessForm() {
    this.passwordless = this.fb.group({
      passwordlessEmail: ['', [Validators.required]],
    });
  }

  async SSOFN(authProvider: string) {
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
        const transformedEmail = userEmail.toLowerCase();

        const docRef = await this.readService.returnPromiseWhereFn(
          `${GlobalConstants.rootEmployeeCollection}`,
          'personEmail',
          `${transformedEmail}`
        );

        if (!docRef?.length) {
          this.router.navigate(['/create-profile']);
        } else {
          this.router.navigate(['/account']);
          this.signInLogFn(transformedEmail);
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  }

  showFormFn() {
    this.isShowForm = true;
    this.isSocialSignup = false;
    // return this.type === 'alternate';
  }

  showSocialGridFn() {
    this.isShowForm = false;
    this.isSocialSignup = true;
    this.isSignInMsg = true;
    this.isMS = true;
    this.fetchImagesFn();
    this.router.navigateByUrl('/access');
  }

  showAlternateSignInFn(val?) {
    this.isMS = false;
    this.isSignInMsg = false;
    this.isShowForm = false;
    this.isSocialSignup = true;
  }

  async sendEmailLink(email) {
    this.isShowForm = false;

    const urlEmailLink = await this.readService.returnPromiseWhereFn(
      `${this.rootCollectionAndBranchDoc}/passwordlessLinks`,
      'docId',
      `${GlobalConstants.websiteDocId}`
    );

    console.log('UrlEmailLink', urlEmailLink);

    const [x] = [...urlEmailLink];
    if (x.isLocalHost) {
      this.emailUrl = `http://localhost:${x.localHostPort}/access/${x.passwordlessSignin}`;
    } else if (x.isDevelopment) {
      this.emailUrl = `https://${x.devUrl}/access/${x.passwordlessSignin}`;
    } else {
      this.emailUrl = `https://${x.prodUrl}/access${x.passwordlessSignin}`;
    }

    const actionCodeSettings = {
      url: this.emailUrl,
      handleCodeInApp: true,
    };
    try {
      const auth = getAuth();

      sendSignInLinkToEmail(auth, email, actionCodeSettings).then(() => {
        window.localStorage.setItem('emailForSignIn', email);
      });

      setTimeout(() => {
        this.router.navigateByUrl('/access/link-sent', {
          state: {
            email: email,
          },
        });
      }, 2000);
    } catch (err) {
      console.log('SEND LINK ERROR', err.message);
      console.log('SEND LINK CODE', err.code);
      this.errorMessage = 'You must enter a valid email address';
    }
  }

  async signInLogFn(personEmail: any) {
    const d = await this.readService.returnPromiseWhereFn(
      `${this.rootEmployeeCollection}`,
      'personEmail',
      personEmail
    );

    const providerId = JSON.parse(sessionStorage.getItem(`ProviderId`));
    if (d?.length) {
      const [x] = [...d];
      const t = this.dateTimeService.returnTimeStampFn(new Date());
      const id = UidGeneratorService.newId();
      const obj = {
        applicationName: this.branchNameTitleCase,
        branchDocId: this.branchDocId,
        branchName: this.branchNameLowerCase,
        createdAt: new Date(),
        docId: id,
        deleteId: id,
        fullUrlIncSubDomain: this.fullUrlIncSubDomain,
        personLegalNameFirst: x.personLegalNameFirst,
        personLegalNameLast: x.personLegalNameLast,
        personEmail: x.personEmail,
        readId: id,
        signInMethod: 'SSO',
        providerId,
        signInTimeStamp: t,
        updateId: id,
        websiteName: this.branchNameTitleCase,
      };
      try {
        this.createService.createRecordFn(
          `${this.rootCollectionAndBranchDoc}/employeeSignInLog`,
          id,
          obj
        );
      } catch (e) {
        console.log('Sign In Log Error', e);
      }
    }
  }
}

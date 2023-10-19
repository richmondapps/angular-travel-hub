import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { ReadService } from 'src/app/services/read.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AuthService } from '../auth.service';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

@Component({
  selector: 'app-passwordless-signin',
  templateUrl: './passwordless-signin.component.html',
  styleUrls: ['./passwordless-signin.component.css']
})
export class PasswordlessSigninComponent implements OnInit {
  email: string;
  errorMessage: string;
  isAlreadyRegistered: boolean;
  isVerifiedEmployee: boolean;
  personLegalNameFirst: any;
  showSpinner = false;
  branchVerified = false;
  branchUnVerified = false;
  statusVerified = false;
  statusUnVerified = false;
  noRecordFound = false;
  noBranchMatch: string;
  showBranchLabel = false;
  resStatus: any;
  resMessage: any;
  resData: any;
  isEmployeeNumberVerified: boolean;
  showLoginGrid: boolean;
  notPermitted: boolean;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private readService: ReadService,
    private createService: CreateService,
    private router: Router,
 
) { }

  ngOnInit(): void {
    // const url = this.router.url;
    // this.confirmSignIn(url);

    const auth = getAuth();

    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem('emailForSignIn');
          // You can access the new user via result.user
          console.log('SIGNIN EMAIL LINK', result.user)
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((err) => {
          console.log('SEND LINK ERROR', err.message);
          console.log('SEND LINK CODE', err.code);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }

  }

  // async confirmSignIn(url) {
  //   try {
  //     if (url) {
  //       let incomingLinkEmail = window.localStorage.getItem('emailForSignIn');
     
  //       console.log('LS EMAIL', incomingLinkEmail);
  //       if(incomingLinkEmail){
  //         sessionStorage.setItem('LoggedInUserEmail', JSON.stringify(incomingLinkEmail));
  //       }

  //       if (!incomingLinkEmail) {
  //         incomingLinkEmail = window.prompt('Please provide your email for confirmation');
  //       }
  //         const docRef = await this.readService.returnPromiseWhere(
  //         `${GlobalConstants.rootEmployeeCollection}`,
  //         'personEmail',
  //         `${incomingLinkEmail}`
  //         );

  //         docRef.forEach(e => {
  //           console.log('E PE', e.personEmail);

  //        if(e.personEmail === incomingLinkEmail){
  //         sessionStorage.setItem('LoggedInUserEmail', JSON.stringify(e.personEmail));
  //         sessionStorage.setItem(
  //           'PersonLegalNameFirst',
  //           JSON.stringify(e.personLegalNameFirst)
  //         );

  //         sessionStorage.setItem(
  //           'PersonLegalNameLast',
  //           JSON.stringify(e.personLegalNameLast)
  //         );

  //         sessionStorage.setItem(
  //           'PersonEmployeeNumber',
  //           JSON.stringify(e.personEmployeeNumber)
  //         );
  //           const formData = {
  //             emailVerified: true,

  //           }
  //           this.createService.createItRecordFn(
  //             `${GlobalConstants.rootEmployeeCollection}`,
  //             incomingLinkEmail,
  //             formData
  //           )


  //           this.afAuth.signInWithEmailLink(incomingLinkEmail, url);
  //             this.router.navigateByUrl('/account');
  //             window.localStorage.removeItem('emailForSignIn');

  //           const message = 'Signing in...';
  //         const snackClass = ['snackSuccess'];

  //        this.snackbarService.openSnackBar(message, snackClass);
  //         } else {
     
  //         })

  //         console.log('DocRef Length', docRef?.length);

  //     }
  //   } catch (e) {
  //     console.log('ERROR', e);
  //     console.log('ERROR MSG', e.message);
  //     const snackClass = ['snackError'];
  //     const message = `LOGIN FAILED`;
  //     this.snackbarService.openSnackBar(message, snackClass);
  //   }
  // }

}

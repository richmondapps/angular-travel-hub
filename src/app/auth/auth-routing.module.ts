import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessComponent } from './access/access.component';
import { AuthNavComponent } from './auth-nav/auth-nav.component';
import { FederatedLoginComponent } from './federated-login/federated-login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordlessSignupComponent } from './passwordless-signup/passwordless-signup.component';
import { PasswordlessSigninComponent } from './passwordless-signin/passwordless-signin.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

const routes: Routes = [
  {path: '', component: FederatedLoginComponent},
  {path: 'passwordless-register', component: PasswordlessSigninComponent},
{path: 'passwordless-signin', component: PasswordlessSigninComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
  
  ]
})
export class AuthRoutingModule { 
  static components = [
      AccessComponent,
    AuthNavComponent,
    FederatedLoginComponent,
    RegisterComponent,
    PasswordlessSignupComponent,
    PasswordlessSigninComponent,
    EmailVerificationComponent
  ];
}

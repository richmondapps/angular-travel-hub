import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { CookieOptoutConfirmationComponent } from './cookie-optout-confirmation/cookie-optout-confirmation.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    PrivacyPolicyComponent,
    CookieOptoutConfirmationComponent
  ]
})
export class PrivacyPolicyRoutingModule { }

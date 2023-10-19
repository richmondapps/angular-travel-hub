import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminContactCenterNavComponent } from './admin-contact-center-nav/admin-contact-center-nav.component';
import { AdminContactCenterSmsNavComponent } from './admin-contact-center-sms-nav/admin-contact-center-sms-nav.component';
import { AdminContactCenterEmailNavComponent } from './admin-contact-center-email-nav/admin-contact-center-email-nav.component';
import { AdminContactCenterSmsOptInGroupComponent } from './admin-contact-center-sms-opt-in-group/admin-contact-center-sms-opt-in-group.component';
import { AdminContactCenterSmsVenuesComponent } from './admin-contact-center-sms-venues/admin-contact-center-sms-venues.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    AdminContactCenterNavComponent,
    AdminContactCenterSmsNavComponent,
    AdminContactCenterEmailNavComponent,
    AdminContactCenterSmsOptInGroupComponent,
    AdminContactCenterSmsVenuesComponent
  ]
})
export class AdminContactCenterRoutingModule { }

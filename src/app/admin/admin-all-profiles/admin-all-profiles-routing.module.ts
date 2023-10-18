import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProfileDetailComponent } from './admin-profile-detail/admin-profile-detail.component';
import { AllTravelProfilesComponent } from './all-travel-profiles/all-travel-profiles.component';

const routes: Routes = [
  { path: '', component: AllTravelProfilesComponent },
  { path: 'detail', component: AdminProfileDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class AdminAllProfilesRoutingModule {
  static components = [AllTravelProfilesComponent, AdminProfileDetailComponent];
}

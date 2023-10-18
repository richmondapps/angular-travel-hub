import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicVenueDetailComponent } from './public-venue-detail/public-venue-detail.component';
import { PublicVenuesComponent } from './public-venues.component';

const routes: Routes = [
  // {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: '', component: PublicVenuesComponent},
  {path: 'i/:docId', component: PublicVenueDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class PublicVenuesRoutingModule {
  static components = [PublicVenuesComponent, PublicVenueDetailComponent];
}

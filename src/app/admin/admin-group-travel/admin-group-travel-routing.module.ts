import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGroupTravelListComponent } from './admin-group-travel-list/admin-group-travel-list.component';
import { AdminGroupTravelCreateComponent } from './admin-group-travel-create/admin-group-travel-create.component';
import { AdminGroupTravelDetailComponent } from './admin-group-travel-detail/admin-group-travel-detail.component';
import { AdminGroupTravelNavComponent } from './admin-group-travel-nav/admin-group-travel-nav.component';
import { AdminGroupTravelTitleComponent } from './admin-group-travel-title/admin-group-travel-title.component';
import { AdminGroupTravelDraftListComponent } from './admin-group-travel-draft-list/admin-group-travel-draft-list.component';
import { AdminGroupTravelArrivalCityComponent } from './admin-group-travel-arrival-city/admin-group-travel-arrival-city.component';
import { AdminSelectGroupTravelersComponent } from './admin-select-group-travelers/admin-select-group-travelers.component';
import { AdminSelectAllProfilesComponent } from './admin-select-all-profiles/admin-select-all-profiles.component';

const routes: Routes = [
  {
    path: '',
    component: AdminGroupTravelNavComponent,
    children: [
      {path: '', redirectTo: 'submitted', pathMatch: 'full'},
      {path: 'submitted', component: AdminGroupTravelListComponent},
      // {path: 'create', component: AdminGroupTravelTitleComponent},
      // {path: 'draft', component: AdminGroupTravelDraftListComponent},
    ]    
  },
  {path: 'detail', component: AdminGroupTravelDetailComponent},
  {path: 'detail/:docId', component: AdminGroupTravelDetailComponent}
  // {path: 'city', component: AdminGroupTravelArrivalCityComponent},
  // {path: 'travelers', component: AdminSelectGroupTravelersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AdminGroupTravelRoutingModule {
  static components = [
    AdminGroupTravelListComponent,
    AdminGroupTravelCreateComponent,
    AdminGroupTravelDetailComponent,
    AdminGroupTravelNavComponent,
    AdminGroupTravelTitleComponent,
    AdminGroupTravelDraftListComponent,
    AdminGroupTravelArrivalCityComponent,
    AdminSelectGroupTravelersComponent,
    AdminSelectAllProfilesComponent
  ];
 }

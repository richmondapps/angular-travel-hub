import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupTravelArrivalCityComponent } from './group-travel-arrival-city/group-travel-arrival-city.component';
import { GroupTravelDetailComponent } from './group-travel-detail/group-travel-detail.component';
import { GroupTravelDraftListComponent } from './group-travel-draft-list/group-travel-draft-list.component';
import { GroupTravelTitleComponent } from './group-travel-title/group-travel-title.component';
import { GroupsDashboardComponent } from './groups-dashboard.component';
import { SelectGroupTravelersComponent } from './select-group-travelers/select-group-travelers.component';

const routes: Routes = [
  {
    path: '',
    component: GroupsDashboardComponent,
    children: [
      { path: '', redirectTo: 'draft', pathMatch: 'full' },
      { path: 'create', component: GroupTravelTitleComponent },
      { path: 'draft', component: GroupTravelDraftListComponent },
    ],
  },
  { path: 'detail/:docId', component: GroupTravelDetailComponent },
  { path: 'detail', component: GroupTravelDetailComponent },
  { path: 'city', component: GroupTravelArrivalCityComponent },
  { path: 'travelers', component: SelectGroupTravelersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class GroupsDashboardRoutingModule {
  static components = [
    GroupsDashboardComponent,
    GroupTravelTitleComponent,
    GroupTravelDraftListComponent,
    GroupTravelDetailComponent,
    GroupTravelArrivalCityComponent,
    SelectGroupTravelersComponent,
  ];
}

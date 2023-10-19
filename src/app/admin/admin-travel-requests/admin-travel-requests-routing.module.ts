import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTravelRequestsNavComponent } from './admin-travel-requests-nav/admin-travel-requests-nav.component';
import { AdminTravelRequestsDetailComponent } from './admin-travel-requests-detail/admin-travel-requests-detail.component';
import { AdminTravelRequestsTableComponent } from './admin-travel-requests-table/admin-travel-requests-table.component';


const routes: Routes = [
 {path: '', redirectTo: 'nav', pathMatch: 'full'},
  {path: 'nav', component: AdminTravelRequestsNavComponent}, 
 {path: 'table', component: AdminTravelRequestsTableComponent
  },
  {path: 'detail', component: AdminTravelRequestsDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [ 
    
  ]
})
export class AdminTravelRequestsRoutingModule {
  static components = [
    AdminTravelRequestsNavComponent,
    AdminTravelRequestsDetailComponent,
    AdminTravelRequestsTableComponent];
 }

import {
  Component,
  NgModule
} from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
// import { AuthGuard } from 'src/app/auth/auth.guard';



import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { EmployeeMytripsComponent } from './employee-mytrips/employee-mytrips.component';
import { EmployeeRewardsComponent } from './employee-rewards/employee-rewards.component';
import { EmployeeFeedbackComponent } from './employee-feedback/employee-feedback.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { RequestSummaryComponent } from './request-summary/request-summary.component';

const routes: Routes = [{
    path: '',
    component: EmployeeDashboardComponent,
    // canActivate: [AuthGuard],
    children: [{
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: 'profile',
        component: EmployeeProfileComponent
      },
      {
        path: 'my-trips',
        component: EmployeeMytripsComponent
      },
      {
        path: 'rewards',
        component: EmployeeRewardsComponent
      },
      {
        path: 'feedback',
        component: EmployeeFeedbackComponent
      },    
       {path: 'request', loadChildren: () => import ('../requests/request.module').then(m => m.RequestModule)},    
      {
        path: 'update',
        component: UpdateProfileComponent
      },
      {
        path: 'review',
        component: RequestSummaryComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class EmployeeRoutingModule {
  static components = [
    EmployeeDashboardComponent, EmployeeProfileComponent, EmployeeMytripsComponent, EmployeeRewardsComponent,
    UpdateProfileComponent,
  ];
}

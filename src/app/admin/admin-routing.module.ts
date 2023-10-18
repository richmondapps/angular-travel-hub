import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


const routes: Routes = [{
  path: '',

  component: AdminDashboardComponent,
  children: [
    {
      path: 'auth-users',
      loadChildren: () => import('./admin-auth-users/admin-auth-users.module').then(m => m.AdminAuthUsersModule)
    },
    {path: '', redirectTo: 'bulletin-board', pathMatch: 'full'},
    {
      path: 'bulletin-board',
      loadChildren: () => import('./admin-bulletin-board/admin-bulletin-board.module').then(m => m.AdminBulletinBoardModule)
    },
    {
      path: 'bugs',
      loadChildren: () => import('./admin-bug-report/admin-bug-report.module').then(m => m.AdminBugReportModule)
    },
    {
      path: 'requests',
      loadChildren: () => import('./admin-travel-requests/admin-travel-requests.module').then(m => m.AdminTravelRequestsModule)
    },
    {
      path: 'staff',
      loadChildren: () => import('./admin-branch-staff/admin-branch-staff.module').then(m => m.AdminBranchStaffModule)
    },
    {
      path: 'calendar',
      loadChildren: () => import('./admin-calendar/admin-calendar.module').then(m => m.AdminCalendarModule)
    },
    
    {
      path: 'faq',
      loadChildren: () => import('./admin-faq/admin-faq.module').then(m => m.AdminFaqModule)
    },
 
    {
      path: 'twilio',
      loadChildren: () => import('./admin-contact-center/admin-contact-center.module').then(m => m.AdminContactCenterModule)
    }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
  ]
})
export class AdminRoutingModule {
  static components = [AdminDashboardComponent];
 }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifiedEmployeeGuard } from 'src/app/auth/guards/verified-employee.guard';

const routes: Routes = [
  {path: 'admin',
  loadChildren: () => import ('../../admin/admin.module').then(m => m.AdminModule)
  },   
  {path: 'access',
  loadChildren: () => import ('../../auth/auth.module').then(m => m.AuthModule)},
  {path: 'create-profile',
  loadChildren: () => import ('../../create-profile/create-profile.module').then(m => m.CreateProfileModule)},
  {path: 'account',
  canActivate: [VerifiedEmployeeGuard],
  loadChildren: () => import ('../../employee/employee.module').then(m => m.EmployeeModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class NavRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBranchStaffNavComponent } from './admin-branch-staff-nav/admin-branch-staff-nav.component';
import { AdminBranchStaffListComponent } from './admin-branch-staff-list/admin-branch-staff-list.component';
import { AdminBranchStaffCreateComponent } from './admin-branch-staff-create/admin-branch-staff-create.component';
import { AdminBranchStaffEditComponent } from './admin-branch-staff-edit/admin-branch-staff-edit.component';
import { AdminBranchStaffDetailComponent } from './admin-branch-staff-detail/admin-branch-staff-detail.component';
import { AdminBranchStaffDepartmentsComponent } from './admin-branch-staff-departments/admin-branch-staff-departments.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    AdminBranchStaffNavComponent,
    AdminBranchStaffListComponent,
    AdminBranchStaffCreateComponent,
    AdminBranchStaffEditComponent,
    AdminBranchStaffDetailComponent,
    AdminBranchStaffDepartmentsComponent
  ]
})
export class AdminBranchStaffRoutingModule { }

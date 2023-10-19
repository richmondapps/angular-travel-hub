import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthUsersNavComponent } from './admin-auth-users-nav/admin-auth-users-nav.component';
import { AdminAuthUsersCreateComponent } from './admin-auth-users-create/admin-auth-users-create.component';
import { AdminAuthUsersEditComponent } from './admin-auth-users-edit/admin-auth-users-edit.component';
import { AdminAuthUsersListComponent } from './admin-auth-users-list/admin-auth-users-list.component';
import { AdminAuthUsersDetailComponent } from './admin-auth-users-detail/admin-auth-users-detail.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    AdminAuthUsersNavComponent,
    AdminAuthUsersCreateComponent,
    AdminAuthUsersEditComponent,
    AdminAuthUsersListComponent,
    AdminAuthUsersDetailComponent
  ]
})
export class AdminAuthUsersRoutingModule { }

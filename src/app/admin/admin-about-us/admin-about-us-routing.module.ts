import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAboutUsDetailComponent } from './admin-about-us-detail/admin-about-us-detail.component';
import { AdminAboutUsEditComponent } from './admin-about-us-edit/admin-about-us-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAboutUsDetailComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
   
  ]
})
export class AdminAboutUsRoutingModule {
  static components = [
     AdminAboutUsDetailComponent,
    AdminAboutUsEditComponent
  ];
 }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicDepartmentsNavComponent } from './public-departments-nav/public-departments-nav.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    PublicDepartmentsNavComponent
  ]
})
export class PublicDepartmentsRoutingModule { }

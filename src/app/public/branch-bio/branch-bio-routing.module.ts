import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchBioComponent } from './branch-bio/branch-bio.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    BranchBioComponent
  ]
})
export class BranchBioRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HiringEventsListComponent } from './hiring-events-list/hiring-events-list.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    HiringEventsListComponent
  ]
})
export class HiringEventsRoutingModule { }

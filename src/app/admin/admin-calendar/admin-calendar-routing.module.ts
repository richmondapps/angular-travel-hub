import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCalendarNavComponent } from './admin-calendar-nav/admin-calendar-nav.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    AdminCalendarNavComponent
  ]
})
export class AdminCalendarRoutingModule { }

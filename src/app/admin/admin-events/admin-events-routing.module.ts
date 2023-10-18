import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEventsNavComponent } from './admin-events-nav/admin-events-nav.component';
import { AdminEventsDetailComponent } from './admin-events-detail/admin-events-detail.component';
import { AdminEventsListComponent } from './admin-events-list/admin-events-list.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    AdminEventsNavComponent,
    AdminEventsDetailComponent,
    AdminEventsListComponent
  ]
})
export class AdminEventsRoutingModule { }

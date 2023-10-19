import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelDashboardComponent } from './hotel-dashboard.component';

const routes: Routes = [{ path: '', component: HotelDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelDashboardRoutingModule {
  static components = [HotelDashboardComponent];
}

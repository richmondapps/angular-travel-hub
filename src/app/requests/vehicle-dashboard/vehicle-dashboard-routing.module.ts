import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleDashboardComponent } from './vehicle-dashboard.component';
import { OneWayRentalComponent } from './one-way-rental/one-way-rental.component';
import { ReturnRentalComponent } from './return-rental/return-rental.component';

const routes: Routes = [  
  {  path: '', component: VehicleDashboardComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    
  ]
})
export class VehicleDashboardRoutingModule {
  static components = [
    VehicleDashboardComponent,
    OneWayRentalComponent,
    ReturnRentalComponent];
 }

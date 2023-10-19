import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDashboardRoutingModule } from './vehicle-dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [VehicleDashboardRoutingModule.components],
  imports: [CommonModule, VehicleDashboardRoutingModule, SharedModule],
})
export class VehicleDashboardModule {}

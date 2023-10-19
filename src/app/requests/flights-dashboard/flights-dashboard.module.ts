import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightsDashboardRoutingModule } from './flights-dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [FlightsDashboardRoutingModule.components],
  imports: [CommonModule, FlightsDashboardRoutingModule, SharedModule],
})
export class FlightsDashboardModule {}

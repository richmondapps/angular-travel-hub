import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelDashboardRoutingModule } from './hotel-dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [HotelDashboardRoutingModule.components],
  imports: [
    CommonModule,
    HotelDashboardRoutingModule,
    SharedModule
  ]
})
export class HotelDashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsDashboardRoutingModule } from './groups-dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [GroupsDashboardRoutingModule.components],
  imports: [
    CommonModule,
    GroupsDashboardRoutingModule,
    SharedModule
  ]
})
export class GroupsDashboardModule { }

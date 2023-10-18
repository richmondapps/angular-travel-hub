import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminGroupTravelRoutingModule } from './admin-group-travel-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdminGroupTravelRoutingModule.components],
  imports: [
    CommonModule,
    AdminGroupTravelRoutingModule,
    SharedModule
  ]
})
export class AdminGroupTravelModule { }

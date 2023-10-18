import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTravelRequestsRoutingModule } from './admin-travel-requests-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdminTravelRequestsRoutingModule.components],
  imports: [
    CommonModule,
    AdminTravelRequestsRoutingModule,
    SharedModule
  ]
})
export class AdminTravelRequestsModule { }

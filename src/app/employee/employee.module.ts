import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestSummaryComponent } from './request-summary/request-summary.component';


@NgModule({
  declarations: [EmployeeRoutingModule.components],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    SharedModule
  ],
  exports: [
    EmployeeRoutingModule.components
  ]
})
export class EmployeeModule { }

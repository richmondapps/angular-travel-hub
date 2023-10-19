import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [RequestRoutingModule.components ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    SharedModule
  ]
})
export class RequestModule { }

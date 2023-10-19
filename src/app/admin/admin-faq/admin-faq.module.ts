import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminFaqRoutingModule } from './admin-faq-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdminFaqRoutingModule.components],
  imports: [
    CommonModule,
    AdminFaqRoutingModule,
    SharedModule
  ]
})
export class AdminFaqModule { }

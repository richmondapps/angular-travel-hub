import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';


@NgModule({
  declarations: [NavRoutingModule.components],
  imports: [
    CommonModule,
    NavRoutingModule
  ],
  exports: []
})
export class NavModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAboutUsRoutingModule } from './admin-about-us-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdminAboutUsRoutingModule.components],
  imports: [
    CommonModule,
    AdminAboutUsRoutingModule,
    SharedModule
  ]
})
export class AdminAboutUsModule { }

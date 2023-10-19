import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicVenuesRoutingModule } from './public-venues-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [PublicVenuesRoutingModule.components],
  imports: [
    CommonModule,
    PublicVenuesRoutingModule,
    SharedModule
  ]
})
export class PublicVenuesModule { }

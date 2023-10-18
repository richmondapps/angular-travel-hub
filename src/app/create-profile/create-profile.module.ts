import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProfileRoutingModule } from './create-profile-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreateProfileRoutingModule.components],
  imports: [CommonModule, CreateProfileRoutingModule, SharedModule],
})
export class CreateProfileModule {}

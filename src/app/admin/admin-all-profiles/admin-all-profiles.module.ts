import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminAllProfilesRoutingModule } from './admin-all-profiles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [AdminAllProfilesRoutingModule.components],
  imports: [CommonModule, AdminAllProfilesRoutingModule, SharedModule],
})
export class AdminAllProfilesModule {}

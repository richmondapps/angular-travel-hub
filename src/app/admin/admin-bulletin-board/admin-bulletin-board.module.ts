import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminBulletinBoardRoutingModule } from './admin-bulletin-board-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdminBulletinBoardRoutingModule.components],
  imports: [
    CommonModule,
    AdminBulletinBoardRoutingModule,
    SharedModule
  ]
})
export class AdminBulletinBoardModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulletinBoardListComponent } from './bulletin-board-list/bulletin-board-list.component';
import { BulletinBoardDetailComponent } from './bulletin-board-detail/bulletin-board-detail.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    BulletinBoardListComponent,
    BulletinBoardDetailComponent
  ]
})
export class BulletinBoardRoutingModule { }

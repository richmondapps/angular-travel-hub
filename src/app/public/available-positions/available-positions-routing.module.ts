import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailablePositionsNavComponent } from './available-positions-nav/available-positions-nav.component';
import { AvailablePositionsFullTimeComponent } from './available-positions-full-time/available-positions-full-time.component';
import { AvailablePositionsPartTimeComponent } from './available-positions-part-time/available-positions-part-time.component';
import { AvailablePositionsApplyComponent } from './available-positions-apply/available-positions-apply.component';
import { AvailablePositionsDetailComponent } from './available-positions-detail/available-positions-detail.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    AvailablePositionsNavComponent,
    AvailablePositionsFullTimeComponent,
    AvailablePositionsPartTimeComponent,
    AvailablePositionsApplyComponent,
    AvailablePositionsDetailComponent
  ]
})
export class AvailablePositionsRoutingModule { }

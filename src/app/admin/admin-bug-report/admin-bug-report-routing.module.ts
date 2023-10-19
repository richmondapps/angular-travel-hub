import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBugReportCreateComponent } from './admin-bug-report-create/admin-bug-report-create.component';
import { AdminBugReportListComponent } from './admin-bug-report-list/admin-bug-report-list.component';
import { AdminBugReportDetailComponent } from './admin-bug-report-detail/admin-bug-report-detail.component';
import { AdminBugReportEditComponent } from './admin-bug-report-edit/admin-bug-report-edit.component';
import { AdminBugReportNavComponent } from './admin-bug-report-nav/admin-bug-report-nav.component';
import { AdminBugReportImageComponent } from './admin-bug-report-image/admin-bug-report-image.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    AdminBugReportCreateComponent,
    AdminBugReportListComponent,
    AdminBugReportDetailComponent,
    AdminBugReportEditComponent,
    AdminBugReportNavComponent,
    AdminBugReportImageComponent
  ]
})
export class AdminBugReportRoutingModule { }

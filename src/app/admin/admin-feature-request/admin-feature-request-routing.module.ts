import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFeatureRequestNavComponent } from './admin-feature-request-nav/admin-feature-request-nav.component';
import { AdminFeatureRequestCreateComponent } from './admin-feature-request-create/admin-feature-request-create.component';
import { AdminFeatureRequestListComponent } from './admin-feature-request-list/admin-feature-request-list.component';
import { AdminFeatureRequestEditComponent } from './admin-feature-request-edit/admin-feature-request-edit.component';
import { AdminFeatureRequestDetailComponent } from './admin-feature-request-detail/admin-feature-request-detail.component';
import { AdminFeatureRequestImageComponent } from './admin-feature-request-image/admin-feature-request-image.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    AdminFeatureRequestNavComponent,
    AdminFeatureRequestCreateComponent,
    AdminFeatureRequestListComponent,
    AdminFeatureRequestEditComponent,
    AdminFeatureRequestDetailComponent,
    AdminFeatureRequestImageComponent
  ]
})
export class AdminFeatureRequestRoutingModule { }

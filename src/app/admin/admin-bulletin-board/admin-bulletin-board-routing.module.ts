import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBulletinBoardNavComponent } from './admin-bulletin-board-nav/admin-bulletin-board-nav.component';
import { AdminBulletinBoardCreateComponent } from './admin-bulletin-board-create/admin-bulletin-board-create.component';
import { AdminBulletinBoardListComponent } from './admin-bulletin-board-list/admin-bulletin-board-list.component';
import { AdminBulletinBoardEditComponent } from './admin-bulletin-board-edit/admin-bulletin-board-edit.component';
import { AdminBulletinBoardDetailComponent } from './admin-bulletin-board-detail/admin-bulletin-board-detail.component';
import { AdminBulletinBoardPreviewComponent } from './admin-bulletin-board-preview/admin-bulletin-board-preview.component';
import { AdminBulletinBoardImageComponent } from './admin-bulletin-board-image/admin-bulletin-board-image.component';
import { AdminBulletinBoardTitleComponent } from './admin-bulletin-board-title/admin-bulletin-board-title.component';
import { AdminBulletinBoardDraftListComponent } from './admin-bulletin-board-draft-list/admin-bulletin-board-draft-list.component';
import { AdminBulletinBoardPublishedListComponent } from './admin-bulletin-board-published-list/admin-bulletin-board-published-list.component';
import { AdminBulletinBoardDateComponent } from './admin-bulletin-board-date/admin-bulletin-board-date.component';
import { AdminBulletinBoardCopyComponent } from './admin-bulletin-board-copy/admin-bulletin-board-copy.component';
import { AdminBulletinBoardLocationComponent } from './admin-bulletin-board-location/admin-bulletin-board-location.component';

const routes: Routes = [
  {
    path: '',
    component: AdminBulletinBoardNavComponent,
    children: [
      {path: '', redirectTo: 'published', pathMatch: 'full'},
      {path: 'published', component: AdminBulletinBoardPublishedListComponent},
      {path: 'draft', component: AdminBulletinBoardDraftListComponent},
      {path: 'article', component: AdminBulletinBoardDetailComponent},
      {path: 'article/:bulletinBoardSlug', component: AdminBulletinBoardDetailComponent},

      {path: 'create', component: AdminBulletinBoardCreateComponent,
      children: [
        {path: 'title', component: AdminBulletinBoardTitleComponent},
        {path: 'date', component: AdminBulletinBoardDateComponent},
        {path: 'location', component: AdminBulletinBoardLocationComponent},
        {path: 'image', component: AdminBulletinBoardImageComponent},
        {path: 'copy', component: AdminBulletinBoardCopyComponent}
      ]
    },
      {path: 'preview', component: AdminBulletinBoardPreviewComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    
  ]
})
export class AdminBulletinBoardRoutingModule {
  static components = [
    AdminBulletinBoardNavComponent,
    AdminBulletinBoardCreateComponent,
    AdminBulletinBoardListComponent,
    AdminBulletinBoardEditComponent,
    AdminBulletinBoardDetailComponent,
    AdminBulletinBoardPreviewComponent,
    AdminBulletinBoardImageComponent,
    AdminBulletinBoardTitleComponent,
    AdminBulletinBoardDraftListComponent,
    AdminBulletinBoardPublishedListComponent,
    AdminBulletinBoardDateComponent,
    AdminBulletinBoardCopyComponent,
    AdminBulletinBoardLocationComponent
  ];
 }

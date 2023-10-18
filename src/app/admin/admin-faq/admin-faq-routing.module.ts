import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFaqNavComponent } from './admin-faq-nav/admin-faq-nav.component';
import { AdminFaqListComponent } from './admin-faq-list/admin-faq-list.component';
import { AdminFaqCreateComponent } from './admin-faq-create/admin-faq-create.component';

const routes: Routes = [
  {
    path: '',
    component: AdminFaqNavComponent,
    children: [
      {redirectTo: 'create', pathMatch: 'full', path: ''},
      { path: 'create', component: AdminFaqCreateComponent},
      { path: 'list', component: AdminFaqListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
   
  ]
})
export class AdminFaqRoutingModule {
  static components = [
     AdminFaqNavComponent,
    AdminFaqListComponent,
    AdminFaqCreateComponent
  ];
 }

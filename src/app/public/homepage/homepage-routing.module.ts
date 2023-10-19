import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeaderVideoComponent } from './header-video/header-video.component';
import { ClientsComponent } from './clients/clients.component';
import { VenuesComponent } from './venues/venues.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [
    HeaderComponent,
    HeaderVideoComponent,
    ClientsComponent,
    VenuesComponent
  ]
})
export class HomepageRoutingModule { }

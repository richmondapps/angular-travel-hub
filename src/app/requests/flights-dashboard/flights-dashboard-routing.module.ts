import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleCityFlightsComponent } from './single-city-flights/single-city-flights.component';
import { MultiCityFlightsComponent } from './multi-city-flights/multi-city-flights.component';
import { FlightsDashboardComponent } from './flights-dashboard.component';
import { ReturnCityFlightsComponent } from './return-city-flights/return-city-flights.component';

const routes: Routes = [
  
  {  path: '',
  component: FlightsDashboardComponent,
    children: [
      {  path: '', redirectTo: 'options', pathMatch: 'full'},
      {  path: 'options', component: FlightsDashboardComponent},
      {  path: 'single-city', component: SingleCityFlightsComponent},
      {  path: 'multi-city', component: MultiCityFlightsComponent },
      {  path: 'return', component: ReturnCityFlightsComponent }
  ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class FlightsDashboardRoutingModule {
  static components = [
    FlightsDashboardComponent,
    SingleCityFlightsComponent,
    MultiCityFlightsComponent,
    ReturnCityFlightsComponent
  ];
 }

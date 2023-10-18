import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RequestDashboardComponent } from "./request-dashboard/request-dashboard.component";

import { VehicleDashboardComponent } from "./vehicle-dashboard/vehicle-dashboard.component";
import { OneWayVehicleComponent } from "./vehicle-dashboard/one-way-vehicle/one-way-vehicle.component";
import { ReturnVehicleComponent } from "./vehicle-dashboard/return-vehicle/return-vehicle.component";
import { TravelPurposeComponent } from "./travel-purpose/travel-purpose.component";
import { SingleComponent } from "./single/single.component";
import { MulticityComponent } from "./multicity/multicity.component";
import { GroupsComponent } from "./groups/groups.component";
import { RequestSummaryComponent } from "../employee/request-summary/request-summary.component";
import { BundleDashboardComponent } from "./bundle-dashboard/bundle-dashboard.component";
import { FlightsDashboardModule } from "./flights-dashboard/flights-dashboard.module";
import { HotelDashboardModule } from "./hotel-dashboard/hotel-dashboard.module";
import { VehicleDashboardModule } from "./vehicle-dashboard/vehicle-dashboard.module";
// import { EmployeeRoutingModule } from '../site/employee/employee-routing.module';

const routes: Routes = [
  {
    path: "",
    component: BundleDashboardComponent,
    children: [
      { path: "", redirectTo: "flights", pathMatch: "full" },
      {
        path: "flights",
        loadChildren: () =>
          import("./flights-dashboard/flights-dashboard.module").then(
            (m) => FlightsDashboardModule
          ),
      },
      {
        path: "accommodation",
        loadChildren: () =>
          import("./hotel-dashboard/hotel-dashboard.module").then(
            (m) => HotelDashboardModule
          ),
      },
      {
        path: "vehicle",
        loadChildren: () =>
          import("./vehicle-dashboard/vehicle-dashboard.module").then(
            (m) => VehicleDashboardModule
          ),
      },
    ],
  },
];

//   component: RequestDashboardComponent,
// children: [{
//       path: '',
//       redirectTo: 'single-city',
//       pathMatch: 'full'
//     },
//     {
//       path: 'single-city',
//       component: SingleComponent
//     },
//       {
//         path: 'multi-city',
//         component: MulticityComponent
//       },
//     {
//       path: 'groups',
//       component: GroupsComponent
//     },
//     {
//       path: 'review',
//       component: RequestSummaryComponent
//     },
//     {
//       path: 'accommodation',
//       component: RequestSummaryComponent
//     }
// ]
// }
//     ]

// }

// children: [{
//     path: '',
//     redirectTo: 'purpose',
//     pathMatch: 'full'

//   },
//   {
//     path: 'purpose',
//     component: TravelPurposeComponent },
//   {
//     path: 'flight',
//     component: FlightsDashboardComponent },
//   {
//     path: 'hotel',
//     component: HotelDashboardComponent},
//   {
//     path: 'vehicle',
//     component: VehicleDashboardComponent,
//     children: [
//       {
//         path: 'one-way',
//         component: OneWayVehicleComponent
//       },
//       {
//         path: 'return',
//         component: ReturnVehicleComponent
//       }
//     ]
//   }
// ]
//}

// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class RequestRoutingModule {
  static components = [
    RequestDashboardComponent,
    TravelPurposeComponent,
    SingleComponent,
    MulticityComponent,
    GroupsComponent,
    BundleDashboardComponent,
  ];
}

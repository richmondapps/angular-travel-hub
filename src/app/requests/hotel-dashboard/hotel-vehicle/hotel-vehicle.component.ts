import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { DeleteService } from 'src/app/services/delete.service';
import { ReadService } from 'src/app/services/read.service';
import { RequestsService } from '../../requests.service';

@Component({
  selector: 'app-hotel-vehicle',
  templateUrl: './hotel-vehicle.component.html',
  styleUrls: ['./hotel-vehicle.component.css'],
})
export class HotelVehicleComponent implements OnInit {
  travelRequestId: any;
  isVehicleRequired: any;
  loggedInUserEmail: any;
  vehicleConfig: any;
  accommodationStartDate: Date;
  accommodationEndDate: Date;
  patchVehicleDates: { vehiclePickUpDate: any; vehicleReturnDate: any }[];
  vehicleDate: any;
  vehicleClass = 'vehicleForFlightsClass';
  constructor(
    private dateTimeService: DateAndTimeService,
    private createService: CreateService,
    private readService: ReadService,
    private requestsService: RequestsService,
    private deleteService: DeleteService,
    private dialog: MatDialog,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );

    this.isVehicleRequired = JSON.parse(
      sessionStorage.getItem('VehicleRequestAdded')
    );
    this.travelRequestId = JSON.parse(
      sessionStorage.getItem('TravelRequestId')
    );
    this.travelRequestFn(this.travelRequestId);
  }
  async travelRequestFn(travelRequestId) {
    const d = await this.readService.returnPromiseWhereFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
      'docId',
      travelRequestId
    );

    const [f] = [...d];
    this.accommodationStartDate = new Date(
      `${f.accommodationStartDateMM}-${f.accommodationStartDateDD}-${f.accommodationStartDateYYYY}`
    );
    this.accommodationEndDate = new Date(
      `${f.accommodationEndDateMM}-${f.accommodationEndDateDD}-${f.accommodationEndDateYYYY}`
    );

    this.vehicleConfig = this.requestsService.vehicleForFlightsConfigFn(
      this.accommodationStartDate,
      this.accommodationEndDate
    );
    this.patchVehicleDates = [
      {
        vehiclePickUpDate: this.accommodationStartDate,
        vehicleReturnDate: this.accommodationEndDate,
      },
    ];
  }
  patchDates(arg0: string, patchDates: any) {
    throw new Error('Method not implemented.');
  }

  vehicleDataFn(d: any) {
    if (d.vehiclePickUpDate) {
      this.vehicleDate = this.dateTimeService.returnExtractedDatesFn(
        'vehicle',
        d.vehiclePickUpDate,
        d.vehicleReturnDate
      );
    }
    const formData = {
      ...d,
      ...this.vehicleDate,
      requestType: 'vehiclePickUp',
      vehicleRequested: true,
    };
    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.travelRequestId,
        formData
      );
      this.router.navigateByUrl('/account/review');
      sessionStorage.setItem('CompletetedVehicleStep', JSON.stringify(true));
    } catch (e) {
      console.log('Vehicle Request Error', e.message);
    }
  }
}

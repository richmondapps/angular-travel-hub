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
  selector: 'app-flights-vehicle',
  templateUrl: './flights-vehicle.component.html',
  styleUrls: ['./flights-vehicle.component.css']
})
export class FlightsVehicleComponent implements OnInit {
  vehicleConfig: any;
  vehicleDate: { [x: string]: any; startDateFull: string; startDateDD: any; startDateMM: any; startDateYYYY: any; startDateTimeStamp: number; };
  loggedInUserEmail: any;
  vehicleClass = 'vehicleForFlightsClass';
  isVehicleRequired: any;
  flightStartDate: Date;
  flightEndDate: Date;
  accommodationConfig: ({ cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; minDate: any; maxDate: any; placeholder: string; validators: { required: boolean; minlength?: undefined; maxlength?: undefined; }; options?: undefined; minRows?: undefined; maxrows?: undefined; } | { cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; placeholder: string; options: { optionName: string; value: string; }[]; validators: { required: boolean; minlength: number; maxlength: number; }; minDate?: undefined; maxDate?: undefined; minRows?: undefined; maxrows?: undefined; } | {
    cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; placeholder: string; validators: {
      minlength: number; maxlength: number; //  console.log('flightEndDate', flightEndDate);
      required?: undefined;
    }; minDate?: undefined; maxDate?: undefined; options?: undefined; minRows?: undefined; maxrows?: undefined;
  } | { cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; minRows: number; maxrows: number; placeholder: string; validators: { minlength: number; maxlength: number; required?: undefined; }; minDate?: undefined; maxDate?: undefined; options?: undefined; })[];
  patchDates: { hotelCheckInDate: any; hotelCheckOutDate: any; }[];
  patchVehicleDates: { vehiclePickUpDate: Date; vehicleReturnDate: Date; }[];
  travelRequestId: any;

  constructor(
    private dateTimeService: DateAndTimeService,
    private createService: CreateService,
    private readService: ReadService,
    private requestsService: RequestsService,
    private deleteService: DeleteService,    
    private dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(sessionStorage.getItem("LoggedInUserEmail"));
  
    this.isVehicleRequired = JSON.parse(
      sessionStorage.getItem("VehicleRequestAdded")
    );
    this.travelRequestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));
    this.travelRequestFn(this.travelRequestId);
  }

  async travelRequestFn(travelRequestId){  
    const d = await this.readService.returnPromiseWhereFn(
     `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
     'docId',
      travelRequestId
   );
     
   console.log('D', d);
   const [f] = [...d];
   this.flightStartDate = new Date(`${f.flightStartDateMM}-${f.flightStartDateDD}-${f.flightStartDateYYYY}`);
   //  console.log('flightStartDate', flightStartDate);
     this.flightEndDate = new Date(`${f.flightEndDateMM}-${f.flightEndDateDD}-${f.flightEndDateYYYY}`);
   //  console.log('flightEndDate', flightEndDate);

   this.vehicleConfig = this.requestsService.vehicleForFlightsConfigFn(this.flightStartDate, this.flightEndDate);
   this.patchVehicleDates = [
    {
      vehiclePickUpDate: this.flightStartDate,
      vehicleReturnDate: this.flightEndDate
    }
 ]
    console.log('DATES SWITCH', this.patchDates);  
 }

  vehicleDataFn(d: any) {
    console.log('Emitted Data', d);
    if(d.vehiclePickUpDate){
     this.vehicleDate = this.dateTimeService.returnExtractedDatesFn(
       'vehicle',
        d.vehiclePickUpDate,
        d.vehicleReturnDate );
    }
    const formData = {
      ...d,
      ...this.vehicleDate,
      requestType: 'vehiclePickUp',
      vehicleRequested: true
    }
    console.log('Form Data', formData);
    try {
        this.createService.createRecordFn(
          `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.travelRequestId,
          formData
        );
        this.router.navigateByUrl('/account/review');
        sessionStorage.setItem("CompletetedAccommodationStep", JSON.stringify(true)); 
      console.log('Emitted Email',  this.loggedInUserEmail);
    } catch (e) {
      console.log('Vehicle Request Error', e.message);
    }
  }



}

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
  selector: 'app-flights-accommodation',
  templateUrl: './flights-accommodation.component.html',
  styleUrls: ['./flights-accommodation.component.css']
})
export class FlightsAccommodationComponent implements OnInit {
  accommodationConfig: any;
  loggedInUserEmail: any;
  travelRequestId: any;
  isAccommodationRequired: any;
  isVehicleRequired: any;
  flightStartDate: any;
  flightEndDate: Date;
  patchDates: { hotelCheckInDate: any; hotelCheckOutDate: any; }[];
  isAccommodation: boolean;
  isFlights: boolean;
  vehicleConfig: ({ cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; minDate: any; maxDate: any; placeholder: string; validators: { required: boolean; minlength?: undefined; maxlength?: undefined; }; options?: undefined; controlHint?: undefined; minRows?: undefined; maxrows?: undefined; } | { cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; placeholder: string; options: { optionName: string; value: string; }[]; validators: { required: boolean; minlength: number; maxlength: number; }; minDate?: undefined; maxDate?: undefined; controlHint?: undefined; minRows?: undefined; maxrows?: undefined; } | { cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; placeholder: string; validators: { required: boolean; minlength: number; maxlength: number; }; minDate?: undefined; maxDate?: undefined; options?: undefined; controlHint?: undefined; minRows?: undefined; maxrows?: undefined; } | { cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; controlHint: string; valueType: string; placeholder: string; validators: { required: boolean; minlength: number; maxlength: number; }; minDate?: undefined; maxDate?: undefined; options?: undefined; minRows?: undefined; maxrows?: undefined; } | { cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; minRows: number; maxrows: number; placeholder: string; validators: { minlength: number; maxlength: number; required?: undefined; }; minDate?: undefined; maxDate?: undefined; options?: undefined; controlHint?: undefined; } | { cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; placeholder: string; validators: { minlength: number; maxlength: number; required?: undefined; }; minDate?: undefined; maxDate?: undefined; options?: undefined; controlHint?: undefined; minRows?: undefined; maxrows?: undefined; })[];
  patchVehicleDates: { vehiclePickUpDate: any; vehicleReturnDate: any; }[];
  isVehicle: boolean;
  accommodationClass = 'accommodationForFlightsClass';
  accommodationDate: { [x: string]: any; startDateFull: string; startDateDD: any; startDateMM: any; startDateYYYY: any; startDateTimeStamp: number; };

  constructor(
    private dateTimeService: DateAndTimeService,
    private createService: CreateService,
    private readService: ReadService,
    private requestsService: RequestsService,
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(sessionStorage.getItem("LoggedInUserEmail"));
    this.isAccommodationRequired = JSON.parse(
      sessionStorage.getItem("AccommodationRequestAdded")
    );
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
      
    const [f] = [...d];
    this.flightStartDate = new Date(`${f.flightStartDateMM}-${f.flightStartDateDD}-${f.flightStartDateYYYY}`);
      this.flightEndDate = new Date(`${f.flightEndDateMM}-${f.flightEndDateDD}-${f.flightEndDateYYYY}`);

      this.accommodationConfig = this.requestsService.returnFlightAndHotelConfigFn(this.flightStartDate, this.flightEndDate);
      this.patchDates = [
        {
          hotelCheckInDate: this.flightStartDate,
          hotelCheckOutDate: this.flightEndDate
        }
      ]
  }

  accommodationDataFn(d: any) {
    if(d.hotelCheckInDate){
      this.accommodationDate = this.dateTimeService.returnExtractedDatesFn(
        'accommodation',
        d.hotelCheckInDate, 
        d.hotelCheckOutDate);
    }
   const formData = {
      ...d,
      ...this.accommodationDate,
      requestType: 'hotelCheckIn',
      accommodationRequested: true
    }
    try {
        this.createService.createRecordFn(
          `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.travelRequestId,
          formData
        );
        if(this.isVehicleRequired){
           this.router.navigateByUrl('/account/request/flights/flight-vehicle', {state: {
              travelRequestId: this.travelRequestId
            }})
          sessionStorage.setItem("CompletetedAccommodationStep", JSON.stringify(true));     
        } else {
          this.router.navigateByUrl('/account/review'); 
        }
    } catch (e) {
      console.log('Accommodation Request Error', e.message);
    }
  }
  
}

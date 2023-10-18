import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-hotel-dashboard',
  templateUrl: './hotel-dashboard.component.html',
  styleUrls: ['./hotel-dashboard.component.css']
})
export class HotelDashboardComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  formCSSClass: string;
  vehicleSection = true;
  purposeClass = 'purposeClass';

  accommodationClass = 'accommodationClass';
  locationClass = 'locationClass';
  vehicleClass = 'vehicleForFlightsClass';


  loggedInUserEmail: any;
  purposeOfTravelFormConfigFn;
  travelRequestId: any;

  accommodationConfig: any;
  vehicleConfig: any;
  vehicleDate: { [x: string]: any; };
  accommodationDate: { [x: string]: any; };
  flightDate: { [x: string]: any; };
  isVehicleRequired = false;
  patchVehicleDates: { vehiclePickUpDate: Date; vehicleReturnDate: Date; }[];
  locationConfig: { cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; placeholder: string; validators: { required: boolean; minlength: number; maxlength: number; }; }[];
  constructor(
    private dateTimeService: DateAndTimeService,
    private createService: CreateService,
    private readService: ReadService,
    private requestsService: RequestsService,
    public authService: AuthService,
    private router: Router
    ) {

    }
  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(sessionStorage.getItem("LoggedInUserEmail"));
     this.travelRequestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));
    this.loadDataFn();
 
    this.accommodationConfig = this.requestsService.hotelConfigFn();
    this.locationConfig = this.requestsService.locationConfigFn();
    // this.vehicleConfig = this.requestsService.vehicleForFlightsConfigFn();
  }

  vehicleFn(){
    this.isVehicleRequired = !this.isVehicleRequired;
  }

  fetchSummaryFn(){
    this.router.navigateByUrl('/account/review');
  }

   goBack(){
    this.stepper.previous();
  }

  goForward(){
      this.stepper.next();
  }

async loadDataFn(){
  this.purposeOfTravelFormConfigFn = await this.requestsService.purposeOfTravelConfigFn(
    'cscBranchDirectory',
    'branchName',
    'asc',
    'cscEmployeeDirectory',
    'personLegalNameFirst',
    'asc'
    );
}

  reasonForTravelDataFn(d: any) {
    console.log('Emitted Data', d);
if(d.managerWhoApproved){
  const newRequestId = UidGeneratorService.newId();
    sessionStorage.removeItem("FlightRequestType");
    sessionStorage.setItem("TravelRequestId", JSON.stringify(newRequestId));
    this.travelRequestId = JSON.parse(sessionStorage.getItem("TravelRequestId"));
}

 const formData = {
     requestStatus: 'draft',
      ...d,
      docId: this.travelRequestId,
      createId: this.travelRequestId,
      readId: this.travelRequestId,
      updateId: this.travelRequestId,
      deleteId: this.travelRequestId,
      travelRequestId: this.travelRequestId,
      personEmail: this.loggedInUserEmail,
      createdDate: new Date(),
      primaryRequestType: 'accommodation'
    }
    console.log('Form Data', formData);
    try {
        this.createService.createRecordFn(
          `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.travelRequestId,
          formData
        );
        this.stepper.next();
    } catch (e) {
      console.log('Reason for Request Error', e.message);
    }
  }

  accommodationDataFn(d: any) {
    console.log('Emitted Data', d);
    if(d.hotelCheckInDate){
      this.accommodationDate = 
      this.dateTimeService.returnExtractedDatesFn(
        'accommodation',
        d.hotelCheckInDate, 
        d.hotelCheckOutDate);       
    }
    if(this.isVehicleRequired){
      const ud = this.readService.returnObservableWhereFn(
       `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
       'docId',
       this.travelRequestId
     );
 
     ud.subscribe(d => {
 
      const [f] = [...d];

      const accommodationStartDate = new Date(`${f.accommodationStartDateMM}-${f.accommodationStartDateDD}-${f.accommodationStartDateYYYY}`);
      //  console.log('accommodationStartDate', accommodationStartDate);
        const accommodationEndDate = new Date(`${f.accommodationEndDateMM}-${f.accommodationEndDateDD}-${f.accommodationEndDateYYYY}`);
        
        this.vehicleConfig = this.requestsService.vehicleForFlightsConfigFn(accommodationStartDate, accommodationEndDate); 

        this.patchVehicleDates = [
          {
            vehiclePickUpDate: accommodationStartDate,
            vehicleReturnDate: accommodationEndDate
          }
        ]
        console.log('VEH DATES SWITCH', this.patchVehicleDates)
     })
    }

   const formData = {
      ...d,
      ...this.accommodationDate,
      accommodationRequested: true
    }
    console.log('Form Data', formData);
    try {
        this.createService.createRecordFn(
          `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.travelRequestId,
          formData
        );
        if(this.isVehicleRequired){
          this.stepper.selected.completed = true;
          this.stepper.next();
        } else {
          this.router.navigateByUrl('/account/review');
        }

    } catch (e) {
      console.log('Accommodation Request Error', e.message);
    }
  }

  vehicleDataFn(d: any) {
    console.log('Emitted Data', d);
    if(d.vehiclePickUpDate){
     this.vehicleDate = 
     this.dateTimeService.returnExtractedDatesFn(
       'vehicle',
        d.vehiclePickUpDate,
        d.vehicleReturnDate );
    }

   const formData = {
      ...d,
      ...this.vehicleDate,
      vehicleRequested: true
    }
    console.log('Form Data', formData);
    try {
        this.createService.createRecordFn(
          `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.travelRequestId,
          formData
        );
        this.router.navigateByUrl('/account/review');
    } catch (e) {
      console.log('Vehicle Request Error', e.message);
    }
  }
}

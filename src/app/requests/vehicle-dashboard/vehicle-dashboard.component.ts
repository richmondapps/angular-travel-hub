import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { RequestsService } from '../requests.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
@Component({
  selector: 'app-vehicle-dashboard',
  templateUrl: 'vehicle-dashboard.component.html',
  styleUrls: ['vehicle-dashboard.component.css']
})
export class VehicleDashboardComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  vehicleConfig;
  loggedInUserEmail: any;
  vehicleDate: { [x: string]: any; };
  travelRequestId: any;
  purposeClass = 'purposeClass';
  reasonForTravel ="ReasonForTravel";
  vehicleSection = true;
  vehicleClass = "vehicleClass";

  purposeOfTravelFormConfigFn: any;
  constructor(
    private requestsService: RequestsService,
    private dateTimeService: DateAndTimeService,
    private router: Router,
    private createService: CreateService
    ) {}

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(sessionStorage.getItem('LoggedInUserEmail'));
    this.loadDataFn();

    
    this.vehicleConfig = this.requestsService.vehicleConfigFn();
  }


  returnConvertedVehicleDatesFn(vehicleReturnDate){

  const vd = {
   
    vehicleReturnDD: vehicleReturnDate.getDate(),
    vehicleReturnMM: vehicleReturnDate.getMonth() + 2,
    vehicleReturnYYYY: vehicleReturnDate.getFullYear()
  }
  return vd;
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
    sessionStorage.setItem("TravelRequestId", JSON.stringify(newRequestId));
    sessionStorage.removeItem("FlightRequestType");
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
      primaryRequestType: 'vehicle',
      vehicleRequestLabel: 'Vehicle Rental'
    }
    console.log('Form Data', formData);
    try {
        this.createService.createRecordFn(
          `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.travelRequestId,
          formData
        );
        this.stepper.next();
      console.log('Emitted Email',  this.loggedInUserEmail);
    } catch (e) {
      console.log('Reason for Request Error', e.message);
    }
  }

  

  vehicleDataFn(d: any) {
    this.travelRequestId = JSON.parse(sessionStorage.getItem("TravelRequestId"));

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
          `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.travelRequestId,
          formData
        );
        this.router.navigateByUrl('/account/review');
    } catch (e) {
      console.log('Vehicle Request Error', e.message);
    }
  }

  fetchSummaryFn(){
    this.router.navigateByUrl('/account/review');
  }

}

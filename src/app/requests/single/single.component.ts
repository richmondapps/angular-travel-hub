import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { DynamicFormConfigService } from 'src/app/services/dynamic-form-config.service';
import { ReadService } from 'src/app/services/read.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { RequestsService } from '../requests.service';
@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css'],
})
export class SingleComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  requestId: any;
  request: any;
  formCSSClass: string;
  showFlightSection: boolean;
  showAccommodationSection: boolean;
  showVehicleSection: boolean;
  addFlight = false;
  flightSection = false;
  accommodationSection = true;
  vehicleSection = true;
  purposeClass = 'purposeClass';
  multiFlightClass = 'multiFlightClass';
  singleFlightClass = 'singleFlightClass';
  returnFlightClass = 'returnFlightClass';
  accommodationClass = 'accommodationClass';
  vehicleClass = 'vehicleClass';
  requestType: 'flights' | 'accommodation' | 'vehicle' | 'flights' | 'purpose' =
    'purpose';
  flightType: 'single' | 'return' | 'multi' = 'return';
  returnFlightFormConfig;
  singleFlightFormConfig;
  multiFlightFormConfig;
  loggedInUserEmail: any;
  purposeOfTravelFormConfigFn;
  travelRequestId: any;
  flightDeptDD: any;
  flightDeptMM: any;
  flightDeptYYYY: any;
  flightReturnDD: any;
  flightReturnMM: any;
  flightReturnYYYY: any;
  accommodationConfig: any;
  vehicleConfig: any;
  vehicleDate: { [x: string]: any };
  accommodationDate: { [x: string]: any };
  flightDate: { [x: string]: any };
  isAccommodationRequired = true;
  constructor(
    private dateTimeService: DateAndTimeService,
    private createService: CreateService,
    private readService: ReadService,
    private requestsService: RequestsService,
    public authService: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
    //  this.travelRequestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));
    this.loadDataFn();
    this.singleFlightFormConfig = this.requestsService.singleFlightConfigFn();
    this.returnFlightFormConfig = this.requestsService.returnFlightConfigFn();
    this.accommodationConfig = this.requestsService.hotelConfigFn();
    this.vehicleConfig = this.requestsService.vehicleConfigFn();
  }

  accomodationFn() {
    this.isAccommodationRequired = !this.isAccommodationRequired;
  }

  fetchSummaryFn() {
    // this.request  =  this.readService.returnRecordsWhereValuechangesFn(
    //   `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
    //   'travelRequestId',
    //   this.travelRequestId
    // );
    this.router.navigateByUrl('/account/review');
  }
  skipSectionFn(e) {
    this.stepper.next();
  }
  goBack() {
    this.stepper.previous();
  }

  goForward() {
    this.stepper.next();
  }

  submitRequestFn(val: string) {
    const formData = {
      requestStatus: val,
    };
    this.createService.createRecordFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
      this.travelRequestId,
      formData
    );
  }

  async loadDataFn() {
    this.purposeOfTravelFormConfigFn =
      await this.requestsService.purposeOfTravelConfigFn(
        'raBranchDirectory',
        'branchName',
        'asc',
        'raEmployeeDirectory',
        'personLegalNameFirst',
        'asc'
      );
  }

  reasonForTravelDataFn(d: any) {
    console.log('Emitted Data', d);

    if (d.managerWhoApproved) {
      const newRequestId = UidGeneratorService.newId();
      sessionStorage.setItem('TravelRequestId', JSON.stringify(newRequestId));
      this.travelRequestId = JSON.parse(
        sessionStorage.getItem('TravelRequestId')
      );
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
      createdDate: new Date(),
    };
    console.log('Form Data', formData);
    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.travelRequestId,
        formData
      );
      this.stepper.next();
      console.log('Emitted Email', this.loggedInUserEmail);
    } catch (e) {
      console.log('SESSION ERROR', e.message);
    }
  }

  flightDataFn(d: any) {
    console.log('Emitted Data', d);

    if (d.flightReturnDate) {
      this.flightDate = this.dateTimeService.returnExtractedDatesFn(
        'flight',
        d.flightDeptDate,
        d.flightReturnDate
      );
      d.flightReturnRequested = true;
    } else {
      this.flightDate = this.dateTimeService.returnExtractedDatesFn(
        'flight',
        d.flightDeptDate
      );
      d.flightDepartureRequested = true;
    }

    const formData = {
      ...d,
      ...this.flightDate,
    };
    console.log('Form Data', formData);

    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.travelRequestId,
        formData
      );
      this.stepper.next();
      console.log('Emitted Email', this.loggedInUserEmail);
    } catch (e) {
      console.log('SESSION ERROR', e.message);
    }
  }

  accommodationDataFn(d: any) {
    console.log('Emitted Data', d);

    if (d.hotelCheckInDate) {
      this.accommodationDate = this.dateTimeService.returnExtractedDatesFn(
        'accommodation',
        d.hotelCheckInDate,
        d.hotelCheckOutDate
      );
      d.hotelRequested = true;
    }

    const formData = {
      ...d,
      ...this.accommodationDate,
    };
    console.log('Form Data', formData);
    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.travelRequestId,
        formData
      );
      this.stepper.next();
    } catch (e) {
      console.log('SESSION ERROR', e.message);
    }
  }
  vehicleDataFn(d: any) {
    console.log('Emitted Data', d);
    if (d.vehiclePickUpDate) {
      this.vehicleDate = this.dateTimeService.returnExtractedDatesFn(
        'vehicle',
        d.vehiclePickUpDate,
        d.vehicleReturnDate
      );
      d.vehicleRequested = true;
    }

    const formData = {
      ...d,
      ...this.vehicleDate,
    };

    console.log('Form Data', formData);

    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.travelRequestId,
        formData
      );
      this.router.navigateByUrl('/account/review');

      console.log('Emitted Email', this.loggedInUserEmail);
    } catch (e) {
      console.log('SESSION ERROR', e.message);
    }
  }

  changeFlightTypeFn(val) {
    this.flightType = val;
  }

  get isSingle() {
    return this.flightType === 'single';
  }
  get isMulti() {
    return this.flightType === 'multi';
  }
  get isReturn() {
    return this.flightType === 'return';
  }

  toggleViewFn() {
    this.flightSection = !this.flightSection;
  }
  changeViewFn(val) {
    this.requestType = val;
  }

  get isPurpose() {
    return this.requestType === 'purpose';
  }
  get isFlights() {
    return this.requestType === 'flights';
  }
  get isAccommodation() {
    return this.requestType === 'accommodation';
  }
  get isVehicle() {
    return this.requestType === 'vehicle';
  }

  showFlights() {
    this.showFlightSection = !this.showFlightSection;
  }
  showAccommodation() {
    this.showAccommodationSection = !this.showAccommodationSection;
  }
  showVehicle() {
    this.showVehicleSection = !this.showVehicleSection;
  }
}

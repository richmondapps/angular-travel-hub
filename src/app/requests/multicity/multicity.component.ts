import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { DynamicFormConfigService } from 'src/app/services/dynamic-form-config.service';
import { ReadService } from 'src/app/services/read.service';
import { RequestsService } from '../requests.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';

@Component({
  selector: 'app-multicity',
  templateUrl: './multicity.component.html',
  styleUrls: ['./multicity.component.css'],
})
export class MulticityComponent implements OnInit {
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
  multicityLegs: any;

  constructor(
    private dateTimeService: DateAndTimeService,
    private createService: CreateService,
    private readService: ReadService,
    private requestsService: RequestsService,
    public authService: AuthService
  ) {
    const newRequestId = UidGeneratorService.newId();
    this.travelRequestId = sessionStorage.setItem(
      'TravelRequestId',
      JSON.stringify(newRequestId)
    );
  }
  ngOnInit(): void {
    this.requestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));

    this.loadDataFn();

    this.multiFlightFormConfig = this.requestsService.mutliFlightConfigFn();

    console.log(this.multiFlightFormConfig);
  }

  fetchSummaryFn() {
    this.readService
      .returnObservableWhereFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        'travelRequestId',
        this.requestId
      )
      .subscribe((d) => {
        if (d?.length) {
          console.log('ITINERAY BUILD', d);
          this.request = d;
        }
      });
  }
  goBack() {
    this.stepper.previous();
  }

  goForward() {
    this.stepper.next();
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
  flightDataFn(e) {
    console.log('FLIGHT EVENT', e);
    if (e.d === 'nextStep') {
      this.stepper.next();
    }

    if (e.d === 'multiFlight') {
      this.accommodationSection = false;
      this.vehicleSection = false;
    } else {
      this.accommodationSection = true;
      this.vehicleSection = true;
    }
  }

  fetchMultiFlightsFn() {
    this.multicityLegs = this.readService.returnObservableOrderByFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.requestId}/multiFlights`,
      'createdDate',
      'asc'
    );
  }
  emittedChildDataFn(d: any) {
    console.log('Emitted Data', d);
    this.requestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));

    if (d.flightDeptDate) {
      d.flightDeptDD = d.flightDeptDate.getDate();
      d.flightDeptMM = d.flightDeptDate.getMonth() + 1;
      d.flightDeptYYYY = d.flightDeptDate.getFullYear();
    }

    const formData = {
      requestStatus: 'draft',
      ...d,
      travelRequestId: this.requestId,
      personEmail: this.loggedInUserEmail,
      createdDate: new Date(),
    };

    console.log('Form Data', formData);

    try {
      this.loggedInUserEmail = JSON.parse(
        sessionStorage.getItem('LoggedInUserEmail')
      );

      const multiFlightId = UidGeneratorService.newId();
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.requestId}/multiFlights`,
        multiFlightId,
        formData
      );
      this.fetchMultiFlightsFn();

      console.log('Emitted Email', this.loggedInUserEmail);
    } catch (e) {
      console.log('SESSION ERROR', e);
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

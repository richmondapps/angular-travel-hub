import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { DynamicFormConfigService } from 'src/app/services/dynamic-form-config.service';
import { ReadService } from 'src/app/services/read.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-request-dashboard',
  templateUrl: './request-dashboard.component.html',
  styleUrls: ['./request-dashboard.component.css'],
})
export class RequestDashboardComponent implements OnInit {
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

  constructor(
    private dateTimeService: DateAndTimeService,
    private createService: CreateService,
    private readService: ReadService,
    private requestsService: RequestsService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.requestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));

    this.loadDataFn();
    this.singleFlightFormConfig = this.requestsService.singleFlightConfigFn();
    this.returnFlightFormConfig = this.requestsService.returnFlightConfigFn();
    this.multiFlightFormConfig = this.requestsService.mutliFlightConfigFn();
    this.accommodationConfig = this.requestsService.hotelConfigFn();
    this.vehicleConfig = this.requestsService.vehicleConfigFn();
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
  emittedChildDataFn(d: any) {
    console.log('Emitted Data', d);
    this.requestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));

    if (d.flightDeptDate) {
      d.flightDeptDD = d.flightDeptDate.getDate();
      d.flightDeptMM = d.flightDeptDate.getMonth() + 1;
      d.flightDeptYYYY = d.flightDeptDate.getFullYear();
    }
    if (d.flightReturnDate) {
      d.flightReturnDD = d.flightReturnDate.getDate();
      d.flightReturnMM = d.flightReturnDate.getMonth() + 1;
      d.flightReturnYYYY = d.flightReturnDate.getFullYear();
    }
    if (d.hotelCheckInDate) {
      d.hotelCheckInDD = d.hotelCheckInDate.getDate();
      d.hotelCheckInMM = d.hotelCheckInDate.getMonth() + 1;
      d.hotelCheckInYYYY = d.hotelCheckInDate.getFullYear();
    }
    if (d.hotelCheckOutDate) {
      d.hotelCheckOutDD = d.hotelCheckOutDate.getDate();
      d.hotelCheckOutMM = d.hotelCheckOutDate.getMonth() + 1;
      d.hotelCheckOutYYYY = d.hotelCheckOutDate.getFullYear();
    }
    if (d.vehiclePickUpDate) {
      d.vehiclePickUpDD = d.vehiclePickUpDate.getDate();
      d.vehiclePickUpMM = d.vehiclePickUpDate.getMonth() + 1;
      d.vehiclePickUpYYYY = d.vehiclePickUpDate.getFullYear();
    }
    if (d.vehicleReturnDate) {
      d.vehicleReturnDD = d.vehicleReturnDate.getDate();
      d.vehicleReturnMM = d.vehicleReturnDate.getMonth() + 1;
      d.vehicleReturnYYYY = d.vehicleReturnDate.getFullYear();
    }
    const formData = {
      requestStatus: 'draft',
      ...d,
      travelRequestId: this.requestId,
      createdDate: new Date(),
    };

    if (d.formCSSClass !== 'multiFlightClass') {
      this.stepper.next();
    }

    console.log('Form Data', formData);

    try {
      this.loggedInUserEmail = JSON.parse(
        sessionStorage.getItem('LoggedInUserEmail')
      );

      if (d.formCSSClass === 'multiFlightClass') {
        const multiFlightId = UidGeneratorService.newId();
        this.createService.createRecordFn(
          `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.requestId}/multiFlights`,
          multiFlightId,
          formData
        );
      } else {
        this.createService.createRecordFn(
          `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.requestId,
          formData
        );
      }
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

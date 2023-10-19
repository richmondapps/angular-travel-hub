import { BreakpointObserver } from '@angular/cdk/layout';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { RequestsService } from '../requests.service';

export interface Flights {
  cssWrapperClass?: string;
  cssWrapperId?: string;
  controlLabel: string;
  controlName: string;
  controlType: string;
  valueType: string;
  placeholder: string;
  options?: any;
  validators?: any;
  minDate: any;
  maxlength?: any;
  minlength?: any;
  required?: boolean;
}
@Component({
  selector: 'app-flights-dashboard',
  templateUrl: './flights-dashboard.component.html',
  styleUrls: ['./flights-dashboard.component.css'],
})
export class FlightsDashboardComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper;
  stepperOrientation: Observable<StepperOrientation>;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  vehicleSection = true;
  purposeClass = 'purposeClass';
  accommodationClass = 'accommodationForFlightsClass';
  vehicleClass = 'vehicleForFlightsClass';
  flightType: 'single' | 'return' | 'multi' = 'return';
  loggedInUserEmail: any;
  purposeOfTravelFormConfigFn;
  patchReason;
  travelRequestId: any;

  accommodationConfig: any;
  vehicleConfig: any;
  vehicleDate: { [x: string]: any };
  accommodationDate: { [x: string]: any };
  isAccommodationRequired: boolean;

  reasonForTravel = 'ReasonForTravel';

  multiCityList: any;
  isReturnFlight = true;
  isOneWayFlight = true;
  isMuliCityFlights = true;
  isVehicleRequired: boolean;
  patchDates;

  flightStartDate: Date;
  flightEndDate: Date;
  patchVehicleDates: { vehiclePickUpDate: Date; vehicleReturnDate: Date }[];
  activeSingle: boolean;
  activeMulti: boolean;
  activeReturn: boolean;

  constructor(
    private dateTimeService: DateAndTimeService,
    private createService: CreateService,
    private readService: ReadService,
    private requestsService: RequestsService,
    public authService: AuthService,
    private router: Router,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }
  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
    this.travelRequestId = JSON.parse(
      sessionStorage.getItem('TravelRequestId')
    );

    this.loadDataFn();
    this.returnFlightRequestTypeFn();
  }

  returnFlightRequestTypeFn() {
    const rt = this.readService.returnObservableWhereFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
      'docId',
      this.travelRequestId
    );
    rt.subscribe((d) => {
      const [f] = [...d];  
      switch (f?.flightRequestType) {
        case 'returnFlight':
          this.isReturnFlight = true;
          this.isOneWayFlight = false;
          this.isMuliCityFlights = false;
          this.changeFlightTypeFn('return');
          break;

        case 'oneWayFlight':
          this.isReturnFlight = false;
          this.isOneWayFlight = true;
          this.isMuliCityFlights = false;
          this.changeFlightTypeFn('single');
          break;

        case 'multiCityFlights':
          this.isReturnFlight = false;
          this.isOneWayFlight = false;
          this.isMuliCityFlights = true;
          this.changeFlightTypeFn('multi');
          break;

        default:
          this.isReturnFlight = true;
          this.isOneWayFlight = true;
          this.isMuliCityFlights = true;
          this.changeFlightTypeFn('return');
          break;
      }
    });
  }

  toggleAccommodationOptionFn() {
    this.isAccommodationRequired = !this.isAccommodationRequired;
  }

  toggleVehicleOptionFn() {
    this.isVehicleRequired = !this.isVehicleRequired;
  }

  fetchSummaryFn() {
    this.router.navigateByUrl('/account/review');
  }

  selectionChange(e) {
    sessionStorage.setItem(
      'CurrentStepperIndex',
      JSON.stringify(e.selectedIndex)
    );
  }

  reasonForTravelDataFn(d: any) {
    if (d.managerWhoApproved) {
      const newRequestId = UidGeneratorService.newId();
      sessionStorage.setItem('TravelRequestId', JSON.stringify(newRequestId));
      sessionStorage.removeItem('FlightRequestType');
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
      personEmail: this.loggedInUserEmail,
      createdDate: new Date(),
      primaryRequestType: 'flight',
    };
    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.travelRequestId,
        formData
      );

      sessionStorage.setItem('CurrentStepperIndex', JSON.stringify(0));
      const CurrentStepperIndex = JSON.parse(
        sessionStorage.getItem('CurrentStepperIndex')
      );
      const s = (this.stepper.selectedIndex = CurrentStepperIndex + 1);
      return s;
    } catch (e) {
      console.log('Reason for Request Error', e.message);
    }
  }

  flightSubmittedFn(e) {
    if (this.isAccommodationRequired || this.isVehicleRequired) {
      const ud = this.readService.returnObservableWhereFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        'docId',
        this.travelRequestId
      );

      ud.subscribe((d) => {
        const [f] = [...d];
        const flightStartDate = new Date(
          `${f.flightStartDateMM}-${f.flightStartDateDD}-${f.flightStartDateYYYY}`
        );
        const flightEndDate = new Date(
          `${f.flightEndDateMM}-${f.flightEndDateDD}-${f.flightEndDateYYYY}`
        );
        this.accommodationConfig =
          this.requestsService.returnFlightAndHotelConfigFn(
            flightStartDate,
            flightEndDate
          );
        this.patchDates = [
          {
            hotelCheckInDate: flightStartDate,
            hotelCheckOutDate: flightEndDate,
          },
        ];
        this.vehicleConfig = this.requestsService.vehicleForFlightsConfigFn(
          flightStartDate,
          flightEndDate
        );
        this.patchVehicleDates = [
          {
            vehiclePickUpDate: flightStartDate,
            vehicleReturnDate: flightEndDate,
          },
        ];
      });
      const CurrentStepperIndex = JSON.parse(
        sessionStorage.getItem('CurrentStepperIndex')
      );
      const s = (this.stepper.selectedIndex = CurrentStepperIndex + 1);
      return s;
    } else {
      this.router.navigateByUrl('/account/review');
    }
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

  accommodationDataFn(d: any) {
    if (d.hotelCheckInDate) {
      this.accommodationDate = this.dateTimeService.returnExtractedDatesFn(
        'accommodation',
        d.hotelCheckInDate,
        d.hotelCheckOutDate
      );
    }
    const formData = {
      ...d,
      ...this.accommodationDate,
      requestType: 'hotelCheckIn',
      accommodationRequested: true,
    };
    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.travelRequestId,
        formData
      );
      if (this.isVehicleRequired) {
        this.stepper.next();
      } else {
        this.router.navigateByUrl('/account/review');
      }
    } catch (e) {
      console.log('Accommodation Request Error', e.message);
    }
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
    } catch (e) {
      console.log('Vehicle Request Error', e.message);
    }
  }

  changeFlightTypeFn(val) {
    this.flightType = val;
    switch (this.flightType) {
      case 'single':
        this.activeSingle = true;
        break;

      case 'multi':
        this.activeMulti = true;
        break;
      case 'return':
        this.activeReturn = true;
        break;
    }
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
}

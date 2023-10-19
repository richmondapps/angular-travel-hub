import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { RequestsService } from '../../requests.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';

@Component({
  selector: 'app-return-city-flights',
  templateUrl: './return-city-flights.component.html',
  styleUrls: ['./return-city-flights.component.css'],
})
export class ReturnCityFlightsComponent implements OnInit {
  returnRequestName = 'Return Flight';
  returnFlightClass = 'returnFlightClass';
  returnFlightFormConfig: any;
  loggedInUserEmail: any;
  travelRequestId: any;
  flightDate: { [x: string]: any };
  stepper: any;
  @Output() flightSubmitted = new EventEmitter();
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
    sessionStorage.setItem('FlightRequestType', JSON.stringify(null));
    this.returnFlightFormConfig = this.requestsService.returnFlightConfigFn();
    this.returnFlightRequestTypeFn();
  }

  returnFlightRequestTypeFn() {
    const flightRequestType = JSON.parse(
      sessionStorage.getItem('FlightRequestType')
    );

    this.travelRequestId = JSON.parse(
      sessionStorage.getItem('TravelRequestId')
    );

    const rt = this.readService.returnObservableWhereFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
      'docId',
      this.travelRequestId
    );

    rt.subscribe((d) => {
      const [f] = [...d];
    });
  }

  flightStartDateFn(e: any) {
    this.returnFlightFormConfig = this.requestsService.returnFlightConfigFn(e);
  }

  flightDataFn(d: any) {
    sessionStorage.setItem('FlightRequestType', JSON.stringify('returnFlight'));
    this.travelRequestId = JSON.parse(
      sessionStorage.getItem('TravelRequestId')
    );

    this.flightDate = this.dateTimeService.returnExtractedDatesFn(
      'flight',
      d.flightDeptDate,
      d.flightReturnDate
    );

    const formData = {
      ...d,
      ...this.flightDate,
      flightRequestType: 'returnFlight',
      flightRequestLabel: 'Return',
      flightDepartureRequested: true,
    };

    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.travelRequestId,
        formData
      );
      this.flightSubmitted.emit('flight submitted');
    } catch (e) {
      console.log('SESSION ERROR', e.message);
    }
  }
}

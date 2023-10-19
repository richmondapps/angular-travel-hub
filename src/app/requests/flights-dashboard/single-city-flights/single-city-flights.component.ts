import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { RequestsService } from '../../requests.service';

@Component({
  selector: 'app-single-city-flights',
  templateUrl: './single-city-flights.component.html',
  styleUrls: ['./single-city-flights.component.css'],
})
export class SingleCityFlightsComponent implements OnInit {
  flightDate: { [x: string]: any };
  travelRequestId: any;
  loggedInUserEmail: any;
  stepper: any;
  OneWayRequestName = 'One Way Flight';
  singleFlightFormConfig: any;
  singleFlightClass = 'singleFlightClass';
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
    this.singleFlightFormConfig = this.requestsService.singleFlightConfigFn();
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
    this.travelRequestId = JSON.parse(
      sessionStorage.getItem('TravelRequestId')
    );
  }

  flightDataFn(d: any) {
    sessionStorage.setItem('FlightRequestType', JSON.stringify('oneWayFlight'));
    this.flightDate = this.dateTimeService.returnExtractedDatesFn(
      'flight',
      d.flightDeptDate
    );
    const formData = {
      ...d,
      ...this.flightDate,
      flightRequestType: 'oneWayFlight',
      flightRequestLabel: 'One Way',
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

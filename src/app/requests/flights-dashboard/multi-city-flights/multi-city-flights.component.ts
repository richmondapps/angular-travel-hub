import { Component, OnInit } from '@angular/core';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { RequestsService } from '../../requests.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { DeleteService } from 'src/app/services/delete.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multi-city-flights',
  templateUrl: './multi-city-flights.component.html',
  styleUrls: ['./multi-city-flights.component.css']
})
export class MultiCityFlightsComponent implements OnInit {
  multiFlightFormConfig;
  loggedInUserEmail: any;
  travelRequestId: any;
  multiCityRequestName = "Multi City";
  multiFlightClass = 'multiFlightClass';
  multiCityList: any;
  flightDate: { [x: string]: any; };
  stepper: any;
  multiCityPatchValues: any;
  isShowForm =  false;
  multiFlightDate: Date;
  totalFlights: any;
  constructor(
    private readService: ReadService,
    private requestsService: RequestsService,
    private dateTimeService: DateAndTimeService,
    private createService: CreateService,
    private deleteService: DeleteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(sessionStorage.getItem("LoggedInUserEmail"));
    this.travelRequestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));

    this.multiCityList =  this.readService.returnObservableOrderByFn(
      `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,
      'flightDeptDate',
      'asc'
    )

    this.multiCityList.subscribe(d => {
      this.totalFlights = d.length;
    })
  
  }

  addFlightLegFn(){
   this.isShowForm = true;

  

   const getLastFlightDate =  this.readService.returnObservableOrderByFn(
    `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,
    'flightDeptDate',
    'desc'
  )
 console.log('getLastFlightDate', getLastFlightDate);

  getLastFlightDate.subscribe(d => {
    console.log('MCF', d);
 
    if(!d?.length){
      this.multiFlightFormConfig = this.requestsService.mutliFlightConfigFn();


   
    } else {

    const f = d[0]; 
    const flightDeptDate = f.flightDeptDate; 
    const newMinDeptDate = new Date(flightDeptDate);     

    const startDay = newMinDeptDate.getDate();
    const startMonth = (newMinDeptDate.getMonth() + 1);
    const startYear = newMinDeptDate.getFullYear();
    this.multiFlightDate = new Date(`${startMonth}-${startDay}-${startYear}`);

      this.multiFlightFormConfig = this.requestsService.mutliFlightConfigFn(this.multiFlightDate);
      const pv = [{
      flightFromAirport: f.flightToAirport,
      flightDeptDate: this.multiFlightDate
      }];
      this.multiCityPatchValues = pv;
    }
  })
  }

  fetchSummaryFn(){
    this.router.navigateByUrl('/account/review');
  }

  deleteFn(id){
    console.log('MC ID', id);
     this.deleteService.deleteRecordFn(
      `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,
      id
     )
  }

  flightDataFn(d: any) {
    console.log('Emitted Data', d);
    this.isShowForm = false;
 sessionStorage.setItem('FlightRequestType', JSON.stringify('multiCityFlights'));
 
      this.flightDate = this.dateTimeService.returnExtractedDatesFn(
        'flight',
        d.flightDeptDate
         )
      d.flightDepartureRequested = true;


 const formData = {
      ...d,
      ...this.flightDate,
      flightRequestType: 'multiCityFlights',
      flightRequestLabel: 'Multi-City'
    }
    console.log('Form Data', formData);
   const id = UidGeneratorService.newId();
        const multiFlightData = {
          ...d,
          docId: id,
          readId:id,
          deleteId: id,
          updateId: id,
          travelRequestId: this.travelRequestId,
          ...this.flightDate
        }
    try {
     
        this.createService.createRecordFn(
          `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,
         id,
          multiFlightData
        );
    
         this.createService.createRecordFn(
          `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.travelRequestId,
          formData
        );
      
    
       
      
      console.log('Emitted Email',  this.loggedInUserEmail);
    } catch (e) {
      console.log('SESSION ERROR', e.message);
    }
  }

}

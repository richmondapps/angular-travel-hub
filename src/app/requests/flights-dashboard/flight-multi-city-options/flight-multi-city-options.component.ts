import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { EditDocumentDialogComponent } from 'src/app/shared/edit-document-dialog/edit-document-dialog.component';
import { RequestsService } from '../../requests.service';

@Component({
  selector: 'app-flight-multi-city-options',
  templateUrl: './flight-multi-city-options.component.html',
  styleUrls: ['./flight-multi-city-options.component.css']
})
export class FlightMultiCityOptionsComponent implements OnInit {
  multiCityAccommodation: any;
  multiCityList: any;

  loggedInUserEmail: any;
  travelRequestId: any;
  patchValues: any;
  constructor(
    private readService: ReadService,
    private createService: CreateService,
    private requestService: RequestsService,
    private dateTime: DateAndTimeService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(sessionStorage.getItem("LoggedInUserEmail"));
    this.travelRequestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));
    this.mcListFn(this.loggedInUserEmail, this.travelRequestId);
  }


  mcListFn(loggedInUserEmail, travelRequestId){
    this.multiCityList = this.readService.returnObservableOrderByFn(
      `raEmployeeDirectory/${loggedInUserEmail}/requestedTravel/${travelRequestId}/multiFlights`,
      "flightDeptDate",
      "asc"
    );   
  }

  async addFlightLegAccommodationFn(id){
    console.log('MC ID', id);
    const d = await this.readService.returnPromiseWhereFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,
      "updateId",
      id
    );   
      console.log('D', d);
      const [f] = [...d];
      const flightStartDate = `${f.flightStartDateMM}/${f.flightStartDateDD}/${f.flightStartDateYYYY}`;
    
        const patchDates = 
          {
            accommodationRequested: true,
            multiCityLegAccommodation: true,
            multiCityLegAccommodationStartDate: flightStartDate
          }       
       
        try {
          this.createService.createRecordFn(
            `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,            
            id,
            patchDates
          )
        } catch (e) {
          console.log('Error', e);
        }
     
  }
  removeFlightLegAccommodationFn(id){
    const a = {
      accommodationRequested: false,
      multiCityLegAccommodation: false,
      multiCityLegAccommodationStartDate: ''
    }
    this.createService.createRecordFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,            
      id,
      a
    )
  }
  async addFlightLegVehicleFn(id){
    console.log('MC ID', id);
    const d = await this.readService.returnPromiseWhereFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,
      "updateId",
      id
    );   
      console.log('D', d);
      const [f] = [...d];
      const flightStartDate = `${f.flightStartDateMM}/${f.flightStartDateDD}/${f.flightStartDateYYYY}`;
    
        const patchDates = 
          {
            vehicleRequested: true,
            multiCityLegVehicledation: true,
            multiCityLegVehicleStartDate: flightStartDate
          }       
       
        try {
          this.createService.createRecordFn(
            `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,            
            id,
            patchDates
          )
        } catch (e) {
          console.log('Error', e);
        }
     
  }
  removeFlightLegVehicleFn(id){
    const a = {
      vehicleRequested: false,
      multiCityLegVehicledation: false,
      multiCityLegVehicleStartDate: ''
    }
    this.createService.createRecordFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,            
      id,
      a
    )
  }

  async updateNotesFn(id?: any) {
    //  console.log('DocId', this.bulletinBoardDocId);
     // console.log('config Form Name', configFormName);
      const e = this.readService.returnObservableWhereFn( `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,            
        'docId',   id);
     e.pipe(take(1))
        .subscribe(async data => {
          if (!data?.length) {
         //   console.log('NO ARRAY', data);
          } else {
         //   console.log('IS ARRAY', data);
            this.patchValues = this.dateTime.convertDate(data);
          //  console.log(data);
            // this.isShowUpdateEmployeeForm = true;
            const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
              panelClass: 'editDialog',
              data: {
                formConfig: await this.requestService.multiCityFlightLegNotesFn(),
                patchValues: this.patchValues || null
              }
            });
            dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
             // console.log('Form Data', res.data);
              if (!res.data) {
                return;
              } else {
               // console.log('BLOG RES DATA', res.data);
                 const data =  this.dateTime.convertDate(res.data);
                 const formData = {
                  ...data
                }
               console.log('Form Data', formData);
               console.log('ID', formData);
                 this.createService.createRecordFn(
                  `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,    id, 
                  formData);
              }
            });
          }
        });
    }

    removeFlightLegNoteFn(id){
      const a = {
        flightIndividualRequestNotes: ''
      }
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,            
        id,
        a
      )
    }
    fetchSummaryFn(){
        this.router.navigateByUrl('/account/review', {state: {
      travelRequestId: this.travelRequestId
    }})
    }
  
}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ReadService } from 'src/app/services/read.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UpdateService } from 'src/app/services/update.service';
import { GlobalConstants } from 'src/app/global-variables';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { DeleteService } from 'src/app/services/delete.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { EditDocumentDialogComponent } from 'src/app/shared/edit-document-dialog/edit-document-dialog.component';
import { AdminTravelRequestsService } from '../../admin-travel-requests.service';

@Component({
  selector: 'app-admin-travel-requests-detail',
  templateUrl: './admin-travel-requests-detail.component.html',
  styleUrls: ['./admin-travel-requests-detail.component.css']
})
export class AdminTravelRequestsDetailComponent implements OnInit {
  requestSummary: any;
  travelRequestId: any;
  loggedInUserEmail: any;
  flightRequestType: any;
  multiCityRequestSummary: any;
  firestoreRecordPath: string;
  firebaseStoragePath: string;
  requestDocuments: any;
  dataObj: any;
  patchValues: any;
  personEmail: any;
  constructor(
    private router: Router,
    private readService: ReadService,
    private updateService: UpdateService,
    public location: Location,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private deleteService: DeleteService,
    private travelRequestService: AdminTravelRequestsService,
  private dialog: MatDialog,
  
  ) {}

  ngOnInit() {

    if (this.route.snapshot.queryParams['r'] && this.route.snapshot.queryParams['e']) {
      const qRefId = this.route.snapshot.queryParams['r'];
      const qRefEmail = this.route.snapshot.queryParams['e'];
      console.log(qRefId);
      console.log(qRefEmail);
      this.travelRequestId = qRefId;
      this.personEmail = qRefEmail;
      this.fetchSummaryFn(this.travelRequestId, this.personEmail );
 } else if (history.state.travelRequestId){
      this.travelRequestId = history.state.travelRequestId;
      this.personEmail = history.state.personEmail;
    } else {
      this.travelRequestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));
      this.personEmail = JSON.parse(sessionStorage.getItem('TravelRequesterEmail'));
    }   

 

    // this.route.params.subscribe((params: Params) => {
    //   const qRefId = params['r'];
    //   const qRefEmail = params['e'];
    //   console.log(qRefId);
    //   console.log(qRefEmail);
    //   this.travelRequestId = qRefId;
    //   this.personEmail = qRefEmail;
    //   this.fetchSummaryFn(this.travelRequestId, this.personEmail );
    // });

    this.flightRequestType = JSON.parse(sessionStorage.getItem('FlightRequestType'));
  
    this.firestoreRecordPath = `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/requestedTravel/${this.travelRequestId}/travelDocuments`;

    this.firebaseStoragePath = `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/travelDocuments`;
    console.log(this.travelRequestId);
    console.log(this.personEmail);  

    if(this.flightRequestType === 'multiCityFlights'){
      this.fetchMultiCitySummaryFn(this.personEmail);
    }
    this.fetchSummaryFn(this.travelRequestId, this.personEmail);
    this.fetchDocumentsFn(this.travelRequestId,  this.personEmail);
  }

  backButtonWithState() {
    return this.location.back();
  }

  fetchSummaryFn(travelRequestId, personEmail) {
    console.log(travelRequestId);
    console.log(this.personEmail);
    this.requestSummary = this.readService.returnObservableWhereFn(
      `cscEmployeeDirectory/${personEmail}/requestedTravel`,
      'travelRequestId',
      travelRequestId
    );

    this.requestSummary.subscribe(d => {
      const [m] = [...d];
      console.log('M', m)
      if(m.flightRequestType === 'multiCityFlights'){
        this.fetchMultiCitySummaryFn(personEmail);
      }
    })
  }

  fetchDocumentsFn(travelRequestId, personEmail) {
    console.log(travelRequestId);
    console.log(this.personEmail);
    this.requestDocuments = this.readService.returnObservableOrderByFn(
      `cscEmployeeDirectory/${personEmail}/requestedTravel/${travelRequestId}/travelDocuments`,
      'fileName',
      'asc'
    );
  }

  fetchMultiCitySummaryFn(personEmail){
    this.multiCityRequestSummary  =  this.readService.returnObservableOrderByFn(
      `cscEmployeeDirectory/${personEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,
      'flightDeptDate',
      'asc'
    );

    this.multiCityRequestSummary.subscribe(d => {
      console.log('MC', d)
    })
  }

  updateStatusFn(statusValue: string){
      const dataObj = {
        requestStatus: statusValue
      }

        try {
          this.updateService.updateRecordFn(
            `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/requestedTravel`,
            this.travelRequestId, dataObj);

           
             const message = `Request status updated to ${statusValue}`;
             this.snackbarService.success(message);
             setTimeout(() => {
               this.backButtonWithState();
             }, 1500);
          } catch (e) {
            const {code, details} = JSON.parse(JSON.stringify(e));
            console.log('Error Data', code, details);
            const snackClass = ['snackError'];
            const message = `Update failed, please try again. `;
            this.snackbarService.openSnackBar(message, snackClass);
          }
      
   
  }

  async editRequestSectionFn(){
    //  this.accommodationConfig = await this.requestsService.hotelConfigFn();
      this.patchValues =  this.readService.returnObservableWhereFn(
        `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/requestedTravel`,
        'travelRequestId',
        this.travelRequestId)
        // console.log('DocId', val)
        const a = []
        const detail =  await this.readService.returnPromiseWhereFn( `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/requestedTravel`,
        'travelRequestId',
        this.travelRequestId);
        a.push(detail);
  
      a.forEach(data => {
  
   if (!data?.length) {
            console.log('NO ARRAY', data);
            console.log('ARRAY LENGTH', data.length);
          } else {
            console.log('IS ARRAY', data);
            
  
            this.patchValues = data;
            console.log('this.patchValues', this.patchValues);
            // this.isShowUpdateEmployeeForm = true;
            const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
              panelClass: 'editDialog',
              data: {
                formConfig: this.travelRequestService.travelCost(),
                patchValues: this.patchValues,
                firestoreRecordPath: `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/requestedTravel`,
                docId: this.travelRequestId,
                formClass: 'requestCost'
              }
            });
            dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
              console.log('Form Data', res.data);
              if (!res.data) {
                return;
              } else {
                const cost = res.data.requestCost;
                const dataObj = {
                  requestCost: cost,
                  requestStatus: 'pending'
                }
  
                console.log('this.dataObj', this.dataObj);
                this.updateService.updateRecordFn(
                  `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/requestedTravel`,
                  this.travelRequestId, dataObj);
                  dialogRef.close()
              }
            });
          }      
        
      });
    }

  openDeleteDialogFn(docId: string, requestType: string) {
    this.personEmail = JSON.parse(sessionStorage.getItem("LoggedInUserEmail"));
    this.travelRequestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));
     console.log('docId', docId);
     console.log('requestType', requestType);
      const dialogDataRef =
        this.readService
        .returnObservableWhereFn(
          `cscEmployeeDirectory/${this.personEmail}/requestedTravel/${this.travelRequestId}/travelDocuments`,
          'fileId',
          docId);
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        panelClass: 'dialogAddContract',
        data: {
          record: dialogDataRef,
          path: `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/requestedTravel`,
          eventTitle: `File: ${requestType}`,
          docId
        }
      });

      dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
        console.log(res);
        const returnedData = res;
        console.log('returnedData', returnedData)
        if(!returnedData || returnedData.cancel){
          console.log('returnedData: NOT CONFIRMED')
        } else if (returnedData.confirm) {
          console.log(returnedData.confirm);
          this.deleteService.deleteRecordFn(
            `cscEmployeeDirectory/${this.personEmail}/requestedTravel/${this.travelRequestId}/travelDocuments`,
       docId
      )
        }
    });
  }


  
}

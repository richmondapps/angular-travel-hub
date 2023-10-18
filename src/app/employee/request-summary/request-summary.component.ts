import { Component, Input, OnInit } from '@angular/core';
import { asyncScheduler, Observable } from 'rxjs';
import { RequestsService } from 'src/app/requests/requests.service';
import { CreateService } from 'src/app/services/create.service';
import { ReadService } from 'src/app/services/read.service';
import { GlobalConstants } from 'src/app/global-variables';
import { take } from 'rxjs/operators';
import { EditDocumentDialogComponent } from 'src/app/shared/edit-document-dialog/edit-document-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateService } from 'src/app/services/update.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { getFunctions, httpsCallable } from 'firebase/functions';
@Component({
  selector: 'app-request-summary',
  templateUrl: './request-summary.component.html',
  styleUrls: ['./request-summary.component.css']
})
export class RequestSummaryComponent implements OnInit {
  travelRequestId: any;
  requestSummary: Observable<any>;
  loggedInUserEmail: any;
  showAccommodationForm = false;
  accommodationConfig: any;

  accommodationClass = 'accommodationClass';
  patchValues: any;
  purposeClass = 'purposeClass';
  patchValuesReason: Promise<any[]>;
  dataObj: any;
@Input('myTripsDetail') myTripsDetail: any;
  flightRequestType: any;
  multiCityRequestSummary: any;
  requesterFirstLastName: any;
  firestoreRecordPath: string;
  firebaseStoragePath: string;
  summarySnapshot: any;
  constructor(
    private readService: ReadService,
    private createService: CreateService,
    private requestsService: RequestsService,
    private updateService: UpdateService,
    private dateTimeService: DateAndTimeService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(this.myTripsDetail){
      this.travelRequestId  = this.myTripsDetail;
    } else {
      this.travelRequestId = JSON.parse(sessionStorage.getItem('TravelRequestId'));
    }
    this.loggedInUserEmail = JSON.parse(sessionStorage.getItem('LoggedInUserEmail'));
    this.flightRequestType = JSON.parse(sessionStorage.getItem('FlightRequestType'));
    this.requesterFirstLastName = JSON.parse(sessionStorage.getItem('RequesterFirstLastName'));

    this.firestoreRecordPath = `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/requestedTravel`;

    this.firebaseStoragePath = `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelDocuments`;
   // console.log('Flight Request Type', this.flightRequestType)

   if(this.flightRequestType === 'multiCityFlights'){
     this.fetchMultiCitySummaryFn();
   }
    this.fetchSummaryFn();
  
    console.log('MYTRIPS ID', this.myTripsDetail)
  }

  editReasonForTravelFn(){

    // this.purposeOfTravelFormConfigFn = this.requestsService.purposeOfTravelConfigFn('cscBranchDirectory',
    // 'branchName',
    // 'asc',
    // 'cscEmployeeDirectory',
    // 'personLegalNameFirst',
    // 'asc');

    this.patchValuesReason = this.readService.returnPromiseWhereFn(
      `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/requestedTravel`,
      'travelRequestId',
      this.travelRequestId)
  }


  async editRequestSectionFn(editConfigFn, editClass){
  //  this.accommodationConfig = await this.requestsService.hotelConfigFn();
    this.patchValues =  this.readService.returnObservableWhereFn(
      `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/requestedTravel`,
      'travelRequestId',
      this.travelRequestId)
      // console.log('DocId', val)
      const a = []
      const detail =  await this.readService.returnPromiseWhereFn( `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/requestedTravel`,
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
              formConfig: this.requestsService[editConfigFn](),
              patchValues: this.patchValues,
              firestoreRecordPath: `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms`,
              docId: this.travelRequestId,
              formClass: editClass
            }
          });
          dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
            console.log('Form Data', res.data);
            if (!res.data) {
              return;
            } else {

                if(res.data.flightDeptDate){
                  const f = this.dateTimeService.returnExtractedDatesFn('flight', res.data.flightDeptDate, res.data.flightReturnDate )
                  this.dataObj = {
                    ...res.data,
                   ...f
                  }
              }

              if(res.data.hotelCheckInDate){
                const a = this.dateTimeService.returnExtractedDatesFn('accommodation', res.data.hotelCheckInDate, res.data.hotelCheckOutDate )
              this.dataObj = {
                    ...res.data,
                   ...a
                  }
              }
              if(res.data.vehiclePickUpDate){
               const v = this.dateTimeService.returnExtractedDatesFn( 'vehicle', res.data.vehiclePickUpDate, res.data.vehicleReturnDate)
              this.dataObj = {
                    ...res.data,
                   ...v
                  }
              }

              console.log('this.dataObj', this.dataObj);
              this.updateService.updateRecordFn(
                `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/requestedTravel`,
                this.travelRequestId, this.dataObj);
                dialogRef.close()
            }
          });
        }      
      
    });
  }

// returnConvertedVehicleDatesFn(vehiclePickUpDate, vehicleReturnDate){

//   const vd = {
//     vehiclePickUpDD:  vehiclePickUpDate.getDate(),
//     vehiclePickUpMM: vehiclePickUpDate.getMonth() + 1,
//     vehiclePickUpYYYY: vehiclePickUpDate.getFullYear(),
//     vehicleReturnDD: vehicleReturnDate.getDate(),
//     vehicleReturnMM: vehicleReturnDate.getMonth() + 1,
//     vehicleReturnYYYY: vehicleReturnDate.getFullYear()
//   }
//   return vd;
// }

  emittedChildDataFn(d){
    console.log(d);
  }
  fetchSummaryFn(){
    this.requestSummary  =  this.readService.returnObservableWhereFn(
      `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
      'travelRequestId',
      this.travelRequestId
    );

    console.log('requestSummary', this.requestSummary)

    this.requestSummary.subscribe(d => {
      
      const [s] = [...d];
      this.summarySnapshot = s;
      console.log('startDateFull', this.summarySnapshot.startDateFull)
      console.log('requesterFirstLastName', this.summarySnapshot.requesterFirstLastName)
      console.log('purposeOfTravel', this.summarySnapshot.purposeOfTravel)
      console.log('managerWhoApproved', this.summarySnapshot.managerWhoApproved.value)
      
    })
  }
  fetchMultiCitySummaryFn(){
    this.multiCityRequestSummary  =  this.readService.returnObservableOrderByFn(
      `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel/${this.travelRequestId}/multiFlights`,
      'flightDeptDate',
      'asc'
    );

    this.multiCityRequestSummary.subscribe(d => {
      console.log('MC', d)
    })
  }


  submitRequestFn(){
    const formData = {
      requestStatus: 'new',
      requesterFirstLastName: this.requesterFirstLastName,
      submittedDate: new Date()
    }

    try {
      this.createService.createRecordFn(
          `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.travelRequestId,
          formData
        );
        sessionStorage.setItem('CurrentStepperIndex', JSON.stringify(null));
        sessionStorage.setItem('FlightRequestType', JSON.stringify(null));
      this.snackbarService.success('Your request has been submitted.');

      // ra-travel-hub-sendgrid-api-key
      // ra-travel-hub-sendgrid-templateId

      const styles = `
      .sectionLabel {
        font-size: .8rem;
        margin: .5rem 0;
        text-align: left;
      }
      .sectionData {
        font-size: .8rem;
        margin: .5rem 0;
        font-weight: 700;
        text-align: left;
      }
      .requesterFirstLastName{
        grid-area: requesterFirstLastName
      }
      .startDateFull{
        grid-area: startDateFull
      }
      .managerWhoApproved {
        grid-area: managerWhoApproved;
      }
      .billableBranch {
        grid-area: billableBranch;
      }
      .purposeOfTravel {
        grid-area: purposeOfTravel;
      }

      .reasonForTravelSection {
        display: grid;
        gap: 1rem;
        width: 400px;
        grid-template-areas:
        "requesterFirstLastName startDateFull"
        "purposeOfTravel purposeOfTravel"
        "managerWhoApproved billableBranch"
        ;
      }

      /* #region 300 */
@media only screen and (min-width: 300px) and (max-width: 767px){
  .reasonForTravelSection {
    display: grid;
    gap: 1rem;
    width: 400px;
    grid-template-areas:
    "requesterFirstLastName"
    "startDateFull"
    "purposeOfTravel"
    "managerWhoApproved"
    "billableBranch"
    ;
  }
}
/* #endregion 300 */

/* #region 768 */
@media screen and (min-width: 768px) and (max-width: 959px) {

}
/* #endregion  768 */

/* #region  960 */
@media screen and (min-width: 960px) and (max-width: 1279px) {

}
      `
      const dataTable = `
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td>
					<table class="container" width="640" align="center" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td valign="top" bgcolor="#ffffff" class="logo" style="padding: 30px 20px 0px 30px; border-left: 1px solid #cdcdcd; border-right: 1px solid #cdcdcd; border-top: 1px solid #cdcdcd; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 22px;">
								<a href="#"><img src="http://cdn.mcauto-images-production.sendgrid.net/ec5639369db11e64/a1a287da-45bf-4c24-bfb2-2900c78cc4d0/800x502.png" alt="Travel Hub" width="150" height="125" style="margin-left: -16px;" border="0"></a>
							</td>
						</tr>
						<tr>
							<td valign="top" bgcolor="#ffffff" class="headline" style="padding: 15px 20px 5px 30px; border-left: 1px solid #dbc064; border-right: 1px solid #dbc064; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 22px;">							
							</td>
						</tr>
			
						<tr>
							<td valign="top" bgcolor="#201068" class="callout" style="background-color: #201068; padding: 10px 30px; border-right: 1px solid #dbc064; border-bottom: 1px solid #201068; border-left: 1px solid #dbc064;">
								
								<table class="callout_1" width="135" align="left" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td valign="top" width="135" style="padding-left: 10px; padding-right: 10px; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height: 16px; color: #ffffff; text-align: left;">
                      <p class="sectionLabel">Name</p>
                      <p class="sectionData">
                        ${this.summarySnapshot.requesterFirstLastName}
                      </p>                      					
										</td>
									</tr>
								</table>
								
								<table class="callout_2" width="135" align="left" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td valign="top" width="135" style="padding-left: 10px; padding-right: 10px; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height: 16px; color: #ffffff;text-align: left;">
                      <p class="sectionLabel">Date</p>
                      <p class="sectionData">
                        ${this.summarySnapshot.startDateFull }
                      </p>
										</td>
									</tr>
								</table>
								
								<table class="callout_3" width="135" align="left" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td valign="top" width="135" style="padding-left: 10px; padding-right: 10px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 16px; color: #ffffff;text-align: left;">
                      <p class="sectionLabel">Purpose Of Travel</p>
                      <p class="sectionData">
                       ${this.summarySnapshot.purposeOfTravel }
                                             </p>
										</td>
									</tr>
								</table>
             
								<br style="clear:both;">
							</td>
						</tr>

            <tr>
							<td valign="top" bgcolor="#201068" class="callout" style="background-color: #201068; padding: 10px 30px; border-right: 1px solid #dbc064; border-bottom: 1px solid #201068; border-left: 1px solid #dbc064;">
								
								<table class="callout_1" width="135" align="left" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td valign="top" width="135" style="padding-left: 10px; padding-right: 10px; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height: 16px; color: #ffffff;text-align: left;">
                      <p class="sectionLabel">Approved By</p>
                      <p class="sectionData">
                        ${this.summarySnapshot.managerWhoApproved.optionName }
                      </p>								
										</td>
									</tr>
								</table>
								
								<table class="callout_2" width="135" align="left" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td valign="top" width="135" style="padding-left: 10px; padding-right: 10px; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height: 16px; color: #ffffff;text-align: left;">
                     
										  <p class="sectionLabel">Billable Branch</p>
          <p class="sectionData">
            ${this.summarySnapshot.billableBranch.optionName }
          </p>
										</td>
									</tr>
								</table>
								
								<table class="callout_3" width="135" align="left" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td valign="top" width="250" style="padding-left: 10px; padding-right: 10px; font-family: Arial, Helvetica, sans-serif; font-size: 13px; line-height: 16px; color: #ffffff;text-align: left;">
										
                    
											<br><br class="spacer">
										</td>
									</tr>
								</table>
								<br style="clear:both;">
							</td>
						</tr>

            <tr>
							<td valign="top" bgcolor="#201068" class="callout" style="background-color: #201068; padding: 3px; border-right: 1px solid #dbc064; border-bottom: 1px solid #201068; border-left: 1px solid #dbc064;">
								
								<table class="callout_1" width="250" align="left" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td valign="top" width="250" style="padding-left: 10px; padding-right: 10px; font-family:Arial, Helvetica, sans-serif; font-size:13px; line-height: 16px; color: #ffffff; text-align: left;">
                   <div style="padding: 30px" class="button">
                     <a href="http://localhost:5200/admin/requests/detail?r=${this.summarySnapshot.readId}&e=${this.loggedInUserEmail}">                    
                    View Request                    
                     </a>   
                     </div>									
									</tr>
								</table>             
								<br style="clear:both;">
							</td>
						</tr>

						<tr>
							<td valign="top" class="footer" style="padding: 10px 0px 30px 0px; font-family: Arial, Helvetica, sans-serif; font-size: 11px; color: #b2a16e;">
								&copy; CSC Travel. PLEASE DO NOT REPLY TO THIS MESSAGE:
								<br><br>

                
								Your <a href="#" style="color:#000000;">privacy</a> is important to us. Please use this link to <a href="#" style="color:#000000;">unsubscribe</a>.
								<br><br>
							
							</td>
						</tr>
					</table>
				</td>
			</tr>
		</table>`;
   

      const dataObj = {
        emailHTMLObj: dataTable,
        cssStyles: styles,
        travelRequestUrl: `http://localhost:5200/admin/requests/detail?r=${this.summarySnapshot.readId}&e=${this.loggedInUserEmail}`,
        emailRecipientPath: `${GlobalConstants.rootCollectionAndBranchDoc}/travelRequestEmailRecipients`,
        sendGridSecretName: 'ra-travel-hub-sendgrid-api-key',
        sendGridTemplateName: 'ra-travel-hub-sendgrid-templateId'
      }
      const fn = httpsCallable(getFunctions(), 'initialTravelRequest')
    fn(dataObj).then(res => {

    
     console.log('RES', res.data);
    //  window.open(res.data, 'blank');
    }).catch((error) => {
      // Getting the Error details.
      const code = error.code;
      const message = error.message;
      const details = error.details;
      // ...
    });;


      setTimeout(() => {
         this.router.navigateByUrl('account/my-trips');
      }, 2000);
    } catch (error) {
      this.snackbarService.error('Your request was not submitted, please try again.')
    }
        
      }
      saveDraftFn(){
    const formData = {
      requestStatus: 'draft',
      requesterFirstLastName: this.requesterFirstLastName
    }

    try {
      this.createService.createRecordFn(
          `cscEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
          this.travelRequestId,
          formData
        );
        sessionStorage.setItem('CurrentStepperIndex', JSON.stringify(null));
        sessionStorage.setItem('FlightRequestType', JSON.stringify(null));
      this.snackbarService.success('Saved for later');
      setTimeout(() => {
         this.router.navigateByUrl('account/my-trips');
      }, 2000);
    } catch (error) {
      this.snackbarService.error('Your request was not saved, please try again.')
    }
        
      }
}

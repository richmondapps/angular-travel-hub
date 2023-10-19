import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read.service';
import { GlobalConstants } from 'src/app/global-variables';
import { EditDocumentDialogComponent } from 'src/app/shared/edit-document-dialog/edit-document-dialog.component';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../employee.service';
import { CreateService } from 'src/app/services/create.service';
import { UpdateService } from 'src/app/services/update.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { DeleteService } from 'src/app/services/delete.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-rewards',
  templateUrl: './employee-rewards.component.html',
  styleUrls: ['./employee-rewards.component.css']
})
export class EmployeeRewardsComponent implements OnInit {
  airlineRewards: Observable<any[]>;
  loggedInUserEmail: any;
  accommodationRewards: Observable<any[]>;
  vehicleRewards: Observable<any[]>;
  detail: any;
  patchValues: any;

  constructor(
    private readService: ReadService,
    private createService: CreateService,
    private updateService: UpdateService,
    private snackbarService: SnackbarService,
    private deleteService: DeleteService,
    public dialog: MatDialog,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(sessionStorage.getItem('LoggedInUserEmail'));
   this.fetchAirlineRewardsFn();
    this.fetchAccommodationRewardsFn();
    this.fetchVehcileRewardsFn();
   // this.fetchAllRewardsFn();
  }


  // fetchAllRewardsFn(){
  // this.airlineRewards =   this.readService.returnRecordsOrderByFn(
  //   `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms`,
  //   'rewardType',
  //   'asc'
  //   )
  // }
  fetchAirlineRewardsFn(){

    try {
        this.airlineRewards =   this.readService.returnObservableWhereFn(
    `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms`,
    'rewardType',
    'airline'
    )
    } catch (e) {
      console.log('Error', e)
    }

  }
  fetchAccommodationRewardsFn(){
    try {
    this.accommodationRewards = this.readService.returnObservableWhereFn(
    `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms`,
    'rewardType',
    'accommodation'
    )
    } catch (e) {
      console.log('Error', e)
    }
  }

  fetchVehcileRewardsFn(){
    try {
       this.vehicleRewards =   this.readService.returnObservableWhereFn(
    `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms`,
    'rewardType',
    'vehicle'
    )
    } catch (e) {
      console.log('Error', e)
    }
  }

  updateFn(val){
    console.log('DocId', val)
    this.detail = this.readService.returnObservableWhereFn( `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms`,
    'docId', val);
  this.detail.pipe(take(1))
    .subscribe(data => {
      if (!data?.length) {
        console.log('NO ARRAY', data);
      } else {
        console.log('IS ARRAY', data);
        this.patchValues = data;
        console.log(data);
        // this.isShowUpdateEmployeeForm = true;
        const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
          panelClass: 'editDialog',
          data: {
            formConfig: this.employeeService.rewardMembershipFn(),
            patchValues: this.patchValues,
            firestoreRecordPath: `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms`,
            docId: val,
            formClass: 'updateTravelReward'
                    }
        });
        dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
          console.log('Form Data', res.data);
          if (!res.data) {
            return;
          } else {
            this.updateService.updateRecordFn(
              `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms`,
               val, res.data);
          }
        });
      }
    });
  }

  createFn(rewardName){
    const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
      panelClass: 'editDialog',
      data: {
        formConfig: this.employeeService.rewardMembershipFn(),
        firestoreRecordPath: `travelerProfile`,
        formClass: 'createTravelReward'
      }
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      console.log('Form Data', res.data);
      if (!res.data) {
        return;
      } else {
    const id = UidGeneratorService.newId();
      const obj = {
        ...res.data,
        docId: id,
        createId: id,
        readId: id,
        updateId: id,
        delete: id,
        rewardType: rewardName,
        personEmail: this.loggedInUserEmail
      }
        this.createService.createRecordFn(
          `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms`,
          id, obj);
      }
    });
  }
  deleteFn(id, name){
    console.log('DocId', id)

    // const firestorePath =
    // `corpBranchTest/${docId}/venueEvents/${eventId}`;

  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    panelClass: 'dialogAddContract',
    data: {
      docId: id,
      attachmentDescription: name.toUpperCase()
    }
  });
  dialogRef.afterClosed().pipe(take(1)).subscribe(async res => {
    if (!res.data) {
      return;
    } else {
      console.log('DELETE DATA', res.data);
     const p = `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms/${res.data}`;

  try {
       await this.deleteService.deleteRecordFn(
        `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/travelRewardPrograms/`,
        `${res.data}`
       )
       const snackClass = ['snackSuccess'];
       const message = `${name.toUpperCase()} has been deleted.`;
       this.snackbarService.openSnackBar(message, snackClass);
    } catch (e) {
      const {code, details} = JSON.parse(JSON.stringify(e));
      console.log('Error Data', code, details);
      const snackClass = ['snackError'];
      const message = `!Something went wrong, please try again.`;
      this.snackbarService.openSnackBar(message, snackClass);
    }
    }
  });
  }
}

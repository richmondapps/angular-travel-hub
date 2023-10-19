import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { UpdateService } from 'src/app/services/update.service';
import { AdminGroupTravelService } from '../../admin-group-travel.service';

@Component({
  selector: 'app-admin-group-travel-title',
  templateUrl: './admin-group-travel-title.component.html',
  styleUrls: ['./admin-group-travel-title.component.css']
})
export class AdminGroupTravelTitleComponent implements OnInit {
  groupTravelName: any;
  docId: any;
  globalVars: any;
  showAddGroupTravelTitleInput = false;
  formConfig;
 

  constructor(
    private createService: CreateService,
    private snackbarService: SnackbarService,
    private groupTravelService: AdminGroupTravelService,
    private router: Router,
    private dialog: MatDialog,
    private readService: ReadService,
    private updateService: UpdateService,
    private dateTime: DateAndTimeService
  ) { }

  ngOnInit(): void {

  }

  showAddGroupTravelNameFn(){
    this.showAddGroupTravelTitleInput = !this.showAddGroupTravelTitleInput;
    this.formConfig = this.groupTravelService.groupTravelNameFn();
  }
  
  startOverFn(){
    this.groupTravelName = null;
    this.showAddGroupTravelTitleInput = true;
    this.formConfig = this.groupTravelService.groupTravelNameFn();
  }
  
 
    async submittedFormData(d: any) {
      if (d.groupTravelName){
         this.groupTravelName = d.groupTravelName;
      }
    
     const docId = UidGeneratorService.newId();
      const formData = {   
        docId,
        createId: docId,
        updateId: docId,
        deleteId: docId,
        readId: docId,
        applicationStatus: 'draft',
        ...d
      };
      try {
        this.createService.createRecordFn(
        `${GlobalConstants.rootCollectionAndBranchDoc}/groupTravel`,
        docId,
         formData
        );
  
         const snackClass = ['snackSuccess'];
         const message = `Group Travel document created`;
         this.snackbarService.openSnackBar(message, snackClass);
         sessionStorage.setItem('GroupTravelDocId', JSON.stringify(docId));
         localStorage.setItem('GroupTravelDocId', JSON.stringify(docId));
         this.router.navigateByUrl('/admin/groups/city',
         {state: { docId: docId}});
  
        } catch (e) {
        console.log('ERROR', e.message);
        const snackClass = ['snackError'];
        const message = `Operation Failed, please try again.`;
        this.snackbarService.openSnackBar(message, snackClass);
      }
    
    }
  }
  
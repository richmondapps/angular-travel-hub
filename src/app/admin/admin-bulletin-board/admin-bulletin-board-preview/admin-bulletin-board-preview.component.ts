import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { DeleteService } from 'src/app/services/delete.service';
import { DynamicFormConfigService } from 'src/app/services/dynamic-form-config.service';
import { ReadService } from 'src/app/services/read.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UpdateService } from 'src/app/services/update.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { EditDocumentDialogComponent } from 'src/app/shared/edit-document-dialog/edit-document-dialog.component';
import { AdminBulletinBoardService } from '../admin-bulletin-board.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-admin-bulletin-board-preview',
  templateUrl: './admin-bulletin-board-preview.component.html',
  styleUrls: ['./admin-bulletin-board-preview.component.css']
})
export class AdminBulletinBoardPreviewComponent implements OnInit {

  venueThumb;
  bulletinBoardName;
  formConfig;
  imgChangedEvent: any = '';
  croppedImage: any = '';
  eventType: 'list' | 'calendar' = 'list';
  imagePreviewSection = false;
  bulletinBoardNameSlug: any;
  showAddVenueNameInput = false;
  showEditVenueNameInput = false;
  isVenueData: boolean;
  showPage: boolean;
  bulletinBoardData: any;
  patchValues: any;
  branchName = 'houston';
  bulletinBoardDocId: any;
  venueDetail: any;
  imageWidth: any;
  imageHeight: any;
  aspectRatio: any;
  imgView: any;
  uploadProgress$: any;
  showImageUpload = false;
  firestoreRecordPath: string;
  storagePath: string;
  updateRecordPath: string;
  fileName: string;
  venueNameForm: any;
  bulletinBoardCopyForm: any;
  venueAddressForm: any;
  venueEventForm: any;
  obj: any;
  searchFN: string;
  venueEvents: any;
  showAdminTools = true;
  rootCollection: string;
  branchStaffList: any;
  venueStaffList: any;
  ifPreview: any[];
  staffInd: any;
  staffDocId: any;
  employeeName: any;
  bulletinBoardNameForm: any;
  bulletinBoardVenueName: any;
  eventDateForm: { cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; placeholder: string; validators: { required: boolean; minlength: number; maxlength: number; }; }[];
  updateDocId: string;
  constructor(
    private dynamicFormConfigService: DynamicFormConfigService,
    private readService: ReadService,
    private updateService: UpdateService,
    private dateTime: DateAndTimeService,
    private createService: CreateService,
    private formService: FormService,
    private snackbarService: SnackbarService,
    private deleteService: DeleteService,
    private bulletinBoardService: AdminBulletinBoardService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
   

    if (history.state.docId) {
      this.bulletinBoardDocId = history.state.docId;
   //  console.log('State Obj', this.bulletinBoardDocId);
      sessionStorage.setItem('BulletinBoardDocId', JSON.stringify(this.bulletinBoardDocId));
    } else {
      this.bulletinBoardDocId = JSON.parse(sessionStorage.getItem('BulletinBoardDocId'));
    }
   


    this.readService.returnObservableWhereFn(`${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard`, 'docId', this.bulletinBoardDocId).subscribe(d => {
    //  console.log('READ', d);
      this.bulletinBoardData = d;
      this.patchValues = d;
    });

    this.bulletinBoardNameForm = this.bulletinBoardService.bulletinBoardNameFn();
    this.bulletinBoardVenueName = this.bulletinBoardService.venueNameFn();
    this.bulletinBoardCopyForm = this.bulletinBoardService.bulletinBoardCopyFn();
    this.eventDateForm = this.bulletinBoardService.eventDateFn();
    // this.bulletinBoardAddressForm = this.dynamicFormConfigService.venueAddressFn();

  }

    openDeleteDialogFn(docId) {
      //  console.log(docId);
        const dialogDataRef =
          this.readService
          .returnObservableWhereFn(
            `${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard/${this.bulletinBoardDocId}/venueStaff`,
            'docId',
            docId);
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          panelClass: 'dialogAddContract',
          data: {
            record: dialogDataRef,
            path: `${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard/${this.bulletinBoardDocId}/venueStaff/${docId}`,
            eventTitle: docId,
            docId
          }
        });

        dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
      //   console.log(res.data);
         this.deleteService.deleteRecordFn(
          `${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard/${this.bulletinBoardDocId}/venueStaff`,
          docId
         );
      });
    }

  showAddVenueNameFn() {
    this.showAddVenueNameInput = !this.showAddVenueNameInput;
    this.formConfig = this.dynamicFormConfigService.venueNameFn();
  }

 async editVenueFn(configFormName? ) {
  //  console.log('DocId', this.bulletinBoardDocId);
   // console.log('config Form Name', configFormName);
    const e = this.readService.returnObservableWhereFn(`${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard`,
      'docId', this.bulletinBoardDocId);
   e.pipe(take(1))
      .subscribe(async data => {
        if (!data?.length) {
       //   console.log('NO ARRAY', data);
        } else {
       //   console.log('IS ARRAY', data);
          // this.patchValues = this.dateTime.convertTimestampFn(data);
        //  console.log(data);
          // this.isShowUpdateEmployeeForm = true;
          const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
            panelClass: 'editDialog',
            data: {
              formConfig: await configFormName,
              patchValues: this.patchValues || null,
              firestoreRecordPath: `${GlobalConstants.rootCollectionAndBranchDoc}`,
              docId: this.bulletinBoardDocId
            }
          });
          dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
           // console.log('Form Data', res.data);
            if (!res.data) {
              return;
            } else {
             // console.log('BLOG RES DATA', res.data);
               const data =  this.dateTime.convertDate(res.data);
               if (data.bulletinBoardName) {
                this.bulletinBoardName = data.bulletinBoardName;
              //  console.log('vName', this.bulletinBoardName);

              data.bulletinBoardNameSlug = this.formService.trimLowerCaseReplaceSpacesWithHyphenFn(this.bulletinBoardName);
              }
               if(data?.eventVenue?.optionName){
                 data.eventVenue = data.eventVenue.optionName;
               } else if (data.eventVenue ?? undefined) {
                data.eventVenue = data.eventVenue;
               }
              const formData = {
                ...data
              }
             // console.log('Form Data', formData);
               this.updateService.updateRecordFn(`${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard`,  this.bulletinBoardDocId, formData);
            }
          });
        }
      });
  }


  submittedFormData(d: any) {
    console.log('Emitted Data', d);
    if (d.bulletinBoardName) {
      this.bulletinBoardName = d.bulletinBoardName;
    //  console.log('vName', this.bulletinBoardName);
      this.bulletinBoardNameSlug = this.formService.trimLowerCaseReplaceSpacesWithHyphenFn(this.bulletinBoardName);
    }

    const formData = {
      ...d
    };
      try {

           const snackClass = ['snackSuccess'];
           const message = `Blog Updated`;
           this.snackbarService.openSnackBar(message, snackClass);
        } catch (e) {
          console.log('ERROR', e);
          const snackClass = ['snackError'];
          const message = `FAIL: `;
          this.snackbarService.openSnackBar(message, snackClass);
        }
  }

  fileChangeEvent(event: any, imgW ? : any, imgH ? : any, aspectR ? : any): void {
    this.imgChangedEvent = event;
    this.imagePreviewSection = true;
    this.imageWidth = imgW;
    this.imageHeight = imgH;
    // console.log('event',  event);
  //  console.log('imgW', imgW);
  //  console.log('imgH', imgH);
  //  console.log('Aspect Ratio', aspectR);
    this.aspectRatio = aspectR;
    this.showImageUpload = true;
    this.fileName = UidGeneratorService.newId();
    this.storagePath =
    `${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoards/${this.bulletinBoardDocId}/${this.fileName}`;
    this.firestoreRecordPath = `${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard/${this.bulletinBoardDocId}`;
    this.imgView = 'singleImage';
    this.updateRecordPath = `${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard`;
    this.updateDocId = `${this.bulletinBoardDocId}`;
  }

  cancelImageSelection(d) {
  //  console.log('label', d);
    this.showImageUpload = false;
  }
  fileUploaded(d) {
  //  console.log('Message', d);
    this.showImageUpload = false;
  }

}

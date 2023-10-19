import { Component, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AdminFaqService } from '../admin-faq.service';
import { GlobalConstants } from 'src/app/global-variables';
import { take } from 'rxjs/operators';
import { EditDocumentDialogComponent } from 'src/app/shared/edit-document-dialog/edit-document-dialog.component';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { Observable } from 'rxjs';
import { UpdateService } from 'src/app/services/update.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MatAccordion } from '@angular/material/expansion';
import { DeleteService } from 'src/app/services/delete.service';

@Component({
  selector: 'app-admin-faq-create',
  templateUrl: './admin-faq-create.component.html',
  styleUrls: ['./admin-faq-create.component.css']
})
export class AdminFaqCreateComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  formConfig: any;
 
  formCSSClassName = "faqs";
  faqs: Observable<any>;
  questionAnswers: Observable<any>;
  currentId: any;
  patchValues: any;
  currentFaqTitle: any;
  collectionPath: string;
  publicPrivate: Observable<any>;

  constructor(
    private createService: CreateService,
    private readService: ReadService,
    private updateService: UpdateService,
    private deleteService: DeleteService,
    private afs: Firestore,
    private snackbarService: SnackbarService,
    private faqsService: AdminFaqService,
    private dateTime: DateAndTimeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.formConfig = this.faqsService.createFaqTitleFn();
   this.faqs = this.readService.returnObservableOrderByFn(
 `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics`,
   'faqTitle',
   'asc'
   )
}
submittedFormData(d: any){
  //  console.log('FAQ', d);
      const docId = UidGeneratorService.newId();
      const formData = {
        visibility: 'private',
        docId,
        ...d
      };
      try {
          this.createService.createRecordFn(
            `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics`,
            docId,
            formData
            );
           const snackClass = ['snackSuccess'];
           const message = `FAQ topic added`;
           this.snackbarService.openSnackBar(message, snackClass);
        } catch (e) {
            console.log('ERROR', e);
            const snackClass = ['snackError'];
            const message = `FAIL: `;
            this.snackbarService.openSnackBar(message, snackClass);
        }
  }

  showQandAFn(docId, faqTitle){
    this.currentId = docId;
    this.currentFaqTitle  = faqTitle;

    this.publicPrivate = this.readService.returnObservableWhereFn(
      `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics`,
      'docId',
      `${this.currentId}`
    )
    this.collectionPath = `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${this.currentId}/questionsAnswers`;
    console.log('Current Id', this.currentId);
    this.questionAnswers = this.readService.returnObservableOrderByFn(
      `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${docId}/questionsAnswers`,
        'faqQuestion',
        'asc'
        );
  }

addQandAFn(docId){
  // console.log(`QA, ${docId}`);
  const e = this.readService.returnObservableWhereFn(
    `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics`,
    'docId',
    docId);
  e.pipe(take(1))
    .subscribe(data => {
    if (!data?.length) {
      console.log('NO ARRAY', data);
    } else {
      const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
        panelClass: 'editDialog',
        data: {
          formConfig: this.faqsService.createQuestionAnswerFn(),
          docId
        }
      });
      dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
       // console.log('Form Data', res.data);
        if (!res.data) {
          return;
        } else {
          const qaId = UidGeneratorService.newId();
          const formData = {
            docId: qaId,
            ...res.data
          }
          try {
            this.createService.createRecordFn(
              `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${docId}/questionsAnswers`,
              qaId,
              formData
              );
             const snackClass = ['snackSuccess'];
             const message = `Question & Answer added`;
             this.snackbarService.openSnackBar(message, snackClass);
          } catch (e) {
          //  console.log('ERROR', e);
            const snackClass = ['snackError'];
            const message = `FAIL: `;
            this.snackbarService.openSnackBar(message, snackClass);
          }
        }
      });
    }
  });
  }

  editFaqFn(docId: string,  currentId: string, configFormName? ) {
    //  console.log('DocId', docId);
     //  console.log('config Form Name', configFormName);
       const e = this.readService.returnObservableWhereFn(
         `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${currentId}/questionsAnswers`,
         'docId',
         docId);
        e.pipe(take(1))
         .subscribe(data => {
           if (!data?.length) {
          //   console.log('NO ARRAY', data);
           } else {
            console.log('IS ARRAY', data);
            this.patchValues = this.dateTime.convertDate(data);
             const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
               panelClass: 'editDialog',
               data: {
                 formConfig: this.faqsService.createQuestionAnswerFn(),
                 patchValues: this.patchValues || null,
                 docId,
                 class: "faqs"
               }
             });
             dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
               console.log('Form Data', res.data);
               if (!res.data) {
                 return;
               } else {
                  this.updateService.updateRecordFn(
                    `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${currentId}/questionsAnswers`,
                    docId,
                    res.data
                    );
               }
             });
           }
         });
     }

     openDeleteDialogFn(docId: string, currentId: string, faqQuestion: string) {
      //  console.log(docId);
        const dialogDataRef =
          this.readService
          .returnObservableWhereFn(
            `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${currentId}/questionsAnswers`,
            'docId',
            docId);
        const dialogRef = this.dialog.open(DeleteDialogComponent, {
          panelClass: 'dialogAddContract',
          data: {
            record: dialogDataRef,
            path: `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${currentId}/questionsAnswers`,
            eventTitle: faqQuestion,
            docId
          }
        });
  
        dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
       //  console.log(res.data);
         this.deleteService.deleteRecordFn(
          `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${currentId}/questionsAnswers`,
          docId
         )
      });
    }

  togglePrivatePublic(docId, visibility ){
    console.log(`QA, ${docId}`);

    const obj = {
      visibility
    }

    this.updateService.updateRecordFn(
    `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics`,
  docId,
  obj);
}

deleteTopicFn(currentId: string, faqTitle: string) {
  //  console.log(currentId);
    const dialogDataRef =
      this.readService
      .returnObservableWhereFn(
        `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics`,
        'docId',
        currentId);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      panelClass: 'dialogAddContract',
      data: {
        record: dialogDataRef,
        path: `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics`,
        eventTitle: this.currentFaqTitle,
        currentId
      }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
    console.log(res.data);
     this.deleteService.deleteRecordFn(
      `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics`,
      currentId
     )
  });
}

deletePDFFn(docId: string, currentId: string, ) {
  console.log('currentId' ,currentId);
  console.log('DocId', docId);
  const dialogDataRef =
    this.readService
    .returnObservableWhereFn(
      `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${currentId}/questionsAnswers`,
      'docId',
      docId);
  const dialogRef = this.dialog.open(DeleteDialogComponent, {
    panelClass: 'dialogAddContract',
    data: {
      record: dialogDataRef,
      path:  `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${currentId}/questionsAnswers`,
      // eventTitle: this.currentFaqTitle,
      docId: currentId
    }
  });

  dialogRef.afterClosed().pipe(take(1)).subscribe(res => {
   console.log(res.data);

     try {
        const formData = {
            documentUrl: ''
          }
     this.updateService.updateRecordFn(
      `${GlobalConstants.rootCollectionAndBranchDoc}/faqTopics/${currentId}/questionsAnswers`,
      docId,
      formData
   )
          const snackClass = ['snackSuccess'];
          const message = `Document Deleted`;
          this.snackbarService.openSnackBar(message, snackClass);
       } catch (e) {
         const {code, details} = JSON.parse(JSON.stringify(e));
         console.log('Error Data', code, details);
         const snackClass = ['snackError'];
         const message = `Deletion Failed`;
         this.snackbarService.openSnackBar(message, snackClass);
       }


});
}

}

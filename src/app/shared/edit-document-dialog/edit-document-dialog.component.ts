import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateService } from 'src/app/services/update.service';
import { AddDocumentDialogComponent } from '../add-document-dialog/add-document-dialog.component';

@Component({
  selector: 'app-edit-document-dialog',
  templateUrl: './edit-document-dialog.component.html',
  styleUrls: [
    './edit-document-dialog.component.css',
    // '../../admin/available-positions-dashboard/position-list/position-list.component.css'
  ]
})
export class EditDocumentDialogComponent implements OnInit {
  formConfig: any;
  patchValues: any;
  firestoreRecordPath: any;
  docId: any;
  class: any;

  constructor(
    public updateService: UpdateService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef < AddDocumentDialogComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.formConfig = this.data.formConfig;
    this.patchValues = this.data?.patchValues;
    this.class = this.data?.class;
    // this.firestoreRecordPath = this.data.firestoreRecordPath;
    this.docId = this.data.docId;
    console.log('CLASS',  this.class);
   // console.log('formConfig',  this.formConfig);
    console.log('patchValues', this.patchValues);
    // console.log('firestoreRecordPath', this.firestoreRecordPath);
  //  console.log('this.docId', this.docId);
  }

  receivedDynamicDataFn(e: any){
  //  console.log('E', e);
    if (Object.keys(e)?.length){
       try {
        // this.updateService.updateRecordFn(
        // this.firestoreRecordPath,
        // this.docId, e);
        this.dialogRef.close({data: e});
       } catch (error) {
           console.log('Error', error);
       }
    } else {
    //  console.log('IS STRING');
      this.dialogRef.close({data: e});
    }
  }
}

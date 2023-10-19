import {
  Component,
  OnInit,
  Inject
} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  d: string;
  docId: string;
  documentTitle: any;
  firestorePath: any;
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef < DeleteDialogComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  //   console.log(this.data);
    // this.data.subscribe((d: any) => {
    //   for (const i of d) {
    //     this.docId = i.docId;
    //     console.log(this.docId);
    //     this.documentTitle = i.eventTitle;
    //   }
    // });
    this.documentTitle = this.data?.eventTitle;
    this.docId = this.data.docId;
    // this.firestorePath = this.data.firestorePath;
    // console.log('firestorePath', this.firestorePath);
    // console.log('docId', this.docId);
    // console.log('Document Title', this.documentTitle);
  }

  closeDialog() {
    this.dialogRef.close({data: this.docId, cancel: 'deleteCanceled'});
  }

  deleteRecordFn() {
    this.dialogRef.close({data: this.docId, confirm: 'deleteConfirmed'});
  }
}


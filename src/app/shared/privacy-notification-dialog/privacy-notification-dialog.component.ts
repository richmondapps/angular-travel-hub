import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-privacy-notification-dialog',
  templateUrl: './privacy-notification-dialog.component.html',
  styleUrls: ['./privacy-notification-dialog.component.css']
})
export class PrivacyNotificationDialogComponent implements OnInit {
  policyDate: any;
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef < PrivacyNotificationDialogComponent > ,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.policyDate = this.data.policyDate;
  }
  closeDialog() {
    this.dialogRef.close();
  }
goToPrivacyPageFn(){
  this.dialogRef.close();
this.router.navigateByUrl('/privacy-policy');
}
}

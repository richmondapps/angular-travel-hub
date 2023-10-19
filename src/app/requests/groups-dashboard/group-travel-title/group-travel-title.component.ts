import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminGroupTravelService } from 'src/app/admin/admin-group-travel.service';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { UpdateService } from 'src/app/services/update.service';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-travel-title',
  templateUrl: './group-travel-title.component.html',
  styleUrls: ['./group-travel-title.component.css'],
})
export class GroupTravelTitleComponent implements OnInit {
  groupTravelName: any;
  docId: any;
  globalVars: any;
  showAddGroupTravelTitleInput = false;
  formConfig;
  loggedInUserEmail: any;

  constructor(
    private createService: CreateService,
    private snackbarService: SnackbarService,
    private groupTravelService: GroupService,
    private router: Router,
    private dialog: MatDialog,
    private readService: ReadService,
    private updateService: UpdateService,
    private dateTime: DateAndTimeService
  ) {}

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
  }

  showAddGroupTravelNameFn() {
    this.showAddGroupTravelTitleInput = !this.showAddGroupTravelTitleInput;
    this.formConfig = this.groupTravelService.groupTravelNameFn();
  }

  startOverFn() {
    this.groupTravelName = null;
    this.showAddGroupTravelTitleInput = true;
    this.formConfig = this.groupTravelService.groupTravelNameFn();
  }

  async submittedFormData(d: any) {
    if (d.groupTravelName) {
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
      createdDate: new Date(),
      ...d,
    };
    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel`,
        docId,
        formData
      );

      const snackClass = ['snackSuccess'];
      const message = `Group Travel document created`;
      this.snackbarService.openSnackBar(message, snackClass);
      sessionStorage.setItem('GroupTravelDocId', JSON.stringify(docId));
      sessionStorage.setItem(
        'GroupTravelName',
        JSON.stringify(this.groupTravelName)
      );
      this.router.navigateByUrl('/account/group-travel/city', {
        state: { docId: docId },
      });
    } catch (e) {
      console.log('ERROR', e.message);
      const snackClass = ['snackError'];
      const message = `Operation Failed, please try again.`;
      this.snackbarService.openSnackBar(message, snackClass);
    }
  }
}

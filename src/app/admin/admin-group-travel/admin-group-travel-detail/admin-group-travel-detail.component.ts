import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CreateService } from 'src/app/services/create.service';
import { DeleteService } from 'src/app/services/delete.service';
import { ReadService } from 'src/app/services/read.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { EditDocumentDialogComponent } from 'src/app/shared/edit-document-dialog/edit-document-dialog.component';
import { AdminGroupTravelService } from '../../admin-group-travel.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-group-travel-detail',
  templateUrl: './admin-group-travel-detail.component.html',
  styleUrls: ['./admin-group-travel-detail.component.css'],
})
export class AdminGroupTravelDetailComponent implements OnInit {
  tableCols = [
    {
      columnDef: 'docId',
      header: 'Profile',
      type: 'recordDetail',
      urlPath: '/admin/profiles/detail',
    },
    {
      columnDef: 'readId',
      header: 'Cost',
      type: 'recordSingleValue',
      btnName: 'Update',
    },
    {
      columnDef: 'deleteId',
      header: 'Delete',
      type: 'deleteRecord',
    },
    {
      columnDef: 'personLegalNameFirst',
      type: 'fullName',
      header: 'Name',
      additionalNameField: 'personLegalNameLast',
    },
    { columnDef: 'flightDeptDate', header: 'Dept. Date', type: 'fullDate' },
    {
      columnDef: 'flightFromAirport',
      header: 'Dept. City',
      type: 'upperCaseText',
    },
    {
      columnDef: 'birthMonth',
      type: 'constructedDate',
      header: 'D.o.B',
      date: 'birthDate',
      year: 'birthYear',
    },
    { columnDef: 'personEmail', header: 'Email', type: 'email' },

    {
      columnDef: 'personKnownTravelerNumber',
      header: 'TSA KTN',
      type: 'string',
    },

    { columnDef: 'flightReturnDate', header: 'Return Date', type: 'fullDate' },
    {
      columnDef: 'flightReturnAirport',
      header: 'Return City',
      type: 'upperCaseText',
    },
    { columnDef: 'requestCost', header: 'Cost', type: 'cost' },
    { columnDef: 'personCellPhone', header: 'Phone', type: 'phone' },
  ];

  groupTravelDocId: any;
  selectedTravelersHeading: string;
  loggedInUserEmail: any;
  addedTravelersData: any;
  profileData: any[];
  tableData: Observable<any>;
  tableHeading = 'Group Members';
  addFlightInfo: any;
  addPersonToGroupTravel: {
    cssWrapperClass: string;
    controlLabel: string;
    controlName: string;
    controlType: string;
    valueType: string;
    placeholder: string;
    options: any[];
    validators: { maxlength: number; minlength: number; required: boolean };
  }[];
  groupTravelArrivalCity: any;
  groupTravelName: any;
  isShowErrorMsg = false;
  emailArray;
  groupTravelRequestedBy: any;
  constructor(
    private readService: ReadService,
    private snackbarService: SnackbarService,
    private createService: CreateService,
    private groupService: AdminGroupTravelService,
    private dialog: MatDialog,
    private deleteService: DeleteService,
    public location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addFlightInfo = this.groupService.travelCost();

    this.groupTravelName = JSON.parse(
      sessionStorage.getItem('GroupTravelName')
    );
    this.groupTravelArrivalCity = JSON.parse(
      sessionStorage.getItem('GroupTravelCity')
    );
    this.groupTravelRequestedBy = JSON.parse(
      sessionStorage.getItem('GroupTravelRequestedBy')
    );
    // this.groupTravelDocId = JSON.parse(sessionStorage.getItem('GroupTravelDocId'));
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
    if (history.state.groupTravelDocId) {
      this.groupTravelDocId = history.state.groupTravelDocId;
      sessionStorage.setItem(
        'GroupTravelDocId',
        JSON.stringify(this.groupTravelDocId)
      );
    } else {
      this.groupTravelDocId = JSON.parse(
        sessionStorage.getItem('GroupTravelDocId')
      );
    }

    this.tableDataFn(this.groupTravelDocId);
  }
  backButtonWithState() {
    return this.location.back();
  }
  tableDataFn(groupTravelDocId: string) {
    const x = this.readService.returnCollectionGroupObservableWhereAndOrderByFn(
      `selectedGroupTravelers`,
      'groupTravelDocId',
      groupTravelDocId,
      'personEmail',
      'asc'
    );

    this.tableData = x;
  }

  async viewProfileFn(d: any) {
    const email = d.id;
    this.router.navigateByUrl('/admin/profiles/detail', {
      state: {
        personEmail: d.id,
      },
    });
  }

  singleValueDataFn(val: any) {
    const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
      panelClass: 'editDialog',
      data: {
        formConfig: this.addFlightInfo,
        class: 'addGroupFlightInfo',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (!res.data) {
          return;
        } else {
          const obj = res.data;

          const formData = {
            ...obj,
          };
          try {
            this.createService.createRecordFn(
              `raEmployeeDirectory/${this.groupTravelRequestedBy}/requestedGroupTravel/${this.groupTravelDocId}/selectedGroupTravelers`,
              val.id,
              formData
            );
          } catch (error) {
            console.log('Error', error);
          }
        }
      });
  }
  emittedTableDataFn(val: any) {
    const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
      panelClass: 'editDialog',
      data: {
        formConfig: this.addFlightInfo,
        class: 'addGroupFlightInfo',
      },
    });
    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (!res.data) {
          return;
        } else {
          const obj = res.data;
          const startDate = obj.flightDeptDate;
          const startDay = startDate.getDate();
          const startMonth = startDate.getMonth() + 1;
          const startYear = startDate.getFullYear();
          obj.flightDeptDate = `${startMonth}/${startDay}/${startYear}`;

          const endDate = obj.flightReturnDate;
          const endDay = endDate.getDate();
          const endMonth = endDate.getMonth() + 1;
          const endYear = endDate.getFullYear();
          obj.flightReturnDate = `${endMonth}/${endDay}/${endYear}`;
          obj.flightFromAirport = obj.flightFromAirport.optionName;
          obj.flightReturnAirport = obj.flightReturnAirport.optionName;

          const formData = {
            ...obj,
          };
          try {
            this.createService.createRecordFn(
              `raEmployeeDirectory/${this.groupTravelRequestedBy}/requestedGroupTravel/${this.groupTravelDocId}/selectedGroupTravelers`,
              val.id,
              formData
            );
          } catch (error) {
            console.log('Error', error);
          }
        }
      });
  }

  deleteRecordFn(docId: string) {
    const groupTravelArrivalCity = this.groupTravelArrivalCity.toUpperCase();
    const groupTravelName = this.groupTravelName.toUpperCase();
    const msg = `Remove <span style="color: red; font-weight: bold;">
${docId}</span>`;

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      panelClass: 'dialogAddContract',
      data: {
        documentMessage: msg,
        eventTitle: `from 
          ${groupTravelArrivalCity} - ${groupTravelName}`,
        docId,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        const returnedData = res;
        if (!returnedData || returnedData.cancel) {
        } else if (returnedData.confirm) {

          try {
            this.deleteService.deleteRecordFn(
              `raEmployeeDirectory/${this.groupTravelRequestedBy}/requestedGroupTravel/${this.groupTravelDocId}/selectedGroupTravelers`,
              docId
            );
          } catch (error) {
            console.log('ERROR', error);
          }
        }
      });
  }
}

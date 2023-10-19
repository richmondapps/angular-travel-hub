import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CreateService } from 'src/app/services/create.service';
import { DeleteService } from 'src/app/services/delete.service';
import { ReadService } from 'src/app/services/read.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-select-group-travelers',
  templateUrl: './select-group-travelers.component.html',
  styleUrls: ['./select-group-travelers.component.css'],
})
export class SelectGroupTravelersComponent implements OnInit {
  tableCols = [
    {
      columnDef: 'personLegalNameFirst',
      additionalNameField: 'personLegalNameLast',
      header: 'Name',
      type: 'fullName',
    },
    { columnDef: 'personEmail', header: 'Event', type: 'email' },
    {
      columnDef: 'docId',
      header: 'Admin',
      type: 'emitData',
      btnName: 'Add to Group',
      btnIcon: 'person',
    },
  ];
  tableData: Observable<any>;
  travelers;
  groupTravelDocId: any;
  tableHeading;
  loggedInUserEmail: any;
  addedTravelersData;
  selectedTravelersHeading: string;
  groupTravelName: any;
  groupTravelCity: any;
  groupTravelArrivalCity: any;
  constructor(
    private readService: ReadService,
    private snackbarService: SnackbarService,
    private createService: CreateService,
    private deleteService: DeleteService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTravelersListFn();
    this.fetchSelectedTravelersListFn();
    this.groupTravelName = JSON.parse(
      sessionStorage.getItem('GroupTravelName')
    );
    this.groupTravelCity = JSON.parse(
      sessionStorage.getItem('GroupTravelCity')
    );
    this.groupTravelDocId = JSON.parse(
      sessionStorage.getItem('GroupTravelDocId')
    );
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
  }

  async fetchTravelersListFn() {
    this.tableHeading = 'Available Profiles';
    this.travelers = await this.readService.returnCollectionGroupOrderByFn(
      'travelProfile',
      'personLegalNameFirst',
      'asc'
    );
    this.tableData = of(this.travelers);
  }

  fetchSelectedTravelersListFn() {
    this.selectedTravelersHeading = 'Selected Profiles';
    this.groupTravelDocId = JSON.parse(
      sessionStorage.getItem('GroupTravelDocId')
    );

    this.addedTravelersData =
      this.readService.returnCollectionGroupObservableWhereAndOrderByFn(
        `selectedGroupTravelers`,
        'groupTravelDocId',
        this.groupTravelDocId,
        'personEmail',
        'asc'
      );
  }

  recordDetailFn(e: any) {
    this.router.navigateByUrl(e.path, {
      state: {
        docId: e.docId,
      },
    });
  }

  addFlightInfoFn() {
    this.router.navigateByUrl('/account/group-travel/detail', {
      state: {
        docId: this.groupTravelDocId,
      },
    });
  }
  deleteRecordFn(docId: string) {
    const groupTravelArrivalCity = this.groupTravelArrivalCity;
    const groupTravelName = this.groupTravelName;
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
          console.log('returnedData: NOT CONFIRMED');
        } else if (returnedData.confirm) {

          try {
            this.deleteService.deleteRecordFn(
              `raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel/${this.groupTravelDocId}/selectedGroupTravelers`,
              docId
            );
          } catch (error) {
            console.log('ERROR', error);
          }
        }
      });
  }
  async emittedTableDataFn(email: any) {
    const e = await this.readService.returnPromiseWhereFn(
      `raEmployeeDirectory/${email}/travelProfile`,
      'docId',
      email
    );
    const [s] = [...e];
    const docId = email;
    const formData = {
      docId,
      personCellPhone: s.personCellPhone,
      birthDate: s.birthDate,
      birthMonth: s.birthMonth,
      birthYear: s.birthYear,
      personGender: s.personGender,
      personLegalNameFirst: s.personLegalNameFirst,
      personLegalNameLast: s.personLegalNameLast,
      personKnownTravelerNumber: s.personKnownTravelerNumber,
      createId: docId,
      updateId: docId,
      deleteId: docId,
      readId: docId,
      personEmail: email,
      groupTravelDocId: this.groupTravelDocId,
      applicationStatus: 'pending',
    };

    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel/${this.groupTravelDocId}/selectedGroupTravelers`,
        docId,
        formData
      );

      const snackClass = ['snackSuccess'];
      const message = `${s.personLegalNameFirst} ${s.personLegalNameLast} added`;
      this.snackbarService.openSnackBar(message, snackClass);
      //  this.router.navigateByUrl('/account/group-travel/city',
      //  {state: { docId: docId}});
    } catch (e) {
      console.log('ERROR', e.message);
      const snackClass = ['snackError'];
      const message = `Operation Failed, please try again.`;
      this.snackbarService.openSnackBar(message, snackClass);
    }
  }
}

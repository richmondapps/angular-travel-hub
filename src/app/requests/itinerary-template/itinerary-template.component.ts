import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { DeleteService } from 'src/app/services/delete.service';
import { ReadService } from 'src/app/services/read.service';
import { GlobalConstants } from 'src/app/global-variables';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-itinerary-template',
  templateUrl: './itinerary-template.component.html',
  styleUrls: ['./itinerary-template.component.css'],
})
export class ItineraryTemplateComponent implements OnInit {
  @Input('travelRequest') travelRequest: any;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  loggedInUserEmail: any;
  travelRequestId: any;

  constructor(
    private router: Router,
    private deleteService: DeleteService,
    private readService: ReadService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log('TRAVEL COMPONENT', this.travelRequest);
  }
  setTravelRequestID(id) {
    sessionStorage.setItem('TravelRequestId', JSON.stringify(id));
  }

  viewRequestFn(id, flightRequestType?) {
    sessionStorage.setItem('TravelRequestId', JSON.stringify(id));
    sessionStorage.setItem(
      'FlightRequestType',
      JSON.stringify(flightRequestType)
    );
    this.router.navigateByUrl('/account/review');
  }

  viewAccomodationRequestFn(id) {
    sessionStorage.setItem('TravelRequestId', JSON.stringify(id));
    sessionStorage.setItem('FlightRequestType', JSON.stringify(null));
    this.router.navigateByUrl('/account/review');
  }

  viewVehicleRequestFn(id) {
    sessionStorage.setItem('TravelRequestId', JSON.stringify(id));
    sessionStorage.setItem('FlightRequestType', JSON.stringify(null));
    this.router.navigateByUrl('/account/review');
  }

  openDeleteDialogFn(docId: string, requestType: string) {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
    this.travelRequestId = JSON.parse(
      sessionStorage.getItem('TravelRequestId')
    );
    console.log('docId', docId);
    console.log('requestType', requestType);
    const dialogDataRef = this.readService.returnObservableWhereFn(
      `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/$requestedTravel`,
      'docId',
      docId
    );
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      panelClass: 'dialogAddContract',
      data: {
        record: dialogDataRef,
        path: `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/requestedTravel`,
        eventTitle: `Request Type: ${requestType}`,
        docId,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res);
        const returnedData = res;
        console.log('returnedData', returnedData);
        if (!returnedData || returnedData.cancel) {
          console.log('returnedData: NOT CONFIRMED');
        } else if (returnedData.confirm) {
          console.log(returnedData.confirm);
          this.deleteService.deleteRecordFn(
            `${GlobalConstants.rootEmployeeCollection}/${this.loggedInUserEmail}/requestedTravel`,
            docId
          );
        }
      });
  }
}

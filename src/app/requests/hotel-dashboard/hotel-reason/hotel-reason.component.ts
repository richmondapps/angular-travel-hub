import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateService } from 'src/app/services/create.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { RequestsService } from '../../requests.service';
import { GlobalConstants } from 'src/app/global-variables';
import { ReadService } from 'src/app/services/read.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { take } from 'rxjs/operators';
import { DeleteService } from 'src/app/services/delete.service';
@Component({
  selector: 'app-hotel-reason',
  templateUrl: './hotel-reason.component.html',
  styleUrls: ['./hotel-reason.component.css'],
})
export class HotelReasonComponent implements OnInit {
  purposeOfTravelFormConfigFn;
  travelRequestId: any;
  requesterFirstLastName: any;
  loggedInUserEmail: any;
  purposeClass = 'purposeClass';
  reasonForTravel = 'ReasonForTravel';
  isVehicleRequired: any;
  completetedReasonStep = false;
  dataObj: any;
  constructor(
    private createService: CreateService,
    private router: Router,
    private dialog: MatDialog,
    private readService: ReadService,
    private deleteService: DeleteService,
    private requestsService: RequestsService
  ) {}

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
    sessionStorage.setItem('AccommodationRequestAdded', JSON.stringify(false));
    sessionStorage.setItem('VehicleRequestAdded', JSON.stringify(false));
    this.loadPurposeOfTravelFormFn();
    this.completetedReasonStep = JSON.parse(
      sessionStorage.getItem('CompletetedReasonStep')
    );
  }

  async loadPurposeOfTravelFormFn() {
    this.purposeOfTravelFormConfigFn =
      await this.requestsService.purposeOfTravelConfigFn(
        'raBranchDirectory',
        'branchName',
        'asc',
        'raEmployeeDirectory',
        'personLegalNameFirst',
        'asc'
      );
  }

  reasonForTravelDataFn(d: any) {
    if (d.managerWhoApproved) {
      const newRequestId = UidGeneratorService.newId();
      sessionStorage.setItem('TravelRequestId', JSON.stringify(newRequestId));
      sessionStorage.removeItem('FlightRequestType');
      this.requesterFirstLastName = JSON.parse(
        sessionStorage.getItem('RequesterFirstLastName')
      );
      this.travelRequestId = JSON.parse(
        sessionStorage.getItem('TravelRequestId')
      );
    }

    if (typeof d.managerWhoApproved === 'string') {
      const managerUC = d.managerWhoApproved.toUpperCase();
      const managerName = {
        managerWhoApproved: {
          optionName: managerUC,
          value: managerUC,
        },
      };
      this.dataObj = {
        ...d,
        ...managerName,
      };
    } else if (typeof d.managerWhoApproved === 'object') {
      this.dataObj = {
        ...d,
      };
    }

    const formData = {
      requestStatus: 'draft',
      ...this.dataObj,
      docId: this.travelRequestId,
      createId: this.travelRequestId,
      readId: this.travelRequestId,
      updateId: this.travelRequestId,
      deleteId: this.travelRequestId,
      completetedReasonStep: true,
      travelRequestId: this.travelRequestId,
      requesterFirstLastName: this.requesterFirstLastName,
      personEmail: this.loggedInUserEmail,
      createdDate: new Date(),
      createdAt: new Date(),
      primaryRequestType: 'accommodation',
    };
    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.travelRequestId,
        formData
      );

      this.router.navigateByUrl('/account/request/accommodation/options', {
        state: { travelRequestId: this.travelRequestId },
      });

      this.isVehicleRequired = JSON.parse(
        sessionStorage.getItem('VehicleRequestAdded')
      );
      if (this.isVehicleRequired) {
        this.router.navigateByUrl(
          '/account/request/accommodation/hotel-vehicle',
          { state: { travelRequestId: this.travelRequestId } }
        );
      } else {
      }

      sessionStorage.setItem('CompletetedReasonStep', JSON.stringify(true));
    } catch (e) {
      console.log('Reason for Request Error', e.message);
    }
  }

  toggleVehicleOptionFn() {
    if (!this.isVehicleRequired) {
      sessionStorage.setItem('VehicleRequestAdded', JSON.stringify(true));
    } else if (this.isVehicleRequired) {
      sessionStorage.setItem('VehicleRequestAdded', JSON.stringify(false));
    }
    this.isVehicleRequired = !this.isVehicleRequired;
  }
}

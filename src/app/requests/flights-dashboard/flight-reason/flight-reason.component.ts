import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateService } from 'src/app/services/create.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { RequestsService } from '../../requests.service';

@Component({
  selector: 'app-flight-reason',
  templateUrl: './flight-reason.component.html',
  styleUrls: ['./flight-reason.component.css'],
})
export class FlightReasonComponent implements OnInit {
  purposeOfTravelFormConfigFn;
  travelRequestId: any;
  requesterFirstLastName: any;
  loggedInUserEmail: any;
  purposeClass = 'purposeClass';
  reasonForTravel = 'ReasonForTravel';
  dataObj: any;
  constructor(
    private createService: CreateService,
    private router: Router,
    private requestsService: RequestsService
  ) {}

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
    sessionStorage.setItem('AccommodationRequestAdded', JSON.stringify(false));
    sessionStorage.setItem('VehicleRequestAdded', JSON.stringify(false));
    this.loadPurposeOfTravelFormFn();
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
      primaryRequestType: 'flight',
    };
    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.travelRequestId,
        formData
      );
      this.router.navigateByUrl('/account/request/flights/options', {
        state: { travelRequestId: this.travelRequestId },
      });
      sessionStorage.setItem('CompletetedReasonStep', JSON.stringify(true));
    } catch (e) {
      console.log('Reason for Request Error', e.message);
    }
  }
}

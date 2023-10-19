import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CreateService } from 'src/app/services/create.service';
import { DynamicFormConfigService } from 'src/app/services/dynamic-form-config.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { RequestsService } from '../requests.service';

@Component({
  selector: 'app-travel-purpose',
  template: `
    <!-- <div>
    <button (click)="loadDataFn()">Get Started</button>
  </div> -->
    <ng-container *ngIf="showForm">
      <div>
        <app-dynamic-form
          (submittedFormData)="emittedChildDataFn($event)"
          [f]="purposeOfTravelFormConfigFn"
        >
        </app-dynamic-form>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class TravelPurposeComponent implements OnInit {
  purposeOfTravelFormConfigFn;
  showForm = false;
  travelRequestId: any;
  loggedInUserEmail: any;
  constructor(
    private createService: CreateService,
    private requestsService: RequestsService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.showForm = true;
    }, 2000);

    this.loadDataFn();
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
  }

  async loadDataFn() {
    this.purposeOfTravelFormConfigFn =
      await this.requestsService.purposeOfTravelConfigFn(
        'raBranchDirectory',
        'branchName',
        'asc',
        'raEmployeeDirectory',
        'personLegalNameFirst',
        'asc'
      );
    this.showForm = true;
  }

  emittedChildDataFn(d: any) {
    console.log('Emitted Data', d);
    console.log('Emitted Start Date', d.start);
    console.log('Emitted Return Date', d.end);

    const travelRequestId = UidGeneratorService.newId();
    sessionStorage.setItem('TravelRequestId', JSON.stringify(travelRequestId));

    console.log('NEW ENTRY');
    const data = {
      travelRequestId,
      ...d,
    };
    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
        this.loggedInUserEmail,
        data
      );
    } catch (error) {
      console.log('Err', error);
    }
  }
}

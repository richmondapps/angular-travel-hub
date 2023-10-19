import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { UpdateService } from 'src/app/services/update.service';
import { NewProfileService } from '../new-profile.service';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css'],
})
export class NewProfileComponent implements OnInit {
  personEmail: any;
  formConfig: any;
  formCSSClass = 'newProfile';
  constructor(
    private updateService: UpdateService,
    private createService: CreateService,
    private newProfileService: NewProfileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.personEmail = JSON.parse(sessionStorage.getItem('LoggedInUserEmail'));
    this.fetchFormConfigFn();
  }

  async fetchFormConfigFn() {
    this.formConfig = await this.newProfileService.employeeProfileFn();
  }

  receivedDynamicDataFn(e: any) {
    const personBirthDD = e.personBirthDate.getDate();
    const personBirthMM = e.personBirthDate.getMonth() + 1;
    const personBirthYYYY = e.personBirthDate.getFullYear();
    const rootCollection = `raBranchDirectory`;

    const profileObj = {
      createId: this.personEmail,
      updateId: this.personEmail,
      docId: this.personEmail,
      deleteId: this.personEmail,
      readId: this.personEmail,
      personLegalNameFirst: e.personLegalNameFirst,
      personLegalNameMiddle: e.personLegalNameMiddle || '',
      personLegalNameLast: e.personLegalNameLast,
      personCellPhone: e.personCellPhone,
      raBranch: e.personCscBranch,
    };

    const travelObj = {
      ...e,
      personEmail: this.personEmail,
      createId: this.personEmail,
      updateId: this.personEmail,
      docId: this.personEmail,
      deleteId: this.personEmail,
      readId: this.personEmail,
      birthMonth: personBirthMM,
      birthDate: personBirthDD,
      birthYear: personBirthYYYY,
      personBirthDate: new Date(
        `${personBirthMM}/${personBirthDD}/${personBirthYYYY}`
      ),
    };

    try {
      this.createService.createRecordFn(
        `${GlobalConstants.rootEmployeeCollection}`,
        this.personEmail,
        profileObj
      );

      this.updateService.updateRecordFn(
        `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/travelProfile`,
        this.personEmail,
        travelObj
      );
      this.router.navigateByUrl('/account/profile');
    } catch (error) {}
  }
}

import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { ReadService } from 'src/app/services/read.service';
import { UpdateService } from 'src/app/services/update.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  personEmail: any;
  formConfig: any;
  formCSSClass = 'updateEmployeeProfile';
  saveToCollection: string = "path";
  patchValues: any[];
  offsetBD: Date;

  constructor(
    private readService: ReadService,
    private updateService: UpdateService,
    private createService: CreateService,
    private employeeService: EmployeeService,
    private scroll: ViewportScroller,
    private dateTimeService: DateAndTimeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.personEmail = JSON.parse(sessionStorage.getItem('LoggedInUserEmail'));
    console.log('SESSION EMAIL', this.personEmail);
 this.formPatchData();
  }
  cancelFn(){
    this.router.navigateByUrl('/account/profile');
  }
  async formPatchData(){
    this.scroll.scrollToPosition([0,0]);

    this.formConfig =  await this.employeeService.employeeProfileFn();
    console.log('CONFIG', this.formConfig);
  this.formCSSClass = this.formCSSClass;
  // this.saveToCollection = saveToCollection ?? null;

  this.patchValues = await this.readService.returnPromiseWhereFn(
    `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/travelProfile`,
    'personEmail',
  this.personEmail
    );

// const arr = []
// for(let x of pv){
//   x.personBirthDate = new Date(`${x.birthMonth}/${x.birthDate}/${x.birthYear}`)
//   arr.push(x)
// }
// this.patchValues =  arr;
// console.log('this.patchValues', this.patchValues);

  }

  receivedDynamicDataFn(e: any){
    console.log('PROFILE EVENT', e);
    const personBirthDD = e.personBirthDate.getDate();
    const personBirthMM = e.personBirthDate.getMonth() + 1;
    const personBirthYYYY = e.personBirthDate.getFullYear();
    console.log('personBirthDD', personBirthDD);
    console.log('personBirthMM', personBirthMM);
    console.log('personBirthYYYY', personBirthYYYY);
    const rootCollection = `raBranchDirectory`;
    if(e.personBirthDate){
      this.offsetBD = this.dateTimeService.offsetTimezoneDateFn(e.personBirthDate);
    }
    // const saveTo = `${rootCollection}/${this.docId}/${this.saveToCollection}`
    const obj = {
      ...e,
      birthMonth: personBirthMM,
      birthDate: personBirthDD,
      birthYear: personBirthYYYY,
      personBirthDate: new Date(`${personBirthMM}/${personBirthDD}/${personBirthYYYY}`)
    }

    try {
       this.updateService.updateRecordFn(
      `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/travelProfile`,
      this.personEmail,
      obj
    )
    this.router.navigateByUrl('/account/profile')

    } catch (error) {

    }

  }
}

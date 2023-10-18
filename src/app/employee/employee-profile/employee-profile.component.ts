import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CreateService } from 'src/app/services/create.service';
import { ReadService } from 'src/app/services/read.service';
import { EmployeeService } from '../employee.service';
import { GlobalConstants } from 'src/app/global-variables';
import { UpdateService } from 'src/app/services/update.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { PhoneFormatPipe } from 'src/app/shared/pipes/phone-format.pipe';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css'],
  providers: [PhoneFormatPipe]
})
export class EmployeeProfileComponent implements OnInit {
type: 'edit' | 'content' = 'content';
patchValues: any;
formConfig: any;
formCSSClass: string;
saveToCollection: string;
  personEmail: any;
  externalDetail: any;
  profile: any;
  updateMembershipEmail: any;
  offsetBD: Date;
  constructor(
    private route: ActivatedRoute,
    private readService: ReadService,
    private updateService: UpdateService,
    private createService: CreateService,
    private employeeService: EmployeeService,
    private scroll: ViewportScroller,
    private dateTimeService: DateAndTimeService,

    public dialog: MatDialog,
    private phoneFormat: PhoneFormatPipe
  ) { }

  ngOnInit(): void {
   this.personEmail = JSON.parse(sessionStorage.getItem('LoggedInUserEmail'));
   console.log('SESSION EMAIL', this.personEmail);
this.fetchProfileFn(this.personEmail );

  }
  fetchProfileFn( personEmail ){
    this.profile = this.readService.returnObservableWhereFn(
      `${GlobalConstants.rootEmployeeCollection}/${personEmail}/travelProfile`,
      'personEmail',
    this.personEmail
    );
   console.log('profile', this.profile);
   this.profile.subscribe(d => {
   console.log('D', d);
   })
  }

  copyDataFn(d: any){
console.log('COPY D', d);
const [x] = d;
// for(let x of d){
// this.personEmail = x.personEmail;
// }
console.log('SPREAD D', x.personEmail);

const obj = {
  personLegalNamePrefix: x.personLegalNamePrefix,
  personIdentification: x.personIdentification,
  personKnownTravelerNumber: x.personKnownTravelerNumber,
  personRole: x.personRole,
  personBirthDateFromTimestamp: x.personBirthDateFromTimestamp,
  updatedProfileDate: x.updatedProfileDate,
  personCscBranch: x.personCscBranch,
  personAlternatePhone: x.personAlternatePhone,
  personLegalNameMiddle: x.personLegalNameMiddle,
  personSeatPreference: x.personSeatPreference,
     personEmail: x.personEmail,
     personCellPhone: x.personCellPhone,
     personGender: x.personGender,
     personBirthDate: x.personBirthDate,
     personLegalNameFirst: x.personLegalNameFirst,
     personLegalNameLast: x.personLegalNameLast,
     uid: x.uid
}

console.log('Obj', obj);

this.createService.createRecordFn(
  `${GlobalConstants.rootEmployeeCollection}/${x.personEmail}/travelProfile`,
  x.personEmail,
  obj
)
  }

  // async fetchExternalDataFn(){
  //   this.externalDetail =  await this.readService.fetchExternalDbRecordsWhereFn(
  //   'user_rewards_programs',
  //   'personEmail',
  //   this.personEmail
  //   );


  //   this.externalDetail.forEach(x => {
  //     console.log('READ WRITE', x)
  //     if(x.rewardType === 'airline'){

  //       if(x.personEmail){
  //         this.updateMembershipEmail = x.personEmail.toLowerCase()
  //       }
  //       if(x.email){
  //         this.updateMembershipEmail = x.email.toLowerCase()
  //       }
  //           const obj = {
  //             docId: x.docId,
  //             createId: x.docId,
  //             readId: x.docId,
  //             updateId: x.docId,
  //             deleteId: x.docId,
  //             personEmail: this.updateMembershipEmail,
  //             rewardMembershipName: x.airlineName,
  //             rewardMembershipId: x.airlineMembershipId,
  //             rewardType: 'airline'
  //           }
  //           this.createService.createRecordFn(
  //             `${GlobalConstants.rootEmployeeCollection}/${x.personEmail}/travelRewardPrograms`,
  //             x.docId,
  //             obj
  //           )
  //         }
  //     if(x.rewardType === 'hotel'){
  //       if(x.personEmail){
  //         this.updateMembershipEmail = x.personEmail.toLowerCase()
  //       }
  //       if(x.email){
  //         this.updateMembershipEmail = x.email.toLowerCase()
  //       }
  //           const obj = {
  //             docId: x.docId,
  //             createId: x.docId,
  //             readId: x.docId,
  //             updateId: x.docId,
  //             deleteId: x.docId,
  //             personEmail: this.updateMembershipEmail,
  //             rewardMembershipName: x.hotelName,
  //             rewardMembershipId: x.hotelMembershipId,
  //             rewardType: 'accommodation'
  //           }
  //           this.createService.createRecordFn(
  //             `${GlobalConstants.rootEmployeeCollection}/${x.personEmail}/travelRewardPrograms`,
  //             x.docId,
  //             obj
  //           )
  //         }
  //     if(x.rewardType === 'vehicle'){
  //       if(x.personEmail){
  //         this.updateMembershipEmail = x.personEmail.toLowerCase()
  //       }
  //       if(x.email){
  //         this.updateMembershipEmail = x.email.toLowerCase()
  //       }
  //           const obj = {
  //             docId: x.docId,
  //             createId: x.docId,
  //             readId: x.docId,
  //             updateId: x.docId,
  //             deleteId: x.docId,
  //             personEmail: this.updateMembershipEmail,
  //             rewardMembershipName: x.carName,
  //             rewardMembershipId: x.carMembershipId,
  //             rewardType: 'vehicle'
  //           }
  //           this.createService.createRecordFn(
  //             `${GlobalConstants.rootEmployeeCollection}/${x.personEmail}/travelRewardPrograms`,
  //             x.docId,
  //             obj
  //           )
  //         }
  //   });


  //   console.log('externalDetail', this.externalDetail);

  // }


  async formPatchData(val: any, formConfig: any, formCSSClass: string, saveToCollection?: string){
    this.type = val;
    this.scroll.scrollToPosition([0,0]);

    this.formConfig =  await this.employeeService[formConfig]();
    console.log('CONFIG', this.formConfig);
  this.formCSSClass = formCSSClass;
  this.saveToCollection = saveToCollection ?? null;

  this.patchValues = await this.readService.returnPromiseWhereFn(
    `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/travelProfile`,
    'personEmail',
  this.personEmail
    );
  }

  receivedDynamicDataFn(e: any){
    console.log('PROFILE EVENT', e);
    const personBirthDD = e.personBirthDate.getDate();
    const personBirthMM = e.personBirthDate.getMonth() + 1;
    const personBirthYYYY = e.personBirthDate.getFullYear();
    console.log('personBirthDD', personBirthDD);
    console.log('personBirthMM', personBirthMM);
    console.log('personBirthYYYY', personBirthYYYY);
    const rootCollection = `cscBranchDirectory`;
    if(e.personBirthDate){
      this.offsetBD = this.dateTimeService.offsetTimezoneDateFn(e.personBirthDate);
    }
    // const saveTo = `${rootCollection}/${this.docId}/${this.saveToCollection}`
    const obj = {
      ...e,
      birthMonth: personBirthMM,
      birthDate: personBirthDD,
      birthYear: personBirthYYYY,
      personBirthDate: this.offsetBD
    }

    try {
       this.updateService.updateRecordFn(
      `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/travelProfile`,
      this.personEmail,
      obj
    )
      this.type = 'content';
    } catch (error) {

    }



  if(e.docId){
    // this.docId = e.docId;
  } else {
    // this.docId = this.afs.createId();
  }
  if(e.selectedStaff){
    // this.personEmail = e.selectedStaff.personEmail;
  // const staffData = {
  //   docId: this.personEmail,
  //   employeeEmail: this.personEmail,
  //   staffIndex: 99
  // }

    //   try {
    //   this.createService.createRecordFn(
    //     saveTo,
    //     this.personEmail,
    //     staffData
    //   )
    //   this.type = 'content';
    // } catch (e) {
    //   console.log('ERROR MSG', e);
    //   }
  }


    const formData = {
      ...e,
      docId: e.email,
      personEmail: e.email
    }
   console.log('formData', formData);
  //  console.log('saveToCollection', saveTo);

    // try {
    //   this.createService.createRecordFn(
    //     `cscExecutives`,
    //     e.email,
    //     formData
    //   )
    //   this.type = 'content';
    // } catch (e) {
    //   console.log('ERROR MSG', e);
    //   }
  }


changeType(val){
  this.type = val;
}
  get isContent(){
    return this.type === 'content';
  }
 get isEdit(){
    return this.type === 'edit';
  }
}

import { Injectable } from '@angular/core';
import { ReadService } from 'src/app/services/read.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private readService: ReadService
  ) { }

  async employeeProfileFn(
    branchCollection?: any,
    branchField?: any,
    branchDirection?: any
  ){
    return [
      {
        cssWrapperClass: 'personLegalNamePrefix',
        controlLabel: 'Prefix',
        controlName: 'personLegalNamePrefix',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Prefix',
        validators: {
          minlength: 2,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personLegalNameFirst',
        controlLabel: 'First Name',
        controlName: 'personLegalNameFirst',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'First Name',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personLegalNameMiddle',
        controlLabel: 'Middle Name',
        controlName: 'personLegalNameMiddle',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Middle Name',
        validators: {
          minlength: 2,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personLegalNameLast',
        controlLabel: 'Last Name',
        controlName: 'personLegalNameLast',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Last Name',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personLegalNameSuffix',
        controlLabel: 'Suffix',
        controlName: 'personLegalNameSuffix',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Suffix',
        validators: {
          minlength: 2,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personEmail',
        controlLabel: 'Email',
        controlName: 'personEmail',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Email',
        validators: {
          required: true,
          minlength: 6,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personGender',
        controlLabel: 'Gender',
        controlName: 'personGender',
        controlType: 'radio',
        placeholder: 'Gender',
        options: [{
          required: true,
          optionName: 'Male',
          value: 'male'
        },
        {
          optionName: 'Female',
          value: 'female'
        },
        {
          optionName: 'X',
          value: 'x'
        }],
        validators: {
          required: true
        }
      },
      {
        cssWrapperClass: 'personBirthDate',
        controlLabel: 'Birth Date',
        controlName: 'personBirthDate',
        controlType: 'date',
        valueType: 'text',
        placeholder: 'Birth Date',
        validators: {
          required: true,
          minlength: 6,
          maxlength: 8
        }
      },
      {
        cssWrapperClass: 'personCellPhone',
        controlLabel: 'Cell Phone',
        controlName: 'personCellPhone',
        controlType: 'numberOnly',
        valueType: 'text',
        placeholder: 'Cell Phone',
        validators: {
          required: true,
          minlength: 10,
          maxlength: 10
        }
      },
      {
        cssWrapperClass: 'personCscBranch',
        controlLabel: 'Home Branch',
        controlName: 'personCscBranch',
        controlType: 'select',
        valueType: 'text',
        placeholder: 'Home Branch',
        options: await this.readService.returnSelectOptionsPromiseOrderBy(
        'cscBranchDirectory',
        'branchName',
        'branchName',
        'asc'
        ),
        validators: {
        required: true,
        minlength: 2,
        maxlength: 50
        }
        },
        {
          cssWrapperClass: 'personKnownTravelerNumber',
          controlLabel: 'Known Traveler Number',
          controlName: 'personKnownTravelerNumber',
          controlType: 'text',
          valueType: 'text',
          placeholder: 'Known Traveler Number',
          validators: {
            minlength: 6,
            maxlength: 50
          }
        },
        {
          cssWrapperClass: 'personSeatPreference',
          controlLabel: 'Seat Preference',
          controlName: 'personSeatPreference',
          controlType: 'radio',
          placeholder: 'Seat Preference',
          options: [{
            optionName: 'Aisle',
            value: 'aisle'
          },
          {
            optionName: 'Window',
            value: 'window'
          }
        ],
          validators: {
            required: true
          }
        }
    ]
  }
  async updateEmployeeProfileFn(
    branchCollection?: any,
    branchField?: any,
    branchDirection?: any
  ){
    return [
      {
        cssWrapperClass: 'personLegalNamePrefix',
        controlLabel: 'Prefix',
        controlName: 'personLegalNamePrefix',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Prefix',
        validators: {
          minlength: 2,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personLegalNameFirst',
        controlLabel: 'First Name',
        controlName: 'personLegalNameFirst',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'First Name',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personLegalNameMiddle',
        controlLabel: 'Middle Name',
        controlName: 'personLegalNameMiddle',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Middle Name',
        validators: {
          minlength: 2,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personLegalNameLast',
        controlLabel: 'Last Name',
        controlName: 'personLegalNameLast',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Last Name',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personLegalNameSuffix',
        controlLabel: 'Suffix',
        controlName: 'personLegalNameSuffix',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Suffix',
        validators: {
          minlength: 2,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personEmail',
        controlLabel: 'Email',
        controlName: 'personEmail',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Email',
        validators: {
          required: true,
          minlength: 6,
          maxlength: 50
        }
      },
      {
        cssWrapperClass: 'personGender',
        controlLabel: 'Gender',
        controlName: 'personGender',
        controlType: 'radio',
        placeholder: 'Gender',
        options: [{
          required: true,
          optionName: 'Male',
          value: 'male'
        },
        {
          optionName: 'Female',
          value: 'female'
        },
        {
          optionName: 'X',
          value: 'x'
        }],
        validators: {
          required: true
        }
      },

      {
        cssWrapperClass: 'birthMonth',
        controlLabel: 'MM',
        controlName: 'birthMonth',
        controlType: 'numberOnly',
        valueType: 'text',
        placeholder: 'MM',
        validators: {
          required: true,
          minlength: 1,
          maxlength: 2
        }
      },
      {
        cssWrapperClass: 'birthDate',
        controlLabel: 'DD',
        controlName: 'birthDate',
        controlType: 'numberOnly',
        valueType: 'text',
        placeholder: 'DD',
        validators: {
          required: true,
          minlength: 1,
          maxlength: 2
        }
      },
      {
        cssWrapperClass: 'birthYear',
        controlLabel: 'YYYY',
        controlName: 'birthYear',
        controlType: 'numberOnly',
        valueType: 'text',
        placeholder: 'YYYY',
        validators: {
          required: true,
          minlength: 1,
          maxlength: 2
        }
      },

      {
        controlLabel: 'Cell Phone',
        controlName: 'personCellPhone',
        controlType: 'numberOnly',
        valueType: 'text',
        placeholder: 'Cell Phone',
        validators: {
          required: true,
          minlength: 10,
          maxlength: 10
        }
      },
      {
        cssWrapperClass: 'personCscBranch',
        controlLabel: 'Home Branch',
        controlName: 'personCscBranch',
        controlType: 'select',
        valueType: 'text',
        placeholder: 'Home Branch',
        options: await this.readService.returnSelectOptionsPromiseOrderBy(
        'cscBranchDirectory',
        'branchName',
        'branchName',
        'asc'
        ),
        validators: {
        required: true,
        minlength: 2,
        maxlength: 50
        }
        },
        {
          cssWrapperClass: 'personKnownTravelerNumber',
          controlLabel: 'Known Traveler Number',
          controlName: 'personKnownTravelerNumber',
          controlType: 'text',
          valueType: 'text',
          placeholder: 'Known Traveler Number',
          validators: {
            minlength: 6,
            maxlength: 50
          }
        },
        {
          controlLabel: 'Seat Preference',
          controlName: 'personSeatPreference',
          controlType: 'radio',
          placeholder: 'Seat Preference',
          options: [{
            optionName: 'Aisle',
            value: 'aisle'
          },
          {
            optionName: 'Window',
            value: 'window'
          }
        ],
          validators: {
            required: true
          }
        }
    ]
  }



  rewardMembershipFn(){
    return [
      {
        cssWrapperClass: 'rewardMembershipName',
        controlLabel: ' Name',
        controlName: 'rewardMembershipName',
        controlType: 'text',
        valueType: 'text',
        placeholder: ' Name',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 50
        }
      }, {
        cssWrapperClass: 'rewardMembershipId',
        controlLabel: 'Membership Number',
        controlName: 'rewardMembershipId',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Membership Number',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 50
        }
      }
    ]
  }
}

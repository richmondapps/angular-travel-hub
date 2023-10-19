import {
  Injectable
} from '@angular/core';
import {
  FormGroup
} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  formErrors = {
    accommodationAddressCity: '',
    billableBranch: '',
    clientTitle: '',
    clientCategory: '',
    eventTitle: '',
    eventVenue: '',
    incentiveName:'',
    jobId: '',
    flightDeptDate: '',
    flightReturnDate: '',
    flightFromAirport: '',
    flightToAirport: '',
    managerWhoApproved:'',
    personGuardCardNumber: '',
    personGuardCardExpirationDate: '',
    organizationName: '',
    personFirstName: '',
    personLegalNameFirst: '',
    personLastName: '',
    personLegalNameLast: '',
    personEmail: '',
    personPhoneNumber: '',
    personMessage: '',
    personSubject: '',
    personLocation: '',
    purposeOfTravel: '',
    sectionTitle: '',
    sectionCopy: '',
    sectionRadio: '',
    sectionDropdown: '',
    startDate: '',
    twilioMessage:'',
    venueName: '',
    venueAddressOne: '',
    venueAddressTwo: '',
    venueAddressCity: '',
    venueAddressState: '',
    venueAddressZip: ''
  };
  validationMessages = {
    accommodationAddressCity: {
      required: 'Branch is required.',
      minlength: 'Branch name be more than 2 characters.',
      maxlength: 'Branch name must be less than 50.'
    },
    billableBranch: {
      required: 'Branch is required.',
      minlength: 'Branch name be more than 2 characters.',
      maxlength: 'Branch name must be less than 50.'
    },
    clientTitle: {
      required: 'Name is required.',
      minlength: 'Name be more than 2 characters.',
      maxlength: 'Name must be less than 100.'
    },
    clientCategory: {
      required: 'Category is required.'
    },
    raJobOptions: {
      required: 'Selection is required.'
    },
    raSofiTimeSlots: {
      required: 'Selection is required.'
    },
    incentiveName: {
      required: 'Incentive Title is required.'
    },
    flightDeptDate: {
      required: 'Date is required.',
      minlength: 'Must be more than 9 characters.',
      maxlength: 'Must be less than 10.'
    },
    flightReturnDate: {
      required: 'Date is required.',
      minlength: 'Must be more than 9 characters.',
      maxlength: 'Must be less than 10.'
    },
    flightPreferredDepartureTime: {
      required: 'Date is required.',
      minlength: 'Must be more than 2 characters.',
      maxlength: 'Must be less than 20.'
    },
    flightPreferredReturnTime: {
      required: 'Date is required.',
      minlength: 'Must be more than 2 characters.',
      maxlength: 'Must be less than 20.'
    },
    flightIndividualRequestNotes: {
      required: 'Date is required.',
      minlength: 'Must be more than 5 characters.',
      maxlength: 'Must be less than 500.'
    },
    flightFromAirport: {
      required: 'Airport is required.'
    },
    flightToAirport: {
      required: 'Airport is required.'
    },
    jobId: {
      minlength: 'Must be more than 2 characters.',
      maxlength: 'Must be less than 50.'
    },
    managerWhoApproved: {
      required: 'Approval Required.',
      minlength: 'Must be more than 2 characters.',
      maxlength: 'Must be less than 50.'
    },
    personGuardCardNumber: {
      required: 'Guard Card number is required.',
      minlength: 'Guard Card number must be more than 5 characters.',
      maxlength: 'Guard Card number must be less than 25.'
    },
    purposeOfTravel: {
      required: 'Purpose of rquest is required.',
      minlength: 'Must be more than 3 characters.',
      maxlength: 'Must be less than 50.'
    },
    purposeOfTravelNotes: {
      minlength: 'Must be more than 5 characters.',
      maxlength: 'Must be less than 500.'
    },
    personGuardCardExpirationDate: {
      required: 'Expiration Date is required.',
      pattern: 'Incorrect Date Format',
      minlength: 'Date must be at least 8 characters. E.g. 1/1/2022',
      maxlength: 'Date cannot exceed 10 characters. E.g. 01/01/2022'
    },
    sectionRadio: {
      required: 'Section Email is required.',
      minlength: 'Min length is 6'
    },
    eventTitle: {
      required: 'Event Title is required.',
      minlength: 'Min length is 2',
      maxlength: 'Max length is 100'
    },
    eventVenue: {
      required: 'Venue is required.',
      minlength: 'Min length is 2',
      maxlength: 'Max length is 100'
    },
    eventDescription: {
      required: 'Description is required.',
      minlength: 'Min length is 2',
      maxlength: 'Max length is 200'
    },
    startDate: {
      required: 'Start Date is required.',
      minlength: 'Min length is 10',
      maxlength: 'Max length is 10'
    },
    sectionTitle: {
      required: 'Section Email is required.',
      minlength: 'Min length is 5'
    },
    sectionDropdown: {
      required: 'Section Email is required.',
      minlength: 'Min length is 5'
    },
    sectionCopy: {
      required: 'Section Copy is required.',
      minlength: 'Min length is 10'
    },
    twilioMessage: {
      required: 'Sorry, no empty messages allowed!.',
      minlength: 'Minimum length is 2 characters'
    },
    venueName: {
      required: 'Venue Name is required.',
      minlength: 'Min length is 4'
    },

    personEmployeeNumber: {
      required: 'Employee Number is required.',
      minlength: 'Employee Number must be greater than 5 characters.',
      maxlength: 'Employee Number must be less than 20 characters.'
    },
    personLegalNameFirst: {
      required: 'First Name is required.',
      minlength: 'First Name must be greater than 2 characters.',
      maxlength: 'First Name must be less than 50 characters.'
    },
    personLegalNameLast: {
      required: ' Last Name is required.',
      minlength: 'Last Name must be greater than 2 characters.',
      maxlength: 'Last Name must be less than 50 characters.'
    },
    personFirstName: {
      required: 'First Name is required.',
      minlength: 'First Name must be greater than 2 characters.',
      maxlength: 'First Name must be less than 50 characters.'
    },
    personLastName: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be greater than 2 characters.',
      maxlength: 'Last Name must be less than 50 characters.'
    },
    personEmail: {
      required: 'Email is required.'
    },
    personPhoneNumber: {
      required: 'Phone Number is required.',
      minlength: 'Phone Number must be 10 characters.'
    },
    personCellPhone: {
      required: 'Phone Number is required.',
      minlength: 'Phone Number must be 10 characters.'
    },
    personLocation: {
      required: 'Location is required.',
      minlength: 'Location must be 2 characters.',
      maxlength: 'Location cannot be more than 50 characters.'
    },
    personMessage: {
      required: 'Message is required.',
      minlength: 'Message must be more than 25 characters.',
      maxlength: 'Message cannot be more than 500 characters.'
    },
    personSubject: {
      required: 'Message is required.',
      minlength: 'Message must be more than 5 characters.',
      maxlength: 'Message cannot be more than 100 characters.'
    },
     venueAddressOne: {
      required: 'Address is required.',
      minlength: 'Min length is 5 characters.',
      maxlength: 'Max length is 100 characters.'
    },
    venueAddressTwo: {
      minlength: 'Min length is 1 characters.',
      maxlength: 'Max length is 50 characters.'
    },
    venueAddressCity: {
      required: 'City is required.',
      minlength: 'Min length is 3 characters.',
      maxlength: 'Max length is 100 characters.'
    },
    venueAddressState: {
      required: 'State abbreviation is required.',
      minlength: 'Min length is 2 characters.',
      maxlength: 'Max length is 2 characters.'
    },
    venueAddressZip: {
      required: 'ZIP is required.',
      minlength: 'Min length is 5 characters.',
      maxlength: 'Max length is 10 characters.'
    }
  };
  constructor() {}

  customPatchValue(data: any, formGroup: FormGroup) {
  //  console.log('PATCH DATA', data);
  //  console.log(formGroup);

    data.map((k: any) => {
    //  console.log('K', k);
      const truthy = Object.keys(k).filter(v => k[v] !== undefined || k[v] !== null || k[v] !== '');
     // console.log(truthy);
      const newObj = {};
      truthy.forEach(v => Object.assign(newObj, {
        [v]: k[v]
      }));
     // console.log(newObj);
    //  console.log(truthy);
      formGroup.patchValue(newObj);
    });
    return formGroup;
  }

  logValidationErrors(group: FormGroup): void {
    // console.log(group);
    Object.keys(group.controls).forEach((key: string) => {
   //   console.log('KEY', key);
      const abstractControl = group.get(key);
      console.log('AbstractControl', abstractControl);
      if (abstractControl instanceof FormGroup) {
       // console.log('FormGroup AbstractControl', abstractControl);
        return this.logValidationErrors(abstractControl);
      } else {
        this.formErrors[key] = '';
       // console.log('FormErrors[key]',  this.formErrors[key]);

        if (abstractControl && !abstractControl.valid) {
          const messages = this.validationMessages[key];
        //  console.log(messages);
        // console.log(abstractControl.errors);
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              return this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
      }
    });
  }

  numberOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  trimLowerCaseReplaceSpacesWithHyphenFn(d){
    const val = d.trim().toLowerCase().replace(/\s+/g, ' ').split(' ').join('-');
   // console.log(val);
    return val;
  }
}

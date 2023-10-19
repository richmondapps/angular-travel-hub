import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormConfigService {

  constructor() { }

  async userProfileFn(
    collection: string,
    field: string,
    direction: any){
    return [

      {
        cssWrapperClass: 'sofiJobFairPersonLegalNameFirst',
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
          cssWrapperClass: 'sofiJobFairPersonLegalNameLast',
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
            cssWrapperClass: 'sofiJobFairPersonEmail',
            controlLabel: 'Email',
            controlName: 'personEmail',
            controlType: 'text',
            valueType: 'text',
            placeholder: 'Email',
            validators: {
            required: true,
            minlength: 2,
            maxlength: 50
            }
            },
            {
              cssWrapperClass: 'sofiJobFairPersonCellPhone',
              controlLabel: 'Mobile Phone # (Optional)',
              controlName: 'personCellPhone',
              controlType: 'numberOnly',
              valueType: 'text',
              placeholder: 'Mobile Phone # (Optional)',
              validators: {
              minlength: 10,
              maxlength: 10
              }
              },
          {
            cssWrapperClass: 'sofiJobFairJobOptions',
            controlLabel: 'Job Options',
            controlName: 'jobOptions',
            controlType: 'select',
            valueType: 'text',
            placeholder: 'Available Positions',
            options: [
             {
                optionName: 'Catering - Legends',
                value: 'Catering - Legends'
              },
              {
                optionName: 'Culinary - Legends',
                value: 'Culinary - Legends'
              },
              {
                optionName: 'Clubs - Legends',
                value: 'Clubs - Legends'
              },
              {
                optionName: 'Concessions - Legends',
                value: 'Concessions - Legends'
              },
              {
                optionName: ' Guest Services - RA',
                value: ' Guest Services - RA'
              },
              {
                optionName: 'Hospitality - Legends',
                value: 'Hospitality - Legends'
              },
              {
                optionName: 'Security - RA',
                value: 'Security - RA'
              },
              {
                optionName: 'Suites - Legends',
                value: 'Suites - Legends'
              },
              {
                optionName: 'Merchandise - Legends',
                value: 'Merchandise - Legends'
              },
              {
                optionName: 'Tours - Legends',
                value: 'Tours - Legends'
              },
              {
                optionName: 'Ushers - RA',
                value: 'Ushers - RA'
              },
              {
                optionName: 'Warehouse - Legends',
                value: 'Warehouse - Legends'
              }
            ],
            validators: {
            required: true,
            minlength: 2,
            maxlength: 50
            }
            },
            {
              cssWrapperClass: 'sofiJobFairSofiTimeSlots',
              controlLabel: 'Preferred Time of Arrival',
              controlName: 'sofiTimeSlots',
              controlType: 'select',
              valueType: 'text',
              placeholder: 'Time Slots ',
              options: [
                {
                  optionName: '10 AM',
                  value: '10 AM'
                },
                {
                  optionName: '11 AM',
                  value: '11 AM'
                },
                {
                  optionName: '12 PM',
                  value: '12 PM'
                },
                {
                  optionName: '1 PM',
                  value: '1 PM'
                },
                {
                  optionName: '2 PM',
                  value: '2 PM'
                }
              ],
              validators: {
              required: true,
              minlength: 2,
              maxlength: 50
              }
              }
    ];

  }
  async sofiLegendsApplicationFn(){
    return [
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
            cssWrapperClass: 'personEmail',
            controlLabel: 'Email',
            controlName: 'personEmail',
            controlType: 'text',
            valueType: 'text',
            placeholder: 'Email',
            validators: {
            required: true,
            minlength: 2,
            maxlength: 50
            }
            },
            {
              cssWrapperClass: 'personCellPhone',
              controlLabel: 'Mobile Phone # (Optional)',
              controlName: 'personCellPhone',
              controlType: 'numberOnly',
              valueType: 'text',
              placeholder: 'Mobile Phone # (Optional)',
              validators: {
              minlength: 10,
              maxlength: 10
              }
              },
          {
            cssWrapperClass: 'legendsJobOptions',
            controlLabel: 'Legends Job Options',
            controlName: 'legendsJobOptions',
            controlType: 'select',
            valueType: 'text',
            placeholder: 'Legends Job Options',
            options: [
              {
                optionName: 'Catering',
                value: 'Catering'
              },
              {
                optionName: 'Culinary',
                value: 'Culinary'
              },
              {
                optionName: 'Clubs',
                value: 'Clubs'
              },
              {
                optionName: 'Concessions',
                value: 'Concessions'
              },
              {
                optionName: 'Hospitality',
                value: 'Hospitality'
              },
              {
                optionName: 'Suites',
                value: 'Suites'
              },
              {
                optionName: 'Merchandise',
                value: 'Merchandise'
              },
              {
                optionName: 'Tours',
                value: 'Tours'
              },
              {
                optionName: 'Warehouse',
                value: 'Warehouse'
              }
            ],
            validators: {
            required: true,
            minlength: 2,
            maxlength: 50
            }
            },
            {
              cssWrapperClass: 'legendsSofiTimeSlots',
              controlLabel: 'Time',
              controlName: 'legendsSofiTimeSlots',
              controlType: 'select',
              valueType: 'text',
              placeholder: 'Time',
              options: [
                {
                  optionName: '10 AM',
                  value: '10 AM'
                },
                {
                  optionName: '11 AM',
                  value: '11 AM'
                },
                {
                  optionName: '12 PM',
                  value: '12 PM'
                },
                {
                  optionName: '1 PM',
                  value: '1 PM'
                },
                {
                  optionName: '2 PM',
                  value: '2 PM'
                }
              ],
              validators: {
              required: true,
              minlength: 2,
              maxlength: 50
              }
              }
    ];

  }

  venueNameFn(){
    return [
      {
        cssWrapperClass: 'venueName',
        controlLabel: 'Venue Name',
        controlName: 'venueName',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Venue Name',
        validators: {
          required: true,
          minlength: 4,
          maxlength: 50
        }
      },
      {
        controlName: 'actionButtons',
        controlType: 'actionButtons'
      }
    ];
  }
  venueAddressFn(){
    return [
          {
        cssWrapperClass: 'venueAddressOne',
        controlLabel: 'Venue Address',
        controlName: 'venueAddressOne',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Venue Address',
        validators: {
          required: true,
          minlength: 5,
          maxlength: 100
        }
      },
      {
        cssWrapperClass: 'venueAddressTwo',
        controlLabel: 'Suite #',
        controlName: 'venueAddressTwo',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Suite #',
        validators: {
          minlength: 5,
          maxlength: 100
        }
      },
      {
        cssWrapperClass: 'venueAddressCity',
        controlLabel: 'Venue City',
        controlName: 'venueAddressCity',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Venue City',
        validators: {
          required: true,
          minlength: 3,
          maxlength: 100
        }
      },
      {
        cssWrapperClass: 'venueAddressState',
        controlLabel: 'Venue State',
        controlName: 'venueAddressState',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Venue State',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 2
        }
      },
      {
        cssWrapperClass: 'venueAddressZip',
        controlLabel: 'Venue Zip',
        controlName: 'venueAddressZip',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Venue Zip',
        validators: {
          required: true,
          minlength: 5,
          maxlength: 10
        }
      },
      {
        controlName: 'actionButtons',
        controlType: 'actionButtons'
      }
    ];
  }
  venueInfoFn(){
    return [
          {
        cssWrapperClass: 'venueInfo',
        controlLabel: 'Venue Info',
        controlName: 'venueInfo',
        controlType: 'textarea',
        valueType: 'text',
        placeholder: 'Venue Info',
        validators: {
          required: true,
          minlength: 50,
          maxlength: 1500
        }
      },
      {
        controlName: 'actionButtons',
        controlType: 'actionButtons'
      }
    ];
  }

  venueThumbNameFn(){
    return [
          {
        cssWrapperClass: 'venueThumbId',
        controlLabel: 'Venue Thumb',
        controlName: 'venueThumbId',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Venue Thumb',
        validators: {
          required: true,
          minlength: 6,
          maxlength: 50
        }
      },
      {
        controlName: 'actionButtons',
        controlType: 'actionButtons'
      }
    ];
  }

  branchVenuesEventFn(){
  return [
    {
      cssWrapperClass: 'eventTitle',
      controlLabel: 'Event Title',
      controlName: 'eventTitle',
      controlType: 'text',
      valueType: 'text',
      placeholder: 'Event Title',
      validators: {
        required: true,
        minlength: 6,
        maxlength: 50
      }
    },
    {
      cssWrapperClass: 'eventDescription',
      controlLabel: 'Event Description',
      controlName: 'eventDescription',
      controlType: 'textarea',
      valueType: 'text',
      placeholder: 'Event Description',
      validators: {
        required: true,
        minlength: 6,
        maxlength: 100
      }
    },
    {
      cssWrapperClass: 'eventVenue',
      controlLabel: 'Event Venue',
      controlName: 'eventVenue',
      placeholder: 'Select Venue',
      controlType: 'select',
      valueType: 'text',
      options: this.venueNamesFn(),
      validators: {
        required: true
      }
    },
    {
      cssWrapperClass: 'startDate',
      controlLabel: 'Start Date',
      controlName: 'startDate',
      controlType: 'date',
      minDate: new Date(),
      placeholder: 'Start Date',
      validators: {
        required: true,
        minlength: 10,
        maxlength: 10
      }
    },
    {
      cssWrapperClass: 'eventAllDay',
      controlLabel: 'All Day',
      controlName: 'eventAllDay',
      controlType: 'checkbox'
    },
  ];
}
  branchSpecificVenueEventFn(){
  return [
    {
      cssWrapperClass: 'eventTitle',
      controlLabel: 'Event Title',
      controlName: 'eventTitle',
      controlType: 'text',
      valueType: 'text',
      placeholder: 'Event Title',
      validators: {
        required: true,
        minlength: 6,
        maxlength: 50
      }
    },
    {
      cssWrapperClass: 'startDate',
      controlLabel: 'Start Date',
      controlName: 'startDate',
      controlType: 'date',
      minDate: new Date(),
      placeholder: 'Start Date',
      validators: {
        required: true,
        maxlength: 10
      }
    },
    {
      cssWrapperClass: 'eventAllDay',
      controlLabel: 'All Day',
      controlName: 'eventAllDay',
      controlType: 'checkbox'
    },
  ];
}


venueNamesFn(){
return [
  {
    optionName: 'Dignity Health Sports Park',
    value: 'Dignity Health Sports Park'
  },
  {
    optionName: 'Banc of California',
    value: 'Banc of California'
  },
  {
    optionName: 'Galen Center',
    value: 'Galen Center'
  },
  {
    optionName: 'The Forum',
    value: 'The Forum'
  }
]
}
}

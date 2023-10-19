import { Injectable } from '@angular/core';
import { ReadService } from '../services/read.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
   multiFlightDate: Date;

  constructor(public readService: ReadService) { }


// #region COMBOS
   returnFlightAndHotelConfigFn(minStartDate, maxEndDate){
      return [
       {
          cssWrapperClass: 'hotelCheckInDate',
          controlLabel: 'Check In',
          controlName: 'hotelCheckInDate',
          controlType: 'date',
          valueType: 'text',
          minDate: minStartDate,
          maxDate: maxEndDate,
          placeholder: 'Check In',
          validators: {
            required: true
          }
        },
        {
          cssWrapperClass: 'hotelCheckOutDate',
          controlLabel: 'Check Out',
          controlName: 'hotelCheckOutDate',
          controlType: 'date',
          valueType: 'text',
          minDate: minStartDate,
          maxDate: maxEndDate,
          placeholder: 'Check Out',
          validators: {
            required: true
          }
        },
        {
          cssWrapperClass: 'hotelBedOptions',
          controlLabel: 'Room Type',
          controlName: 'hotelBedOptions',
          controlType: 'select',
          valueType: 'text',
          placeholder: 'Room Type',
          options: this.hotelRoomTypeFn(),
          validators: {
            required: true,
            minlength: 6,
            maxlength: 500
          }
        },
        {
          cssWrapperClass: 'hotelBudget',
          controlLabel: 'Price Range',
          controlName: 'hotelBudget',
          controlType: 'select',
          valueType: 'text',
          placeholder: 'Price Range',
          options: this.hotelPriceRangesFn(),
          validators: {
            required: true,
            minlength: 6,
            maxlength: 500
          }
        },
        {
          cssWrapperClass: 'hotelLandmarkZip',
          controlLabel: 'Preferred Hotel Location (Landmark/Zip Code)',
          controlName: 'hotelLandmarkZip',
          controlType: 'text',
          valueType: 'text',
          placeholder: 'Notes',
          validators: {
            minlength: 3,
            maxlength: 500
          }
        },
        {
          cssWrapperClass: 'hotelBookingComments',
          controlLabel: 'Comments/Notes',
          controlName: 'hotelBookingComments',
          controlType: 'textarea',
          valueType: 'text',
          minRows: 5,
          maxrows:30,
          placeholder: 'Notes',
          validators: {
            minlength: 6,
            maxlength: 500
          }
        }
    ];
    }
// #endregion COMBOS


// #region PURPOSE

 async purposeOfTravelConfigFn(
    branchCollection: string,
    branchField: string,
    branchDirection: any,
    employeeCollection: string,
    employeeField: string,
    employeeDirection: any

    ){
    return [
      {
        cssWrapperClass: 'managerWhoApproved',
        controlLabel: 'Manager Who Approved',
        controlName: 'managerWhoApproved',
        controlType: 'select',
        valueType: 'text',
        placeholder: 'Manager Who Approved',
        options: await this.readService.branchManagersNamesFn(
           employeeCollection,
          employeeField,
          employeeDirection),
        validators: {
           maxlength: 100,
           minlength: 5,
           required: true
        }
        },
          {
            cssWrapperClass: 'billableBranch',
            controlLabel: 'Billable Branch',
            controlName: 'billableBranch',
            controlType: 'select',
            valueType: 'text',
            placeholder: 'Billable Branch',
            options: await this.readService.returnSelectOptionsPromiseOrderBy(  
            branchCollection,
            branchField,
            branchField,
            branchDirection
            ),
            validators: {
            required: true,
            minlength: 10,
            maxlength: 50
            }
            },
            {
              cssWrapperClass: 'purposeOfTravel',
              controlLabel: 'Purpose Of Travel',
              controlName: 'purposeOfTravel',
              controlType: 'text',
              valueType: 'text',
              placeholder: 'Purpose Of Travel',
              validators: {
              required: true,
              minlength: 3,
              maxlength: 150
              }
              },
              {
               cssWrapperClass: 'jobId',
               controlLabel: 'Job ID',
               controlName: 'jobId',
               controlType: 'text',
               valueType: 'text',
               placeholder: 'Job ID',
               validators: {
               minlength: 2,
               maxlength: 15
               }
               },
              {
                cssWrapperClass: 'purposeOfTravelNotes',
                controlLabel: 'Comments/Notes',
                controlName: 'purposeOfTravelNotes',
                controlType: 'textarea',
                valueType: 'text',
                minRows: 5,
                maxrows:30,
                placeholder: 'Comments/Notes',
                validators: {
                minlength: 2,
                maxlength: 150
                }
                }
                
    ];

  }
// #endregion PURPOSE

// #region FLIGHTS
flightTimesFn(){
  return [
    {
      optionName: '6-9am',
      value: '6-9am'
    },
    {
      optionName: '9-Noon',
      value: '9-Noon'
    },
    {
      optionName: 'Noon-3pm',
      value: 'Noon-3pm'
    },
    {
      optionName: '3-6pm',
      value: '3-6pm'
    },
    {
      optionName: '6-9pm',
      value: '6-9pm'
    },
    {
      optionName: 'Red-Eye',
      value: 'Red-Eye'
    }
  ];
}

singleFlightConfigFn(){
   return [
     {cssWrapperClass: '',
     cssWrapperId: 'singleFlight',
     controlLabel: 'Flying From',
     controlName: 'flightFromAirport',
     controlType: 'select',
     valueType: 'text',
     placeholder: 'Flying From',
     options: this.airportList(),
     validators: {
       required: true
     }
   },
     {cssWrapperClass: '',
     controlLabel: 'Flying To',
     controlName: 'flightToAirport',
     controlType: 'select',
     valueType: 'text',
     placeholder: 'Flying To',
     options: this.airportList(),
     validators: {
       required: true
     }
   },
     {cssWrapperClass: '',
       controlLabel: 'Dept Date',
       controlName: 'flightDeptDate',
       controlType: 'date',
       valueType: 'text',
       minDate: new Date(),
       placeholder: 'Completed Order Date',
       validators: {
         required: true,
         maxlength: 10
       }
     },
     {cssWrapperClass: 'flightPreferredDepartureTime',
       controlLabel: 'Preferred Departure Time',
       controlName: 'flightPreferredDepartureTime',
       controlType: 'select',
       valueType: 'text',
       placeholder: 'Departure Time',
       options: this.flightTimesFn(),
       validators: {
         minlength: 6,
         maxlength: 500
       }
     },
     {cssWrapperClass: 'flightFlexibleDepartureTime',
       controlLabel: 'Check if your time is flexible',
       controlName: 'flightFlexibleDepartureTime',
       controlType: 'checkbox'
     },
     {cssWrapperClass: '',
       controlLabel: 'Notes',
       controlName: 'flightIndividualRequestNotes',
       controlType: 'textarea',
       valueType: 'text',
       minRows: 5,
       maxrows:30,
       placeholder: 'Notes',
       validators: {
         minlength: 6,
         maxlength: 500
       }
     }
 ];
 }
 
 returnFlightConfigFn(startDate?){
   return [
     {
       cssWrapperClass: 'flightFromAirport',
     cssWrapperId: 'returnFlight',
     controlLabel: 'Flying From',
     controlName: 'flightFromAirport',
     controlType: 'select',
     valueType: 'text',
     placeholder: 'Flying From',
     options: this.airportList(),
     validators: {
       required: true
     }
   },
     {cssWrapperClass: 'flightToAirport',
     controlLabel: 'Flying To',
     controlName: 'flightToAirport',
     controlType: 'select',
     valueType: 'text',
     placeholder: 'Flying To',
     options: this.airportList(),
     validators: {
       required: true
     }
   },
     {cssWrapperClass: 'flightDeptDate',
       controlLabel: 'Dept Date',
       controlName: 'flightDeptDate',
       controlType: 'date',
       valueType: 'text',
       minDate: new Date(),
       placeholder: 'Departure Date',
       validators: {
         required: true,
         maxlength: 10,
         minlength: 10
       }
     },
     { cssWrapperClass: 'flightReturnDate',
       controlLabel: 'Return Date',
       controlName: 'flightReturnDate',
       controlType: 'date',
       valueType: 'text',
       minDate: startDate || null,
       placeholder: 'Return Date',
       validators: {
         required: true,
         maxlength: 10,
         minlength: 10
       }
     },
     { cssWrapperClass: 'flightPreferredDepartureTime',
       controlLabel: 'Preferred Departure Time',
       controlName: 'flightPreferredDepartureTime',
       controlType: 'select',
       valueType: 'text',
       placeholder: 'Departure Time',
       options: this.flightTimesFn(),
       validators: {
         required: true,
         minlength: 5,
         maxlength: 50
       }
     },
     { cssWrapperClass: 'flightPreferredReturnTime',
       controlLabel: 'Preferred Return Time',
       controlName: 'flightPreferredReturnTime',
       controlType: 'select',
       valueType: 'text',
       placeholder: 'Return Time',
       options: this.flightTimesFn(),
       validators: {
         required: true,
         minlength: 5,
         maxlength: 50
       }
     },
     { cssWrapperClass: 'flightFlexibleDepartureTime',
       controlLabel: 'Check if your time is flexible',
       controlName: 'flightFlexibleDepartureTime',
       controlType: 'checkbox'
     },
     { cssWrapperClass: 'flightFlexibleReturnTime',
       controlLabel: 'Check if your time is flexible',
       controlName: 'flightFlexibleReturnTime',
       controlType: 'checkbox'
     },
     { cssWrapperClass: 'flightIndividualRequestNotes',
       controlLabel: 'Notes',
       controlName: 'flightIndividualRequestNotes',
       controlType: 'textarea',
       valueType: 'text',
       minRows: 5,
       maxrows:30,
       placeholder: 'Notes',
       validators: {
         minlength: 5,
         maxlength: 500
       }
     }
 ];
 }
  
 mutliFlightConfigFn(lastFlightDate?){
   return [
 
     {
     cssWrapperId: 'multiFlight',
     cssWrapperClass: 'flightFromAirport',
     controlLabel: 'Flying From',
     controlName: 'flightFromAirport',
     controlType: 'select',
     valueType: 'text',
     placeholder: 'Flying From',
     options: this.airportList(),
     validators: {
       required: true
     }
   },
     {
       cssWrapperClass: 'flightToAirport',
     controlLabel: 'Flying To',
     controlName: 'flightToAirport',
     controlType: 'select',
     valueType: 'text',
     placeholder: 'Flying To',
     options: this.airportList(),
     validators: {
       required: true
     }
   },
     {
       cssWrapperClass: 'flightDeptDate',
       controlLabel: 'Dept Date',
       controlName: 'flightDeptDate',
       controlType: 'date',
       valueType: 'text',
       minDate: lastFlightDate,
       placeholder: 'Dept. Date',
       validators: {
         required: true,
         maxlength: 10
       }
     },
     {
       cssWrapperClass: 'flightPreferredDepartureTime',
       controlLabel: 'Preferred Departure Time',
       controlName: 'flightPreferredDepartureTime',
       controlType: 'select',
       valueType: 'text',
       placeholder: 'Departure Time',
       options: this.flightTimesFn(),
       validators: {
         required: true,
         minlength: 6,
         maxlength: 500
       }
     },
     {
       cssWrapperClass: 'flightFlexibleDepartureTime',
       controlLabel: 'Check if your time is flexible',
       controlName: 'flightFlexibleDepartureTime',
       controlType: 'checkbox'
     },
     {
       cssWrapperClass: 'flightIndividualRequestNotes',
       controlLabel: 'Notes',
       controlName: 'flightIndividualRequestNotes',
       controlType: 'textarea',
       valueType: 'text',
       minRows: 5,
       maxrows:30,
       placeholder: 'Notes',
       validators: {
         minlength: 6,
         maxlength: 500
       }
     }
 ];
 }
  
// #endregion FLIGHTS

// #region ACCOMMODATION

hotelPriceRangesFn(){
  return [
    {
      optionName: '$0 - 99',
      value: '$0 - 99'
    },
    {
      optionName: '$100 - 199',
      value: '$100 - 199'
    },
    {
      optionName: '$200+',
      value: '$200+'
    }
  ];
}  

hotelRoomTypeFn(){
   return [
     {
       optionName: '1 Bed',
       value: '1 Bed'
     },
     {
       optionName: '2 Bed',
       value: '2 Bed'
     }
   ];
 }

 hotelConfigFn(){
   return [
      {
         cssWrapperClass: 'accommodationAddressCity',
         controlLabel: 'City/Town',
         controlName: 'accommodationAddressCity',
         controlType: 'text',
         valueType: 'text',
         placeholder: 'City/Town',
         validators: {
         required: true,
         minlength: 2,
         maxlength: 150
         }
         },
         {
            cssWrapperClass: 'accommodationAddressStateAbbr',
            controlLabel: 'State',
            controlName: 'accommodationAddressStateAbbr',
            controlType: 'text',
            valueType: 'text',
            placeholder: 'State Abbr. e.g. CA',
            validators: {
            required: true,
            minlength: 2,
            maxlength: 2
            }
            },
     {
       cssWrapperClass: 'hotelCheckInCheckOutDateRange',
       startDateLabel: 'Check In',
       endDateLabel: 'Check Out',
       controlLabel: 'Check In/Check Out',
       controlName: {
         start: 'hotelCheckInDate',
         end: 'hotelCheckOutDate'
       },
       controlType: 'dateRange',
       valueType: 'text',
       minDate: new Date(),
       placeholder: 'Check In / Check Out',
       validators: {
         required: true
       }
     },
     {
       cssWrapperClass: 'hotelBedOptions',
       controlLabel: 'Room Type',
       controlName: 'hotelBedOptions',
       controlType: 'select',
       valueType: 'text',
       placeholder: 'Room Type',
       options: this.hotelRoomTypeFn(),
       validators: {
         required: true,
         minlength: 6,
         maxlength: 500
       }
     },
     {
       cssWrapperClass: 'hotelBudget',
       controlLabel: 'Price Range',
       controlName: 'hotelBudget',
       controlType: 'select',
       valueType: 'text',
       placeholder: 'Price Range',
       options: this.hotelPriceRangesFn(),
       validators: {
         required: true,
         minlength: 6,
         maxlength: 500
       }
     },
     {
       cssWrapperClass: 'hotelLandmarkZip',
       controlLabel: 'Preferred Hotel Location (Landmark/Zip Code)',
       controlName: 'hotelLandmarkZip',
       controlType: 'text',
       valueType: 'text',
       placeholder: 'Notes',
       validators: {
         minlength: 3,
         maxlength: 500
       }
     },
     {
       cssWrapperClass: 'hotelBookingComments',
       controlLabel: 'Comments/Notes',
       controlName: 'hotelBookingComments',
       controlType: 'textarea',
       valueType: 'text',
       minRows: 5,
       maxrows:30,
       placeholder: 'Notes',
       validators: {
         minlength: 6,
         maxlength: 500
       }
     }
 ];
 }

 editHotelConfigFn(){
   return [
     {
       cssWrapperClass: 'hotelCheckInDate',
       controlLabel: 'Check In',
       controlName: 'hotelCheckInDate',
       controlType: 'date',
       valueType: 'text',
       minDate: new Date(),
       placeholder: 'Check In',
       validators: {
         required: true
       }
     },
     {
       cssWrapperClass: 'hotelCheckOutDate',
       controlLabel: 'Check Out',
       controlName: 'hotelCheckOutDate',
       controlType: 'date',
       valueType: 'text',
       minDate: new Date(),
       placeholder: 'Check Out',
       validators: {
         required: true
       }
     },
     {
       cssWrapperClass: 'hotelBedOptions',
       controlLabel: 'Room Type',
       controlName: 'hotelBedOptions',
       controlType: 'select',
       valueType: 'text',
       placeholder: 'Room Type',
       options: this.hotelRoomTypeFn(),
       validators: {
         required: true,
         minlength: 6,
         maxlength: 500
       }
     },
     {
       cssWrapperClass: 'hotelBudget',
       controlLabel: 'Price Range',
       controlName: 'hotelBudget',
       controlType: 'select',
       valueType: 'text',
       placeholder: 'Departure Time',
       options: this.hotelPriceRangesFn(),
       validators: {
         required: true,
         minlength: 6,
         maxlength: 500
       }
     },
     {
       cssWrapperClass: 'hotelLandmarkZip',
       controlLabel: 'Preferred Hotel Location (Landmark/Zip Code)',
       controlName: 'hotelLandmarkZip',
       controlType: 'text',
       valueType: 'text',
       placeholder: 'Notes',
       validators: {
         minlength: 6,
         maxlength: 500
       }
     },
     {
       cssWrapperClass: 'hotelBookingComments',
       controlLabel: 'Comments/Notes',
       controlName: 'hotelBookingComments',
       controlType: 'textarea',
       valueType: 'text',
       minRows: 5,
       maxrows:30,
       placeholder: 'Notes',
       validators: {
         minlength: 6,
         maxlength: 500
       }
     }
 ];
 }
// #endregion ACCOMMODATION

// #region VEHICLE

   vehicleTypeFn(){
      return [
        {
          optionName: 'Economy',
          value: 'Economy'
        },
        {
          optionName: 'Compact',
          value: 'Compact'
        },
        {
          optionName: 'Standard',
          value: 'Standard'
        },
        {
          optionName: 'Intermediate',
          value: 'Intermediate'
        },
        {
          optionName: 'Full Size',
          value: 'Full Size'
        },
        {
          optionName: 'SUV',
          value: 'SUV'
        },
        {
          optionName: 'Minivan',
          value: 'Minivan'
        },
        {
          optionName: '12 Passenger Van',
          value: '12 Passenger Van'
        },
        {
          optionName: '15 Passenger Van',
          value: '15 Passenger Van'
        }
      ];
    }
 
    vehiclePickupDropoffTimesFn(){
      const times =[

       {
          optionName: '6am',
          value: '6am'
        },
        {
          optionName: '7am',
          value: '7am'
        },
        {
          optionName: '8am',
          value: '8am'
        },
        {
          optionName: '9am',
          value: '9am'
        },
        {
          optionName: '10am',
          value: '10am'
        },
        {
          optionName: '11am',
          value: '11am'
        },
        {
          optionName: '12-Noon',
          value: '12-Noon'
        },
        {
          optionName: '1pm',
          value: '1pm'
        },
        {
          optionName: '2pm',
          value: '2pm'
        },
        {
          optionName: '3pm',
          value: '3pm'
        },
        {
          optionName: '4pm',
          value: '4pm'
        },
        {
          optionName: '5pm',
          value: '5pm'
        },
        {
          optionName: '6pm',
          value: '6pm'
        },
        {
          optionName: '7pm',
          value: '7pm'
        },
        {
          optionName: '8pm',
          value: '8pm'
        },
        {
          optionName: '9pm',
          value: '9pm'
        },
        {
          optionName: '10pm',
          value: '10pm'
        },
        {
          optionName: '11pm',
          value: '11pm'
        },
        {
          optionName: '12-Midnight',
          value: '12-Midnight'
        }
      ];
      return times;
    }
    vehiclePickupDropoffTimesForFlightsFn(){
      return [

         {
            optionName: 'Coordinate with my flight.',
            value: '6am'
          },
          ...this.vehiclePickupDropoffTimesFn()
        
      ];
    }
 

vehcileSizeFn(){
   return [
      {
         cssWrapperClass: 'vehicleSize',
         controlLabel: 'Vehicle Type Preferred ',
         controlName: 'vehicleSize',
         controlType: 'select',
         valueType: 'text',
         placeholder: 'Vehicle Type Preferred ',
         options: this.vehicleTypeFn(),
         validators: {
           required: true,
           minlength: 6,
           maxlength: 100
         }
       },
   ]
}

returnConvertedVehicleDatesFn(){
    const vehicleReturnDD = new Date().getDate();
    const vehicleReturnMM = new Date().getMonth() + 12;
    const vehicleReturnYYYY = new Date().getFullYear();  
   const date = new Date(`${vehicleReturnMM}-${vehicleReturnDD}-${vehicleReturnYYYY}`);
console.log('END DATE', date)
   return date;
 }

    vehicleConfigFn(){
      return [
        {
          cssWrapperClass: 'vehiclePickUpDropOffDateRange',
          startDateLabel: 'Pick Up',
          endDateLabel: 'Drop Off',
          controlLabel: 'Pick Up / Drop Off',
          controlName: {
            start: 'vehiclePickUpDate',
            end: 'vehicleReturnDate'
          },
          controlType: 'dateRange',
          valueType: 'text',
          minDate: new Date(),
          maxDate: this.returnConvertedVehicleDatesFn(),
          placeholder: 'Pick Up / Drop Off',
          validators: {
            required: true
          }
        },
        {
         cssWrapperClass: 'vehicleSize',
         controlLabel: 'Vehicle Type Preferred ',
         controlName: 'vehicleSize',
         controlType: 'select',
         valueType: 'text',
         placeholder: 'Vehicle Type Preferred ',
         options: this.vehicleTypeFn(),
         validators: {
           required: true,
           minlength: 6,
           maxlength: 100
         }
       },
        
        {
          cssWrapperClass: 'vehiclePickUpTime',
          controlLabel: 'Pick Up Time',
          controlName: 'vehiclePickUpTime',
          controlType: 'select',
          valueType: 'text',
          placeholder: 'Pick Up Time',
          options: this.vehiclePickupDropoffTimesFn(),
          validators: {
            required: true,
            minlength: 6,
            maxlength: 500
          }
        },
        {
          cssWrapperClass: 'vehicleReturnTime',
          controlLabel: 'Drop Off Time',
          controlName: 'vehicleReturnTime',
          controlType: 'select',
          valueType: 'text',
          placeholder: 'Drop Off Time',
          options: this.vehiclePickupDropoffTimesFn(),
          validators: {
            required: true,
            minlength: 6,
            maxlength: 500
          }
        },
        {
          cssWrapperClass: 'vehiclePickUpLocation',
          controlLabel: 'Pick Up Location',
          controlName: 'vehiclePickUpLocation',
          controlType: 'text',
          valueType: 'text',
          placeholder: 'E.g. Airport, Zip',
          validators: {
            required: true,
            minlength: 3,
            maxlength: 50
          }
        },
        {
          cssWrapperClass: 'vehicleDropOffLocation',
          controlLabel: 'Drop Off Location',
          controlName: 'vehicleDropOffLocation',
          controlType: 'text',
          valueType: 'text',
          placeholder: 'Drop Off Location',
          validators: {
            required: true,
            minlength:3,
            maxlength: 50
          }
        },
        {
          cssWrapperClass: 'vehiclePickUpDriverName',
          controlLabel: 'Driver Name',
          controlName: 'vehiclePickUpDriverName',
          controlHint: 'The exact name on your Driver\'s License',

          controlType: 'text',
          valueType: 'text',
          placeholder: 'Driver Name',
          validators: {
            required: true,
            minlength: 3,
            maxlength: 150
          }
        },
        {
          cssWrapperClass: 'vehicleDirectBilled',
          controlLabel: 'Direct Billed',
          controlName: 'vehicleDirectBilled',
          controlType: 'checkbox',
          valueType: 'text',
          placeholder: 'Direct Billed',
          validators: {
            minlength: 6,
            maxlength: 6
          }
        },
        {
          cssWrapperClass: 'vehicleBookingComments',
          controlLabel: 'Comments/Notes',
          controlName: 'vehicleBookingComments',
          controlType: 'textarea',
          valueType: 'text',
          minRows: 5,
          maxrows:30,
          placeholder: 'Comments/Notes',
          validators: {
            minlength: 6,
            maxlength: 500
          }
        }        
    ];
 }

    vehicleForFlightsConfigFn(minStartDate?, maxEndDate?){
      return [
       {
          cssWrapperClass: 'vehiclePickUpDate',
          controlLabel: 'Pick Up ',
          controlName: 'vehiclePickUpDate',
          controlType: 'date',
          valueType: 'text',
          minDate: minStartDate,
          maxDate: maxEndDate,
          placeholder: 'Pick Up',
          validators: {
            required: true
          }
        },
        {
          cssWrapperClass: 'vehicleReturnDate',
          controlLabel: 'Drop Off',
          controlName: 'vehicleReturnDate',
          controlType: 'date',
          valueType: 'text',
          minDate: minStartDate,
          maxDate: maxEndDate,
          placeholder: 'Drop Off',
          validators: {
            required: true
          }
        },
        {
          cssWrapperClass: 'vehiclePickUpTime',
          controlLabel: 'Pick Up Time',
          controlName: 'vehiclePickUpTime',
          controlType: 'select',
          valueType: 'text',
          placeholder: 'Pick Up Time',
          options: this.vehiclePickupDropoffTimesFn(),
          validators: {
            required: true,
            minlength: 6,
            maxlength: 500
          }
        },
        {
          cssWrapperClass: 'vehicleReturnTime',
          controlLabel: 'Drop Off Time',
          controlName: 'vehicleReturnTime',
          controlType: 'select',
          valueType: 'text',
          placeholder: 'Drop Off Time',
          options: this.vehiclePickupDropoffTimesFn(),
          validators: {
            required: true,
            minlength: 6,
            maxlength: 50
          }
        },
      
        {
          cssWrapperClass: 'vehiclePickUpLocation',
          controlLabel: 'Pick Up Location',
          controlName: 'vehiclePickUpLocation',
          controlType: 'text',
          valueType: 'text',
          placeholder: 'Pick Up Location',
          validators: {
            required: true,
            minlength: 3,
            maxlength: 50
          }
        },
        {
          cssWrapperClass: 'vehicleDropOffLocation',
          controlLabel: 'Drop Off Location',
          controlName: 'vehicleDropOffLocation',
          controlType: 'text',
          valueType: 'text',
          placeholder: 'Drop Off Location',
          validators: {
            required: true,
            minlength:3,
            maxlength: 50
          }
        },
        {
          cssWrapperClass: 'vehicleSize',
          controlLabel: 'Vehicle Type Preferred ',
          controlName: 'vehicleSize',
          controlType: 'select',
          valueType: 'text',
          placeholder: 'Vehicle Type Preferred ',
          options: this.vehicleTypeFn(),
          validators: {
            required: true,
            minlength: 6,
            maxlength: 100
          }
        },
        {
          cssWrapperClass: 'vehiclePickUpDriverName',
          controlLabel: 'Driver Name',
          controlName: 'vehiclePickUpDriverName',
          controlType: 'text',
          controlHint: 'The exact name on your Driver\'s License',
          valueType: 'text',
          placeholder: 'Driver Name',
          validators: {
            required: true,
            minlength: 3,
            maxlength: 150
          }
        },
        {
          cssWrapperClass: 'vehicleBookingComments',
          controlLabel: 'Comments/Notes',
          controlName: 'vehicleBookingComments',
          controlType: 'textarea',
          valueType: 'text',
          minRows: 5,
          maxrows:30,
          placeholder: 'Comments/Notes',
          validators: {
            minlength: 6,
            maxlength: 500
          }
        },
        {
          cssWrapperClass: 'vehicleDirectBilled',
          controlLabel: 'Direct Billed',
          controlName: 'vehicleDirectBilled',
          controlType: 'checkbox',
          valueType: 'text',
          placeholder: 'Direct Billed',
          validators: {
            minlength: 6,
            maxlength: 6
          }
        }    
    ];
    }
    editVehicleConfigFn(){
      return [
        {
          cssWrapperClass: 'vehiclePickUpDate',
          controlLabel: 'Pick Up ',
          controlName: 'vehiclePickUpDate',
          controlType: 'date',
          valueType: 'text',
          minDate: new Date(),
          placeholder: 'Pick Up',
          validators: {
            required: true
          }
        },
        {
          cssWrapperClass: 'vehicleReturnDate',
          controlLabel: 'Drop Off',
          controlName: 'vehicleReturnDate',
          controlType: 'date',
          valueType: 'text',
          minDate: new Date(),
          placeholder: 'Drop Off',
          validators: {
            required: true
          }
        },
         {
          cssWrapperClass: 'vehicleSize',
          controlLabel: 'Vehicle Type Preferred ',
          controlName: 'vehicleSize',
          controlType: 'select',
          valueType: 'text',
          placeholder: 'Vehicle Type Preferred ',
          options: this.vehicleTypeFn(),
          validators: {
            required: true,
            minlength: 6,
            maxlength: 100
          }
        },
        {
          cssWrapperClass: 'vehiclePickUpTime',
          controlLabel: 'Pick Up Time',
          controlName: 'vehiclePickUpTime',
          controlType: 'select',
          valueType: 'text',
          placeholder: 'Pick Up Time',
          options: this.vehiclePickupDropoffTimesFn(),
          validators: {
            required: true,
            minlength: 6,
            maxlength: 500
          }
        },
        {
          cssWrapperClass: 'vehicleReturnTime',
          controlLabel: 'Drop Off Time',
          controlName: 'vehicleReturnTime',
          controlType: 'select',
          valueType: 'text',
          placeholder: 'Drop Off Time',
          options: this.vehiclePickupDropoffTimesFn(),
          validators: {
            required: true,
            minlength: 6,
            maxlength: 50
          }
        },
        {
          cssWrapperClass: 'vehiclePickUpLocation',
          controlLabel: 'Pick Up Location',
          controlName: 'vehiclePickUpLocation',
          controlType: 'text',
          valueType: 'text',
          placeholder: 'Pick Up Location',
          validators: {
            required: true,
            minlength: 3,
            maxlength: 50
          }
        },
        {cssWrapperClass: 'vehicleDropOffLocation',
          controlLabel: 'Drop Off Location',
          controlName: 'vehicleDropOffLocation',
          controlType: 'text',
          valueType: 'text',
          placeholder: 'Drop Off Location',
          validators: {
            required: true,
            minlength: 3,
            maxlength: 50
          }
        },
        {cssWrapperClass: 'vehiclePickUpDriverName',
          controlLabel: 'Driver Name',
          controlName: 'vehiclePickUpDriverName',
          controlHint: 'The exact name on your Driver\'s License',

          controlType: 'text',
          valueType: 'text',
          placeholder: 'Driver Name',
          validators: {
            required: true,
            minlength: 6,
            maxlength: 500
          }
        },
        {cssWrapperClass: 'vehicleDirectBilled',
          controlLabel: 'Direct Billed',
          controlName: 'vehicleDirectBilled',
          controlType: 'checkbox',
          valueType: 'text',
          placeholder: 'Direct Billed',
          validators: {
            minlength: 6,
            maxlength: 500
          }
        },
        {cssWrapperClass: 'vehicleBookingComments',
          controlLabel: 'Comments/Notes',
          controlName: 'vehicleBookingComments',
          controlType: 'textarea',
          valueType: 'text',
          minRows: 5,
          maxrows:30,
          placeholder: 'Comments/Notes',
          validators: {
            minlength: 6,
            maxlength: 500
          }
        }
    ];
    }
// #endregion VEHICLE

// #region LOCATION

locationConfigFn(){
   return [
      {
         cssWrapperClass: 'addressCity',
         controlLabel: 'City/Town',
         controlName: 'addressCity',
         controlType: 'text',
         valueType: 'text',
         placeholder: 'City/Town',
         validators: {
         required: true,
         minlength: 2,
         maxlength: 150
         }
         },
         {
            cssWrapperClass: 'addressStateAbbr',
            controlLabel: 'State',
            controlName: 'addressStateAbbr',
            controlType: 'text',
            valueType: 'text',
            placeholder: 'State',
            validators: {
            required: true,
            minlength: 2,
            maxlength: 2
            }
            },
   ]
}

// #endregion LOCATION


// #region LISTS
airportList(){
  return [
    {
       optionName: 'Abilene, TX (ABI)'
    },
    {
       optionName: 'Akron/Canton, OH (CAK)'
    },
    {
       optionName: 'Alamosa, CO (ALS)'
    },
    {
       optionName: 'Albany, NY (ALB)'
    },
    {
       optionName: 'Allentown, PA (ABE)'
    },
    {
       optionName: 'Altoona, PA (AOO)'
    },
    {
       optionName: 'Amarillo, TX (AMA)'
    },
    {
       optionName: 'Appleton, WI (ATW)'
    },
    {
       optionName: 'Arcata, CA (ACV)'
    },
    {
       optionName: 'Ashland, KY / Huntington'
    },
    {
       optionName: 'Aspen, CO (ASE)'
    },
    {
       optionName: 'Athens, GA (AHN)'
    },
    {
       optionName: 'Atlanta, GA (ATL)'
    },
    {
       optionName: 'Atlantic City, NJ (AIY)'
    },
    {
       optionName: 'Augusta, GA (AGS)'
    },
    {
       optionName: 'Austin, TX (AUS)'
    },
    {
       optionName: 'Bakersfield, CA (BFL)'
    },
    {
       optionName: 'Baltimore, MD (BWI)'
    },
    {
       optionName: 'Beaumont/PortArthur, TX (BPT)'
    },
    {
       optionName: 'Beckley, WV (BKW)'
    },
    {
       optionName: 'Bethlehem, PA (ABE)'
    },
    {
       optionName: 'Binghamton, NY (BGM)'
    },
    {
       optionName: 'Bluefield, WV (BLF)'
    },
    {
       optionName: 'Boulder, CO-Municipal Airport (WBU)'
    },
    {
       optionName: 'Bowling Green, KY (BWG)'
    },
    {
       optionName: 'Bradford, PA (BFD)'
    },
    {
       optionName: 'Brawnwood, TX (BWD)'
    },
    {
       optionName: 'Bristol, VA (TRI)'
    },
    {
       optionName: 'Brownsville, TX (BRO)'
    },
    {
       optionName: 'Brunswick, GA (BQK)'
    },
    {
       optionName: 'Buffalo, NY (BUF)'
    },
    {
       optionName: 'Bullhead City/Laughlin, AZ (IFP)'
    },
    {
       optionName: 'Burbank, CA (BUR)'
    },
    {
       optionName: 'Burlington, IA (BRL)'
    },
    {
       optionName: 'Canton/Akron, OH (CAK)'
    },
    {
       optionName: 'Carlsbad, CA (CLD)'
    },
    {
       optionName: 'Carmel, CA (MRY)'
    },
    {
       optionName: 'CedarCity, UT (CDC)'
    },
    {
       optionName: 'CedarRapids, IA (CID)'
    },
    {
       optionName: 'Charleston, WV (CRW)'
    },
    {
       optionName: 'Charlottesville, VA (CHO)'
    },
    {
       optionName: 'Chattanooga, TN (CHA)'
    },
    {
       optionName: 'Chico, CA (CIC)'
    },
    {
       optionName: 'Cincinnati, OH (CVG)'
    },
    {
       optionName: 'Clarksburg, WV (CKB)'
    },
    {
       optionName: 'Clearwater/StPetersburg, FL (PIE)'
    },
    {
       optionName: 'Cleveland, OH (CLE)'
    },
    {
       optionName: 'College Station, TX (CLL)'
    },
    {
       optionName: 'Colorado Springs, CO (COS)'
    },
    {
       optionName: 'Columbus, GA (CSG)'
    },
    {
       optionName: 'Columbus, OH (CMH)'
    },
    {
       optionName: 'Concord, CA (CCR)'
    },
    {
       optionName: 'Cortez, CO (CEZ)'
    },
    {
       optionName: 'Crescent City, CA (CEC)'
    },
    {
       optionName: 'Cumberland, MD (CBE)'
    },
    {
       optionName: 'Dallas/Fort Worth, TX (DFW)'
    },
    {
       optionName: 'Dayton, OH (DAY)'
    },
    {
       optionName: 'Daytona Beach, FL (DAB)'
    },
    {
       optionName: 'Denver, CO-International (DEN)'
    },
    {
       optionName: 'Des Moines, IA (DSM)'
    },
    {
       optionName: 'Dubois, PA (DUJ)'
    },
    {
       optionName: 'Dubuque, IA (DBQ)'
    },
    {
       optionName: 'Durango, CO (DRO)'
    },
    {
       optionName: 'Easton, PA (ABE)'
    },
    {
       optionName: 'Eau Claire, WI (EAU)'
    },
    {
       optionName: 'El Centro, CA (IPL)'
    },
    {
       optionName: 'El Paso, TX (ELP)'
    },
    {
       optionName: 'Elko, NV (EKO)'
    },
    {
       optionName: 'Elmira, NY (ELM)'
    },
    {
       optionName: 'Endicott, NY (BGM)'
    },
    {
       optionName: 'Erie, PA (ERI)'
    },
    {
       optionName: 'Eureka/Arcata, CA (ACV)'
    },
    {
       optionName: 'Eureka, NV (EUE)'
    },
    {
       optionName: 'Evansville, IN (EVV)'
    },
    {
       optionName: 'Flagstaff, AZ (FLG)'
    },
    {
       optionName: 'Fort Collins/Loveland, CO-Municipal Airport (FNL)'
    },
    {
       optionName: 'Fort Dodge, IA (FOD)'
    },
    {
       optionName: 'Fort Lauderdale, FL (FLL)'
    },
    {
       optionName: 'Fort Myers, FL (RSW)'
    },
    {
       optionName: 'Fort Walton Beach, FL (VPS)'
    },
    {
       optionName: 'Fort Wayne, IN (FWA)'
    },
    {
       optionName: 'Fort Worth/Dallas, TX (DFW)'
    },
    {
       optionName: 'Franklin, PA (FKL)'
    },
    {
       optionName: 'Fresno, CA (FAT)'
    },
    {
       optionName: 'Gainesville, FL (GNV)'
    },
    {
       optionName: 'Gary, IN (GYY)'
    },
    {
       optionName: 'Gladewater/Kilgore, TX (GGG)'
    },
    {
       optionName: 'Grand Canyon, AZ-National Park (GCN)'
    },
    {
       optionName: 'Grand Junction, CO (GJT)'
    },
    {
       optionName: 'Green Bay, WI (GRB)'
    },
    {
       optionName: 'Gunnison, CO (GUC)'
    },
    {
       optionName: 'Hagerstown, MD (HGR)'
    },
    {
       optionName: 'Hampton, VA (PHF)'
    },
    {
       optionName: 'Harlingen, TX (HRL)'
    },
    {
       optionName: 'Harrisburg, PA (MDT)'
    },
    {
       optionName: 'Havasupai, AZ (HAE)'
    },
    {
       optionName: 'Hayden, CO (HDN)'
    },
    {
       optionName: 'Houston, TX-All airports (HOU)'
    },
    {
       optionName: 'Houston, TX-Hobby (HOU)'
    },
    {
       optionName: 'Houston, TX-Intercontinental (IAH)'
    },
    {
       optionName: 'Huntington, WV/Ashland'
    },
    {
       optionName: 'Imperial, CA (IPL)'
    },
    {
       optionName: 'Indianapolis, IN (IND)'
    },
    {
       optionName: 'Inyokern, CA (IYK)'
    },
    {
       optionName: 'Iron Mountain, MI (IMT)'
    },
    {
       optionName: 'Islip, NY (ISP)'
    },
    {
       optionName: 'Ithaca, NY (ITH)'
    },
    {
       optionName: 'Jackson, TN (MKL)'
    },
    {
       optionName: 'Jacksonville, FL (JAX)'
    },
    {
       optionName: 'Jamestown, NY (JHW)'
    },
    {
       optionName: 'Janesville, WI (JVL)'
    },
    {
       optionName: 'Johnson City, NY (BGM)'
    },
    {
       optionName: 'Johnson City, TN (TRI)'
    },
    {
       optionName: 'Johnstown, PA (JST)'
    },
    {
       optionName: 'KeyWest, FL (EYW)'
    },
    {
       optionName: 'Kilgore/Gladewater, TX (GGG)'
    },
    {
       optionName: 'Killeen, TX (ILE)'
    },
    {
       optionName: 'Kingman, AZ (IGM)'
    },
    {
       optionName: 'Kingsport, TN (TRI)'
    },
    {
       optionName: 'Knoxville, TN (TYS)'
    },
    {
       optionName: 'La Crosse, WI (LSE)'
    },
    {
       optionName: 'Lafayette, IN (LAF)'
    },
    {
       optionName: 'Lake Havasu City, AZ (HII)'
    },
    {
       optionName: 'Lancaster, PA (LNS)'
    },
    {
       optionName: 'Laredo, TX (LRD)'
    },
    {
       optionName: 'Las Vegas, NV (LAS)'
    },
    {
       optionName: 'Latrobe, PA (LBE)'
    },
    {
       optionName: 'Lewisburg, WV (LWB)'
    },
    {
       optionName: 'Lexington, KY (LEX)'
    },
    {
       optionName: 'Long Beach, CA (LGB)'
    },
    {
       optionName: 'Longview, TX (GGG)'
    },
    {
       optionName: 'Los Angeles, CA (LAX)'
    },
    {
       optionName: 'Louisville, KY (SDF)'
    },
    {
       optionName: 'Loveland/Fort Collins, CO-Municipal Airport (FNL)'
    },
    {
       optionName: 'Loveland/Fort Collins, CO-Busservice (QWF)'
    },
    {
       optionName: 'Lubbock, TX (LBB)'
    },
    {
       optionName: 'Macon, GA (MCN)'
    },
    {
       optionName: 'Madison, WI (MSN)'
    },
    {
       optionName: 'Marietta, OH/Parkersburg'
    },
    {
       optionName: 'Martinsburg, PA (AOO)'
    },
    {
       optionName: 'Mason City, IA (MCW)'
    },
    {
       optionName: 'Massena, NY (MSS)'
    },
    {
       optionName: 'Mcallen, TX (MFE)'
    },
    {
       optionName: 'Melbourne, FL (MLB)'
    },
    {
       optionName: 'Memphis, TN (MEM)'
    },
    {
       optionName: 'Merced, CA (MCE)'
    },
    {
       optionName: 'Miami, FL-International (MIA)'
    },
    {
       optionName: 'Midland/Odessa, TX (MAF)'
    },
    {
       optionName: 'Milwaukee, WI (MKE)'
    },
    {
       optionName: 'Mission, TX (MFE)'
    },
    {
       optionName: 'Moab, UT (CNY)'
    },
    {
       optionName: 'Modesto, CA (MOD)'
    },
    {
       optionName: 'Monterey, CA (MRY)'
    },
    {
       optionName: 'Montrose, CO (MTJ)'
    },
    {
       optionName: 'Morgantown, WV (MGW)'
    },
    {
       optionName: 'Naples, FL (APF)'
    },
    {
       optionName: 'Nashville, TN (BNA)'
    },
    {
       optionName: 'New Orleans, LA (MSY-Louis Armstrong New Orleans Intl.)'
    },
    {
       optionName: 'New York, NY-All airports (NYC)'
    },
    {
       optionName: 'New York, NY-Kennedy (JFK)'
    },
    {
       optionName: 'New York, NY-La Guardia (LGA)'
    },
    {
       optionName: 'Newark, NJ (EWR)'
    },
    {
       optionName: 'Newburgh/Stewart Field, NY (SWF)'
    },
    {
       optionName: 'Newport News, VA (PHF)'
    },
    {
       optionName: 'Norfolk, VA (ORF)'
    },
    {
       optionName: 'Oakland, CA (OAK)'
    },
    {
       optionName: 'Odessa/Midland, TX (MAF)'
    },
    {
       optionName: 'Ogdensburg, NY (OGS)'
    },
    {
       optionName: 'Ontario, CA (ONT)'
    },
    {
       optionName: 'Orange County, CA (SNA)'
    },
    {
       optionName: 'Orlando, FL-Herndon (ORL)'
    },
    {
       optionName: 'Orlando, FL-International (MCO)'
    },
    {
       optionName: 'Oshkosh, WI (OSH)'
    },
    {
       optionName: 'Ottumwa, IA (OTM)'
    },
    {
       optionName: 'Owensboro, KY (OWB)'
    },
    {
       optionName: 'Oxnard/Ventura, CA (OXR)'
    },
    {
       optionName: 'Paducah, KY (PAH)'
    },
    {
       optionName: 'Page, AZ (PGA)'
    },
    {
       optionName: 'Palm Springs, CA (PSP)'
    },
    {
       optionName: 'Panama City, FL (PFN)'
    },
    {
       optionName: 'Parkersburg, WV/Marietta'
    },
    {
       optionName: 'Pensacola, FL (PNS)'
    },
    {
       optionName: 'Philadelphia, PA-International (PHL)'
    },
    {
       optionName: 'Philadelphia, PA-Trenton/Mercer NJ (TTN)'
    },
    {
       optionName: 'Phoenix, AZ (PHX)'
    },
    {
       optionName: 'Pittsburgh, PA (PIT)'
    },
    {
       optionName: 'Plattsburgh, NY (PLB)'
    },
    {
       optionName: 'Port Arthur/Beaumont, TX (BPT)'
    },
    {
      optionName: 'Portland, OR (PDX)'
   },
    {
       optionName: 'Poughkeepsie, NY (POU)'
    },
    {
       optionName: 'Prescott, AZ (PRC)'
    },
    {
       optionName: 'Princeton, WV (BLF)'
    },
    {
       optionName: 'Pueblo, CO (PUB)'
    },
    {
       optionName: 'Reading, PA (RDG)'
    },
    {
       optionName: 'Redding, CA (RDD)'
    },
    {
       optionName: 'Reno, NV (RNO)'
    },
    {
       optionName: 'Rhinelander, WI'
    },
    {
       optionName: 'Richmond, VA (RIC)'
    },
    {
       optionName: 'Roanoke, VA (ROA)'
    },
    {
       optionName: 'Rochester, NY (ROC)'
    },
    {
       optionName: 'Sacramento, CA (SMF)'
    },
    {
       optionName: 'Saint George, UT (SGU)'
    },
    {
       optionName: 'Salisbury-Ocean City, MD (SBY)'
    },
    {
       optionName: 'Salt Lake City, UT (SLC)'
    },
    {
       optionName: 'SanAngelo, TX (SJT)'
    },
    {
       optionName: 'San Antonio, TX (SAT)'
    },
    {
       optionName: 'San Diego, CA (SAN)'
    },
    {
       optionName: 'San Francisco, CA (SFO)'
    },
    {
       optionName: 'San Jose, CA (SJC)'
    },
    {
       optionName: 'San Luis Obispo, CA (SBP)'
    },
    {
       optionName: 'Santa Ana, CA (SNA)'
    },
    {
       optionName: 'Santa Barbara, CA (SBA)'
    },
    {
       optionName: 'Santa Maria, CA (SMX)'
    },
    {
       optionName: 'Santa Rosa, CA (STS)'
    },
    {
       optionName: 'Saranac Lake, NY (SLK)'
    },
    {
       optionName: 'Sarasota, FL (SRQ)'
    },
    {
       optionName: 'Savannah, GA (SAV)'
    },
    {
       optionName: 'Scottsdale, AZ (SDL)'
    },
    {
       optionName: 'Scranton, PA (AVP)'
    },
    {
       optionName: 'Sioux City, IA (SUX)'
    },
    {
       optionName: 'South Bend, IN (SBN)'
    },
    {
       optionName: 'St Petersburg/Clearwater, FL (PIE)'
    },
    {
       optionName: 'State College/University Park, PA (SCE)'
    },
    {
       optionName: 'Staunton, VA (SHD)'
    },
    {
       optionName: 'Steamboat Springs, CO (SBS)'
    },
    {
       optionName: 'Stevens Point/Wausau, WI (CWA)'
    },
    {
       optionName: 'Stewart Field/Newburgh, NY (SWF)'
    },
    {
       optionName: 'Stockton, CA (SCK)'
    },
    {
       optionName: 'Syracuse, NY (SYR)'
    },
    {
       optionName: 'Tallahassee, FL (TLH)'
    },
    {
       optionName: 'Tampa, FL (TPA)'
    },
    {
       optionName: 'Telluride, CO (TEX)'
    },
    {
       optionName: 'Terre Haute, IN (HUF)'
    },
    {
       optionName: 'Toledo, OH (TOL)'
    },
    {
       optionName: 'Trenton/Mercer, NJ (TTN)'
    },
    {
       optionName: 'Tucson, AZ (TUS)'
    },
    {
       optionName: 'Tyler, TX (TYR)'
    },
    {
       optionName: 'Utica, NY (UCA)'
    },
    {
       optionName: 'Vail, CO-Eagle County Airport (EGE)'
    },
    {
       optionName: 'Vancouver International Airport, BC, CA (YVR)'
    },
    {
       optionName: 'Valdosta, GA (VLD)'
    },
    {
       optionName: 'Valparaiso, FL (VPS)'
    },
    {
       optionName: 'Ventura/Oxnard, CA (OXR)'
    },
    {
       optionName: 'Vernal, UT (VEL)'
    },
    {
       optionName: 'Victoria, TX (VCT)'
    },
    {
       optionName: 'Visalia, CA (VIS)'
    },
    {
       optionName: 'Waco, TX (ACT)'
    },
    {
       optionName: 'Washington DC-All airports (WAS), '
    },
    {
       optionName: 'Washington DC-Dulles (IAD), '
    },
    {
       optionName: 'Washington DC-National (DCA), '
    },
    {
       optionName: 'Waterloo, IA (ALO)'
    },
    {
       optionName: 'Watertown, NY (ART)'
    },
    {
       optionName: 'Wausau/Stevens Point, WI (CWA)'
    },
    {
       optionName: 'West Palm Beach, FL (PBI)'
    },
    {
       optionName: 'Westchester County, NY (HPN)'
    },
    {
       optionName: 'Wichita Falls, TX (SPS)'
    },
    {
       optionName: 'Wilkes Barre, PA (AVP)'
    },
    {
       optionName: 'Williamsburg, VA (PHF)'
    },
    {
       optionName: 'Williamsport, PA (IPT)'
    },
     {
       optionName: 'Youngstown, OH (YNG)'
    }
 ];
}
  
// #endregion LISTS


}

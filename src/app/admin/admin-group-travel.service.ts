import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminGroupTravelService {
  constructor() {}

  groupTravelNameFn() {
    return [
      {
        cssWrapperClass: 'groupTravelName',
        controlLabel: 'Group Travel Name',
        controlName: 'groupTravelName',
        controlType: 'textarea',
        minRows: 1,
        maxrows: 5,
        valueType: 'text',
        placeholder: 'Group Travel Name',
        controlHint: 'Max Length 150',
        validators: {
          required: true,
          minlength: 4,
          maxlength: 150,
        },
      },
    ];
  }

  groupTravelArrivalCityAndStartDateFn() {
    return [
      {
        cssWrapperClass: 'groupTravelArrivalCity',
        controlLabel: 'Arrival City',
        controlName: 'groupTravelArrivalCity',
        controlType: 'textarea',
        minRows: 1,
        maxrows: 5,
        valueType: 'text',
        placeholder: 'Arrival City',
        controlHint: 'Max Length 150',
        validators: {
          required: true,
          minlength: 3,
          maxlength: 150,
        },
      },
    ];
  }

  travelCost() {
    return [
      {
        cssWrapperClass: 'requestCost',
        controlLabel: 'Cost',
        controlName: 'requestCost',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Cost',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 10,
        },
      },
    ];
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminTravelRequestsService {

  constructor() { }

  travelCost(){
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
         maxlength: 10
         }
    },
        ]
  }
}

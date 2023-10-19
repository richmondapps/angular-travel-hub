import { Injectable } from '@angular/core';
import { GlobalConstants } from 'src/app/global-variables';
import { ReadService } from 'src/app/services/read.service';

@Injectable({
  providedIn: 'root'
})
export class AdminBulletinBoardService {

  constructor(
    private readService: ReadService
  ) { }
  bulletinBoardNameFn(){
    return [
      {
        cssWrapperClass: 'bulletinBoardTitle',
        controlLabel: 'Bulletin Board Name',
        controlName: 'bulletinBoardTitle',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'Bulletin Board Title',
        validators: {
          required: true,
          minlength: 3,
          maxlength: 100
        }
      }
    ];
  }

  bulletinBoardCopyFn(){
    return [
      {
        cssWrapperClass: 'bulletinBoardCopy',
        cssMatFormFieldClass: 'bulletinBoardMatFormField',
        cssTextareaClass: 'bulletinBoardTextarea',
        minRows: 10,
        maxrows:30,
        controlLabel: 'Copy',
        controlName: 'bulletinBoardCopy',
        controlType: 'textarea',
        valueType: 'text',
        placeholder: 'Copy',
        validators: {
          required: true,
          minlength: 3,
          maxlength: 1000
        }
      }
    ];
  }

  async venueNameFn(){
    return [  {
        cssWrapperClass: 'eventVenue',
        controlLabel: 'Event Venue',
        controlName: 'eventVenue',
        placeholder: 'Select Venue',
        controlType: 'select',
        valueType: 'text',
        options: await this.readService.returnSelectOptionsPromiseOrderBy(
        `${GlobalConstants.rootCollectionAndBranchDoc}/branchVenues`,
        'venueName',
        'docId',
        'asc'
        ),
        validators: {
          required: true
        }
      }
    ]
    }
  eventDateFn(){
    return [
      {
        cssWrapperClass: 'eventDate',
        controlLabel: 'Event Date',
        controlName: 'eventDate',
        controlType: 'date',
        placeholder: 'Event Date',
        validators: {
          required: true,
          minlength: 10,
          maxlength: 10
        }
      }
    ];
  }

}

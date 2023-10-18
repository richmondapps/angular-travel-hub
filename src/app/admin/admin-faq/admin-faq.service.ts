import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminFaqService {

  constructor() { }
  createFaqTitleFn(){
    return [
      {
        cssWrapperClass: 'faqTitle',
        controlLabel: 'FAQ Title',
        controlName: 'faqTitle',
        controlType: 'text',
        valueType: 'text',
        placeholder: 'FAQ Title',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 50
        }
      }
    ]
  }

  createQuestionAnswerFn(){
    return [
      {
        cssWrapperClass: 'faqQuestion',
        controlLabel: 'Question',
        controlName: 'faqQuestion',
        controlType: 'textarea',
        valueType: 'text',
        placeholder: 'Question',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 250
        }
      },
      {
        cssWrapperClass: 'faqAnswer',
        controlLabel: 'Answer',
        controlName: 'faqAnswer',
        controlType: 'textarea',
        valueType: 'text',
        placeholder: 'Answer',
        validators: {
          required: true,
          minlength: 2,
          maxlength: 500
        }
      }
    ]
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavModule } from './nav/nav.module';
import { MainNavComponent } from './nav/main-nav/main-nav.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { EditDocumentDialogComponent } from './edit-document-dialog/edit-document-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddDocumentDialogComponent } from './add-document-dialog/add-document-dialog.component';
import { DynamicTableComponent } from './dynamic-table/dynamic-table.component';
import { ImageCropperComponent } from './image-cropper/component/image-cropper.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PrivacyNotificationDialogComponent } from './privacy-notification-dialog/privacy-notification-dialog.component';
import { PhoneFormatPipe } from './pipes/phone-format.pipe';
import { ItineraryTemplateComponent } from '../requests/itinerary-template/itinerary-template.component';
import { RequestSummaryComponent } from '../employee/request-summary/request-summary.component';

const components = [
  MainNavComponent,
  FileUploadComponent,
  DynamicFormComponent,
  EditDocumentDialogComponent,
  DeleteDialogComponent,
  AddDocumentDialogComponent,
  DynamicTableComponent,
  ImageCropperComponent,
  ImageUploadComponent,
  LoadingSpinnerComponent,
  PrivacyNotificationDialogComponent,
  PhoneFormatPipe,
  ItineraryTemplateComponent,
  RequestSummaryComponent
]
const modules = [
  CommonModule,
  MaterialModule,
   RouterModule,
   FormsModule,
   NavModule,
   ReactiveFormsModule
];

@NgModule({
  declarations: [
    ...components
    ],
  imports: [
    ...modules
  ],
  exports: [...modules, components]
})
export class SharedModule { }

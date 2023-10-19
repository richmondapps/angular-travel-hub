import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  MatSort
} from '@angular/material/sort';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  Router
} from '@angular/router';

import {
  Observable
} from 'rxjs';
import {
  DateAndTimeService
} from 'src/app/services/date-and-time.service';
import {
  FileUploadService
} from 'src/app/services/file-upload.service';

import { getFunctions, httpsCallable } from 'firebase/functions';
import { getApp } from 'firebase/app'; 
import { PhoneFormatPipe } from '../pipes/phone-format.pipe';
export interface TableObjects {
  columnDef: string;
  header: string;
  type: string;
  collection?: string;
}

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: [
    './dynamic-table.component.css',
   '../../admin/admin-travel-requests/admin-travel-requests-table/admin-travel-requests-table.component.css',
   '../../admin/admin-travel-requests/admin-travel-requests-nav/admin-travel-requests-nav.component.css',
    // '../../admin/events-dashboard/event-list/event-list.component.css',
    // '../../public/public-events/public-events-table/public-events-table.component.css'

  ],
  providers: [PhoneFormatPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnInit, AfterViewInit {
  tableDataSrc;
  tableArray;
  formattedCols: any;
  // tslint:disable-next-line:no-input-rename
  @Input('tableClass') tableClass: any;
  @Input('tableColumns') tableCols: any;
  // tslint:disable-next-line:no-input-rename
  @Input('tableData') tableData: Observable < any > ;
  @Input('tableHeading') tableHeading: any;
  @Output() res = new EventEmitter();
  @Output() recordDetail = new EventEmitter();
  @Output() editRecord = new EventEmitter();
  @Output() deleteRecord = new EventEmitter();
  @Output() workEventRequest = new EventEmitter();
  @Output() workEventConfirmed = new EventEmitter();
  @Output() workEventRemoved = new EventEmitter();
  showSpinner = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataTableLength;
  dataTablePageSize = 250;
  dataTablePageSizeOptions: number[] = [1, 5, 10, 25, 50, 100, 150, 250];
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.dataTablePageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  constructor(
    private router: Router,
    private fileService: FileUploadService,
    private dateTime: DateAndTimeService,
    private renderer: Renderer2) {
    this.tableDataSrc = new MatTableDataSource();
  }

  ngOnInit(): void {
   console.log('RA Table Cols', this.tableCols);
   console.log('RATabledata', this.tableData);
    this.formattedCols = this.tableCols.map(c => c.columnDef);
  //  console.log('RA Formatted Cols', this.formattedCols);

    // this.tableDataSrc = this.tableData;
  //  console.log('RA Data Src', this.tableDataSrc);
    this.tableData?.subscribe((e: unknown[]) => {
      const obj = this.dateTime.convertDate(e);
   //   console.log('RA E', obj);
      this.tableDataSrc.data = obj;
      console.log('RATabledata',  this.tableDataSrc.data);

    });
  }
  ngAfterViewInit() {
    this.tableDataSrc.sort = this.sort;
    this.tableDataSrc.paginator = this.paginator;
  }

  dataFilter(filterValue: string) {
    this.tableDataSrc.filter = filterValue.trim().toLowerCase();
  }

  confirmEmployeeEventApplicationFn(
    eventId: string,
    venueDocId: string,
    personEmail: string,
    eventTitle: string,
    eventVenue: string,
    startDate: string,
    branchName: string
    ){
    console.log('ID', eventId);
    console.log('PATH', venueDocId);
    console.log('DATA', eventTitle);
    const d = {
      eventId,
      venueDocId,
      personEmail,
      eventTitle,
      eventVenue,
      startDate,
      branchName
    };
    this.workEventConfirmed.emit(d);
  }
  removeEmployeeEventApplicationFn(eventId: string, venueDocId: string, personEmail: string){
    console.log('ID', eventId);
    console.log('PATH', venueDocId);
    const d = {
      eventId,
      venueDocId,
      personEmail
    };
    this.workEventRemoved.emit(d);
  }
  showDetailFn(id: string, requesterEmail: string) {
    console.log('ID', id);
   
    const d = {
      id,
      requesterEmail
    };
    this.recordDetail.emit(d);
  }
  viewCloudFileFn(id: string, path: string) {
  //  console.log('ID', id);
  //  console.log('PATH', path);
    this.showSpinner = true;

 
const fn = httpsCallable(getFunctions(), 'readTimeRestrictedFileFn')
    fn({
      filePath: `${path}/${id}`,
      timeToView: 30000
    }).then(res => {

      this.showSpinner = false;
     console.log('Image Upload Res Data', res.data);
    //  window.open(res.data, 'blank');
    }).catch((error) => {
      // Getting the Error details.
      const code = error.code;
      const message = error.message;
      const details = error.details;
      // ...
    });;
  }
  viewPublicFileFn(id: string, path: string) {
    const filePath = `${path}/${id}`;
    const ref = this.fileService.getPublicUrl(filePath)
      console.log('Res URL', ref);
    //  window.open(ref, '_blank');
    
  }
  addRecordFn(d){
    this.res.emit(d);
  }
  editRecordFn(d: string){
    console.table(d);
    this.editRecord.emit(d);
  }
  deleteRecordFn(d: string){
    this.deleteRecord.emit(d);
  }

  workEventRequestFn(d: string, venue: string){
    console.log('APPLY WORK', d)
    console.log('APPLY Venue', venue)

    const res = {
      d,
      venue
    }
    this.workEventRequest.emit(res);
  }
  // openDeleteDialogFn(collection, docId) {
  //   console.log('collection', collection);
  //   console.log('docId', docId);
  //   this.siteService.openDeleteDialogFn(
  //     collection,
  //     'docId',
  //     docId,
  //     'dialogConfirm'
  //   );
  // }
}

import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  QueryList,
  ViewChildren,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';
import {
  FormService
} from 'src/app/services/form.service';
import { UpdateService } from 'src/app/services/update.service';
// import {
//   UpdateService
// } from 'src/app/services/update.service';

@Component({
  selector: 'app-dynamic-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dynamic-form.component.html',
  styleUrls: [
    './dynamic-form.component.css',
    '../../employee/employee-profile/employee-profile.component.css',
    '../../employee/update-profile/update-profile.component.css',
    '../../requests/request-dashboard/request-dashboard.component.css',
    '../../requests/flights-dashboard/flights-dashboard.component.css',
    '../../requests/hotel-dashboard/hotel-dashboard.component.css',
    '../../requests/vehicle-dashboard/vehicle-dashboard.component.css',
    '../../requests/flights-dashboard/single-city-flights/single-city-flights.component.css',
    '../../requests/multicity/multicity.component.css'
]
})
export class DynamicFormComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('f') formData: any;
  // tslint:disable-next-line:no-input-rename
  @Input('p') patchData?: any;
  @Input('class') formCSSClass: any;
  @Input('requestType') requestType: any;
  @Input('cancelBtn') cancelBtn: any;
  @Output() recordDetail = new EventEmitter();
  @ViewChildren('selectOptions', { read: ElementRef }) configOptionsList: QueryList<ElementRef>;
  @ViewChildren('optionLoop') optionLoopList: QueryList<any>;
  @ViewChildren('matchArryName', { read: ElementRef }) matchArryName: QueryList<ElementRef>;
  @Output() submittedFormData = new EventEmitter();
  @Output() cancelSectionSelection = new EventEmitter();
  @Output() sendBlur = new EventEmitter();
  @Output() sendStartDate = new EventEmitter();

  form: FormGroup;
  docId: any;
  favoriteSeason: string;
  filteredOptions: Observable<string[]>;
  filteredArray$: Observable<any>;
  controlName: any;
  controlOptions: any;
  formRange: FormGroup;
  selectedStartDate: { [x: number]: any; };
  selectedEndDate: { [x: number]: any; };
  
  constructor(
     public formService: FormService,
     private updateService: UpdateService,
     private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.formRange = new FormGroup({});
    this.form = new FormGroup({});
    const formGroup = {};
    this.formData.forEach((formControl: { controlName: string | number; }) => {
      formGroup[formControl.controlName] = new FormControl('');
    });
    this.form = new FormGroup(formGroup);
    console.log('Form', this.formData);
   // console.log('FormCSSClass', this.formCSSClass);

    this.form.valueChanges.subscribe((data) => {
      console.log(data);
     this.formService.logValidationErrors(this.form);
    });
    if (this.patchData?.length) {
    for (const x of this.patchData){
      this.docId = x.docId;
    }
    console.log('Patch', this.patchData);
      // const patchArray = [];
      // patchArray.push(this.patchData);
    this.updateService.customPatchValue(this.patchData, this.form);
    }
  }

  showDetailFn(id: string) {
    console.log('ID', id);
 
    const d = {
      id
    };
    this.recordDetail.emit(d);
  }

  onSelectedDateFn(e, name){
    const selectedDate = e.target.value;
   console.log('E DATE', selectedDate );
   console.log('E DATE Name', name );

   this.sendStartDate.emit(selectedDate)
  }


  fetchCol(controlName, ops){
   // console.log('OPS', ops);
    for (const x of controlName){
      this.controlName = x;
    }
    for (const x of ops){
       // console.log('OBJ X', x );
        this.controlOptions = x;
        // this.arrayToFilter = e;
       // console.log('OPTIONS', this.controlOptions);
    }
  //  console.log('EL', this.controlName);
    this.filteredArray$ = this.form.get(this.controlName).valueChanges.pipe(
           startWith(''),
           map(v => this.filterObject(v))
         );
   // console.log('FILTERED RES', this.filteredArray$);
  }

  onCancel(){
    this.cancelSectionSelection.emit('cancel');
  }

  // filterObject(optionName){
  //  // console.log('FILTERED RES', optionName );
  //  // console.log('FILTERED OPS', this.controlOptions.filter(a => a.optionName));
  //   return this.controlOptions.filter(a =>
  //   a.optionName.indexOf(optionName) > -1);
  //   }
  filterObject(optionName: any){
    console.log('FILTERED RES', optionName );
   // console.log('FILTERED OPS', this.controlOptions.filter((a: { optionName: any; }) => a.optionName));
    return this.controlOptions.filter((a: { optionName: string; }) =>
    a.optionName.toLowerCase().indexOf(optionName.toLowerCase()) > -1);
    }

    displayFn(book?): string | undefined {
     // console.log('BOOK RES', book);
      return book ? book.optionName : undefined;
    }

    onSelectedStartDateFn(e?, name?){
      const selectedDate = e.target.value;
    //  console.log('E DATE', selectedDate );
    //  console.log('E DATE Name', name );
  
      this.selectedStartDate = {
        [name]: selectedDate
      };
    //  console.log('OBJ DATE & Name', this.selectedStartDate );
      return this.selectedStartDate;
    }
    onSelectedEndDateFn(e?, name?){
      const selectedDate = e.target.value;
   //   console.log('E DATE', selectedDate );
      this.selectedEndDate = {
        [name]: selectedDate
      };
      console.log('OBJ DATE & Name', this.selectedEndDate );
      return this.selectedEndDate;
    }

  onClicked() {
    const d = this.form.value;
    if (this.docId){
      d.docId = this.docId;
    }
    const startDate =  this.selectedStartDate || null;
    const endDate =  this.selectedEndDate || null;
    
    const data = {
      ...d,
      ...startDate,
      ...endDate
    };
   // this.eventService.emitChildEvent(data)
   console.log('EMITTED DATA', data);
    try {
      this.submittedFormData.emit(data);
      this.form.reset();
    } catch (e) {
      console.log('ERROR', e);
    }
  }
}

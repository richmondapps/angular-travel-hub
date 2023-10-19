import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Observable } from 'rxjs';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-employee-mytrips',
  templateUrl: './employee-mytrips.component.html',
  styleUrls: ['./employee-mytrips.component.css']
})
export class EmployeeMytripsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  loggedInUserEmail: any;
  myTrips: Observable<any>;
  requestStatus: 'confirmed' | 'pending' | 'draft' = 'confirmed';
  activeConfirmed: boolean;
  activeDraft: boolean;
  activePending: boolean;
  constructor(
    private readService: ReadService
  ) { }

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(sessionStorage.getItem("LoggedInUserEmail"));

    // try {
    //     this.myTrips = this.readService.returnRecordsOrderByFn(
    //   `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
    //   'createdDate',
    //   'asc'
    // );
    // } catch (e) {
    //   console.log('ERROR', e);
    // }
    this.changeViewFn('confirmed');
  }

  changeViewFn(val){
    this.myTrips = this.readService.returnObservableWhereFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedTravel`,
      'requestStatus',
      val
    );
    this.requestStatus = val;

    switch(this.requestStatus){
      case 'confirmed':
        this.activeConfirmed = true;
        break;
        
      case 'pending':
        this.activePending = true;
        break;
      case 'draft':
        this.activeDraft = true;
        break;

    }
    console.log('requestStatus', this.requestStatus)
  }

  get isConfirmed(){
   
   return this.requestStatus === 'confirmed';
  }
  get isPending(){
   return this.requestStatus === 'pending';
  }
  get isDraft(){
   return this.requestStatus === 'draft';
  }
}

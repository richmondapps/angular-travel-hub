import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/global-variables';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-group-travel-draft-list',
  templateUrl: './group-travel-draft-list.component.html',
  styleUrls: ['./group-travel-draft-list.component.css']
})
export class GroupTravelDraftListComponent implements OnInit {
  tableCols = [
    {columnDef: 'groupTravelArrivalCity', header: 'Arrival City', type: 'name'},
 
    {columnDef: 'groupTravelName', header: 'Name', type: 'upperCaseText'},
    {columnDef: 'startDateFull', header: 'Event Date', type: 'fullDate'},
    {columnDef: 'docId', header: 'Admin', type: 'recordSingleValue',
    btnName: 'Detail'}
  ];
  tableData: Observable<any>;
  tableHeading = 'Group Travel';
  loggedInUserEmail: any;
  groupTravelName: any;
  groupTravelArrivalCity: any;
  constructor(
    private readService: ReadService,
    private router: Router    
  ) { }

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(sessionStorage.getItem("LoggedInUserEmail"));
    this.fetchTableDataFn();
  }

  fetchTableDataFn(venueDocId?: string){
    console.log('VenueDocId', venueDocId)
    return (this.tableData = this.readService.returnObservableOrderByAndFilterFn(
      `raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel`,
      'startDateTimeStamp',
      'asc',
      'applicationStatus',
      'draft'
    ));
  }

 async emittedTableDataFn(val: any) {
    console.log('Emitted Data', val);
    
    const x = await this.readService.returnCollectionGroupPromiseWhereFn(
      `requestedGroupTravel`,
      'readId',
      val.id
      );
      const [a] = [...x];
      console.log('Group Name Data', a);

      this.groupTravelArrivalCity = a.groupTravelArrivalCity;
      this.groupTravelName = a.groupTravelName;

     sessionStorage.setItem('GroupTravelName', JSON.stringify(this.groupTravelName));
     sessionStorage.setItem('GroupTravelCity', JSON.stringify(this.groupTravelArrivalCity));
     
      this.router.navigateByUrl('/account/group-travel/detail', {state: {groupTravelDocId: val.id}});
  }

}

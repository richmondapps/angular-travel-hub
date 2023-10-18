import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-admin-select-all-profiles',
  templateUrl: './admin-select-all-profiles.component.html',
  styleUrls: ['./admin-select-all-profiles.component.css']
})
export class AdminSelectAllProfilesComponent implements OnInit {
  tableCols = [
    {columnDef: 'personLegalNameFirst', type: 'name', header: 'First Name', readId: 'readId',},  
 
    {columnDef: 'requesterFirstLastName', header: 'Name', type: 'fullName', class: 'fullName'},
    {columnDef: 'personEmail', header: 'Email', type: 'email'},

    {columnDef: 'docId', header: 'Admin', type: 'emitData', btnName: 'Add'}
 
  ];
  
  travelers: any;
  tableData: Observable<any>;
  constructor(
    private readService: ReadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchTravelersListFn();
    // this.groupTravelDocId = JSON.parse(sessionStorage.getItem('GroupTravelDocId'));

  }

  async fetchTravelersListFn(){
    const allProfiles = await this.readService.returnCollectionGroupOrderByFn(
      'travelProfile',
      'personLegalNameFirst',
      'asc'
     )

     this.tableData = of(allProfiles);
  }

  emittedTableDataFn(d: any) {
    console.log('Emitted Data', d);
  //  sessionStorage.setItem('TravelRequestId', JSON.stringify(d.id));
  //  sessionStorage.setItem('TravelRequesterEmail', JSON.stringify(d.requesterEmail));
   
    // this.router.navigateByUrl('/admin/requests/detail', {state: {travelRequestId: d.id, personEmail: d.requesterEmail}});
  }


}

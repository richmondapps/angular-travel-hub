import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-all-travel-profiles',
  templateUrl: './all-travel-profiles.component.html',
  styleUrls: ['./all-travel-profiles.component.css'],
})
export class AllTravelProfilesComponent implements OnInit {
  tableCols = [
    {
      columnDef: 'personLegalNameFirst',
      type: 'fullName',
      header: 'Name',
      additionalNameField: 'personLegalNameLast',
    },
    { columnDef: 'personEmail', header: 'Email', type: 'email' },
    {
      columnDef: 'readId',
      header: 'View',
      type: 'recordDetail',
      urlPath: '/admin/profiles/detail',
    },
  ];
  tableHeading = 'Available Profiles';
  travelers: any;
  tableData: Observable<any>;
  constructor(private readService: ReadService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTravelersListFn();
  }

  async fetchTravelersListFn() {
    const allProfiles = await this.readService.returnCollectionGroupOrderByFn(
      'travelProfile',
      'personLegalNameFirst',
      'asc'
    );
    this.tableData = of(allProfiles);
  }

  async viewProfileFn(d: any) {
    this.router.navigateByUrl('/admin/profiles/detail', {
      state: {
        personEmail: d.id,
      },
    });
  }
  emittedTableDataFn(d: any) {
    sessionStorage.setItem('TravelRequestId', JSON.stringify(d.id));
    sessionStorage.setItem(
      'TravelRequesterEmail',
      JSON.stringify(d.requesterEmail)
    );

    this.router.navigateByUrl('/admin/requests/detail', {
      state: { travelRequestId: d.id, personEmail: d.requesterEmail },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-admin-group-travel-list',
  templateUrl: './admin-group-travel-list.component.html',
  styleUrls: ['./admin-group-travel-list.component.css'],
})
export class AdminGroupTravelListComponent implements OnInit {
  tableCols = [
    { columnDef: 'groupTravelArrivalCity', header: 'City', type: 'name' },

    { columnDef: 'groupTravelName', header: 'Eventx', type: 'upperCase' },
    {
      columnDef: 'docId',
      header: 'Admin',
      type: 'recordSingleValue',
      btnName: 'Detail',
    },
  ];
  tableData: Observable<any>;
  tableHeading = 'Group Travel';
  loggedInUserEmail: any;
  groupTravelName: any;
  groupTravelArrivalCity: any;
  constructor(private readService: ReadService, private router: Router) {}

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );
    this.fetchTableDataFn();
  }

  fetchTableDataFn(venueDocId?: string) {
    return (this.tableData =
      this.readService.returnObservableOrderByAndFilterFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel`,
        'createdDate',
        'asc',
        'applicationStatus',
        'pending'
      ));
  }

  async emittedTableDataFn(val: any) {
    const x = await this.readService.returnCollectionGroupPromiseWhereFn(
      `requestedGroupTravel`,
      'readId',
      val.id
    );
    const [a] = [...x];

    this.groupTravelArrivalCity = a.groupTravelArrivalCity;
    this.groupTravelName = a.groupTravelName;

    sessionStorage.setItem(
      'GroupTravelName',
      JSON.stringify(this.groupTravelName)
    );
    sessionStorage.setItem(
      'GroupTravelCity',
      JSON.stringify(this.groupTravelArrivalCity)
    );

    this.router.navigateByUrl('/account/group-travel/detail', {
      state: { groupTravelDocId: val.id },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReadService } from 'src/app/services/read.service';
import { GlobalConstants } from 'src/app/global-variables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-group-travel-draft-list',
  templateUrl: './admin-group-travel-draft-list.component.html',
  styleUrls: ['./admin-group-travel-draft-list.component.css'],
})
export class AdminGroupTravelDraftListComponent implements OnInit {
  tableCols = [
    { columnDef: 'groupTravelArrivalCity', header: 'City', type: 'name' },

    { columnDef: 'startDate', header: 'Date', type: 'date' },
    {
      columnDef: 'docId',
      header: 'Admin',
      type: 'recordSingleValue',
      btnName: 'Detail',
    },
  ];
  tableData: Observable<any>;
  tableHeading = 'Group Travel';
  constructor(private readService: ReadService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTableDataFn();
  }

  fetchTableDataFn(venueDocId?) {
    return (this.tableData =
      this.readService.returnObservableOrderByAndFilterFn(
        `${GlobalConstants.rootCollectionAndBranchDoc}/groupTravel`,
        'createdDate',
        'asc',
        'applicationStatus',
        'draft'
      ));
  }

  emittedTableDataFn(val: any) {
    this.router.navigateByUrl('/admin/groups/detail', {
      state: { docId: val.id },
    });
  }
}

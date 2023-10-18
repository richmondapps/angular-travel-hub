import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AdminGroupTravelService } from '../../admin-group-travel.service';

@Component({
  selector: 'app-admin-group-travel-arrival-city',
  templateUrl: './admin-group-travel-arrival-city.component.html',
  styleUrls: ['./admin-group-travel-arrival-city.component.css'],
})
export class AdminGroupTravelArrivalCityComponent implements OnInit {
  groupTravelDocId: any;
  showAddGroupTravelArrivalCityInput: boolean;
  formConfig: any;
  groupTravelCity: any;

  constructor(
    private createService: CreateService,
    private snackbarService: SnackbarService,
    private groupTravelService: AdminGroupTravelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (history.state.docId) {
      this.groupTravelDocId = history.state.docId;
      console.log('State Obj', this.groupTravelDocId);
    } else {
      this.groupTravelDocId = JSON.parse(
        sessionStorage.getItem('GroupTravelDocId')
      );
    }
  }

  showAddGroupTravelNameFn() {
    this.showAddGroupTravelArrivalCityInput =
      !this.showAddGroupTravelArrivalCityInput;
    this.formConfig =
      this.groupTravelService.groupTravelArrivalCityAndStartDateFn();
  }

  startOverFn() {
    this.groupTravelCity = null;
    this.showAddGroupTravelArrivalCityInput = true;
    this.formConfig =
      this.groupTravelService.groupTravelArrivalCityAndStartDateFn();
  }

  async submittedFormData(d: any) {
    if (d.groupTravelCity) {
      this.groupTravelCity = d.groupTravelCity;
    }

    const formData = {
      ...d,
    };
    try {
      this.createService.createRecordFn(
        `${GlobalConstants.rootCollectionAndBranchDoc}/groupTravel`,
        this.groupTravelDocId,
        formData
      );

      const snackClass = ['snackSuccess'];
      const message = `Arrival city created`;
      this.snackbarService.openSnackBar(message, snackClass);
      sessionStorage.setItem(
        'GroupTravelDocId',
        JSON.stringify(this.groupTravelDocId)
      );
      localStorage.setItem(
        'GroupTravelDocId',
        JSON.stringify(this.groupTravelDocId)
      );
      this.router.navigateByUrl('/admin/groups/travelers', {
        state: { docId: this.groupTravelDocId },
      });
    } catch (e) {
      console.log('ERROR', e.message);
      const snackClass = ['snackError'];
      const message = `Operation Failed, please try again.`;
      this.snackbarService.openSnackBar(message, snackClass);
    }
  }
}

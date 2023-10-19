import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { DateAndTimeService } from 'src/app/services/date-and-time.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-group-travel-arrival-city',
  templateUrl: './group-travel-arrival-city.component.html',
  styleUrls: ['./group-travel-arrival-city.component.css'],
})
export class GroupTravelArrivalCityComponent implements OnInit {
  groupTravelDocId: any;
  showAddGroupTravelArrivalCityInput: boolean;
  formConfig: any;
  groupTravelCity: any;
  loggedInUserEmail: any;
  groupTravelArrivalCity: any;

  constructor(
    private createService: CreateService,
    private snackbarService: SnackbarService,
    private groupTravelService: GroupService,
    private dateTimeService: DateAndTimeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail')
    );

    if (history.state.docId) {
      this.groupTravelDocId = history.state.docId;
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
    if (d.groupTravelArrivalCity) {
      this.groupTravelArrivalCity = d.groupTravelArrivalCity;
    }
    const a = this.dateTimeService.returnExtractedDatesFn(
      'groupRequest',
      d.groupRequestEventStartDate
    );
    const formData = {
      ...d,
      ...a,
      groupTravelRequestedBy: this.loggedInUserEmail,
    };
    try {
      this.createService.createRecordFn(
        `raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel`,
        this.groupTravelDocId,
        formData
      );
      const snackClass = ['snackSuccess'];
      const message = `Arrival city & date created`;
      this.snackbarService.openSnackBar(message, snackClass);
      sessionStorage.setItem(
        'GroupTravelDocId',
        JSON.stringify(this.groupTravelDocId)
      );
      sessionStorage.setItem(
        'GroupTravelCity',
        JSON.stringify(this.groupTravelArrivalCity)
      );
      localStorage.setItem(
        'GroupTravelDocId',
        JSON.stringify(this.groupTravelDocId)
      );
      this.router.navigateByUrl('/account/group-travel/travelers', {
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

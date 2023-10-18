import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/global-variables';
import { ReadService } from 'src/app/services/read.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-profile-detail',
  templateUrl: './admin-profile-detail.component.html',
  styleUrls: ['./admin-profile-detail.component.css'],
})
export class AdminProfileDetailComponent implements OnInit {
  personEmail: any;
  profile: any;
  travelRewards: any[];
  airlineRewards: Observable<any[]>;
  accommodationRewards: Observable<any[]>;
  vehicleRewards: Observable<any[]>;

  constructor(private readService: ReadService, public location: Location) {}

  ngOnInit(): void {
    if (history.state.personEmail) {
      this.personEmail = history.state.personEmail;
      console.log('State Obj', this.personEmail);
      sessionStorage.setItem(
        'AdminViewingProfileOf',
        JSON.stringify(this.personEmail)
      );
    } else {
      this.personEmail = JSON.parse(
        sessionStorage.getItem('AdminViewingProfileOf')
      );
    }
    this.fetchAirlineRewardsFn();
    this.fetchAccommodationRewardsFn();
    this.fetchVehcileRewardsFn();
    this.fetchProfileFn(this.personEmail);
  }
  backButtonWithState() {
    return this.location.back();
  }

  fetchAirlineRewardsFn() {
    try {
      this.airlineRewards = this.readService.returnObservableWhereFn(
        `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/travelRewardPrograms`,
        'rewardType',
        'airline'
      );
    } catch (e) {
      console.log('Error', e);
    }
  }
  fetchAccommodationRewardsFn() {
    try {
      this.accommodationRewards = this.readService.returnObservableWhereFn(
        `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/travelRewardPrograms`,
        'rewardType',
        'accommodation'
      );
    } catch (e) {
      console.log('Error', e);
    }
  }

  fetchVehcileRewardsFn() {
    try {
      this.vehicleRewards = this.readService.returnObservableWhereFn(
        `${GlobalConstants.rootEmployeeCollection}/${this.personEmail}/travelRewardPrograms`,
        'rewardType',
        'vehicle'
      );
    } catch (e) {
      console.log('Error', e);
    }
  }

  async fetchProfileFn(personEmail: any) {
    this.profile = await this.readService.returnPromiseWhereFn(
      `${GlobalConstants.rootEmployeeCollection}/${personEmail}/travelProfile`,
      'personEmail',
      this.personEmail
    );
  }
}

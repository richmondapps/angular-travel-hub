import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-admin-select-group-travelers',
  templateUrl: './admin-select-group-travelers.component.html',
  styleUrls: ['./admin-select-group-travelers.component.css']
})
export class AdminSelectGroupTravelersComponent implements OnInit {
  travelers;

  constructor(
    private readService: ReadService,
    private createService: CreateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchTravelersListFn();
  }

  async fetchTravelersListFn(){
    this.travelers = await this.readService.returnCollectionGroupOrderByFn(
      'travelProfile',
      'personLegalNameFirst',
      'asc'
     );
  }

  recordDetailFn(e: any){
    console.log('DETAIL', e);
    this.router.navigateByUrl(e.path, {state: {
      docId: e.docId}});
  } 
}

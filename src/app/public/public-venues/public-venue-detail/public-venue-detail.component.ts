import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from 'src/app/global-variables';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-public-venue-detail',
  templateUrl: './public-venue-detail.component.html',
  styleUrls: ['./public-venue-detail.component.css']
})
export class PublicVenueDetailComponent implements OnInit {
  venueData: any;
  venueDocId: string | null;

  constructor(
    private route: ActivatedRoute,
    private readService: ReadService,
  ) { }

  ngOnInit(): void {
    this.venueDocId = this.route.snapshot.paramMap.get('docId');
    console.log(`VENUE ID, ${this.venueDocId}`);

    this.venueData = this.readService.returnObservableWhereFn(`${GlobalConstants.rootCollectionAndBranchDoc}/branchVenues`, 'docId', this.venueDocId);

  }

}

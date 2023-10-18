import { Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read.service';
import { GlobalConstants } from 'src/app/global-variables';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-public-venues',
  templateUrl: './public-venues.component.html',
  styleUrls: ['./public-venues.component.css']
})
export class PublicVenuesComponent implements OnInit {
  venues: any;
  venueData: any;
  collectionPath: string;
  publicOrPrivate: string;
  documentId: string;
  deleteService: any;

  constructor(
    private readService: ReadService,
    private fileUploadService: FileUploadService

  ) { }

  ngOnInit(): void {
      this.fetchVenueDataFn();
      this.collectionPath = `${GlobalConstants.rootEmployeeCollection}/jake/resume`;
      this.publicOrPrivate = 'private';
      this.documentId = 'jake@csc';
  }

  fetchVenueDataFn(){
    this.venueData =  this.readService.returnObservableOrderByAndFilterFn(
      `${GlobalConstants.rootCollectionAndBranchDoc}/branchVenues`,
      'venueName',
      'asc',
      'published',
      'online');
    }
//   async fetchVenueDataFn(){
//     const res = await this.readService.returnPromiseOrderByAndWhereFilterFn(
//       `${GlobalConstants.rootCollectionAndBranchDoc}/branchVenues`,
//       'venueName',
//       'asc',
//       'published',
//       'online');
//       console.log(res)
//      const a: any[] = [];
//      res.forEach(async obj => {
//          console.log(obj)
//             if (!obj.imageUrl) {
//         const getImg =  await this.fileUploadService.getPublicUrl(
//           `${obj.storagePath}`);
//         obj.imageUrl = getImg;
//         a.push(obj);
//       }
//       })
// this.venueData = res;
//   }


//   deleteStorageDocFn(storagePath){
//     console.log('FILE PATH', storagePath);
// const snackSuccessMessage = 'Your resume has been deleted.';
// const snackErrorMessage = 'We could not delete your resume, please contact your branch.';
//      this.deleteService.deleteStorageFileAndFirestoreRefFn(
//       storagePath,
//       this.collectionPath,
//       this.documentId,
//       snackSuccessMessage,
//       snackErrorMessage
//      )
//   }

}

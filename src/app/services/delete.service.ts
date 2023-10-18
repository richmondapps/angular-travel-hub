import { Injectable } from '@angular/core';
import { ReadService } from './read.service';
import { SnackbarService } from './snackbar.service';
import { GlobalConstants } from 'src/app/global-variables';
import { Storage } from '@angular/fire/storage';
import { doc, Firestore, setDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
  notificationArray: any[];
  venueDocIdArray: any[];

  constructor(
    private afs: Firestore,
    private readService: ReadService,
    private snackbarService: SnackbarService,
    private storage: Storage
  ) { }

  deleteRecordFn(documentPath: any, docId: string){
    // console.log('DEL COL', collection);
    // console.log('DEL DOC ID', docId);
     const docRef = doc(this.afs, documentPath, docId);
     deleteDoc(docRef);
  }

  deleteStorageFileAndFirestoreRefFn(storagePath, firestorePath, docId, snackSuccessMessage, snackErrorMessage){
    // const fileRef = this.storage.ref(storagePath);
    // try {
    //      fileRef.delete();
    //       this.afs.doc(`${firestorePath}/${docId}`).delete();

    //      const snackClass = ['snackSuccess'];
    //      const message = snackSuccessMessage;
    //      this.snackbarService.openSnackBar(message, snackClass);
    //   } catch (e) {
    //     const {code, details} = JSON.parse(JSON.stringify(e));
    //     console.log('Error Data', code, details);
    //     const snackClass = ['snackError'];
    //     const message = snackErrorMessage;
    //     this.snackbarService.openSnackBar(message, snackClass);
    //   }



  }

  // async deleteMulitpleDocsFn(collection: string, field: string, value: any){
  //   console.log('DEL COL', collection);
  //   console.log('DEL property', field);
  //   console.log('DEL direction', value);

  //   const d = await this.readService.returnCollectionGroupRecordsWhereFn
  //   (
  //     collection,
  //     field,
  //     value
  //   );
  //   this.notificationArray = [];

  //   this.venueDocIdArray = [];
  //   d.subscribe(async e => {
  //     console.log('E-DATA', ...e);
  //     const [doc] = [...e];
  //    console.log('DOC SPREAD', doc);
  //    console.log('E-DATA-VEN DOCID', doc.venueDocId);
  //    console.log('E-DATA-VEN NAME', doc.venueName);
  //     if(doc.venueName){
  //     }
  //     this.notificationArray.push(doc.venueName);
  //     this.venueDocIdArray.push(doc.venueDocId);


  //   });
  //   console.log('VenueDocIdArray', this.venueDocIdArray);

  //   this.deleteVenueDocId(this.venueDocIdArray, value)


  //   return this.notificationArray;
  //   // console.log('notificationArray', this.notificationArray);
  //   // const snackClass = ['snackSuccess'];
  //   //   const message = `${[...this.notificationArray]} notifications have been deleted.`;
  //   //   this.snackbarService.openSnackBar(message, snackClass);
  // }

  deleteVenueDocId(array, value){
    // console.log('VenueDocIdArray', array);
    // array.forEach(async v => {
    //   console.log('V', v);
    //   await this.afs.doc(`${GlobalConstants.rootCollectionAndBranchDoc}/branchVenues/${v}/optedInPhoneAuthorization/${value}`).delete();
    // })
  }
}

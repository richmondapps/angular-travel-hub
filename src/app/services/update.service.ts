import { Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private afs: Firestore) { }

  customPatchValue(data: any, formGroup: FormGroup) {
    //  console.log(data);
    //  console.log(formGroup);
    data.map(k => {
      const truthy = Object.keys(k).filter(v => k[v] !== undefined || k[v] !== null || k[v] !== '');
      const newObj = {};
      truthy.forEach(v => Object.assign(newObj, { [v]: k[v]}));
   //   console.log(truthy);
      formGroup.patchValue(newObj);
     });

    return formGroup;
  }

   updateRecordFn(collectionPath: string, docId: string, formData: any) {
    console.log('Collection', collectionPath);
    console.log('DOCID', docId);
    console.log('DATA', formData);
    try {
      const colRef = doc(this.afs, collectionPath, docId);
      setDoc(colRef, formData, { merge: true});
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}



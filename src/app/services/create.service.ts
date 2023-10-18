import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, orderBy, collection, collectionData,
  doc, docData, deleteDoc, query, updateDoc, DocumentReference, setDoc, getDocs, where
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CreateService {

  constructor(private afs: Firestore,) { }

  createRecordFn(collectionPath: any, docId: any, formData: object){
     console.log(collectionPath);
     console.log(docId);
     console.log(formData);
     const colRef = doc(this.afs, collectionPath, docId);
    setDoc(colRef, formData, { merge: true});
    
    }
}

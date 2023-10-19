import { Injectable } from '@angular/core';
import {
  Firestore, addDoc, orderBy, collection, collectionData,
  doc, docData, deleteDoc, query, updateDoc, DocumentReference, setDoc, getDocs, where, collectionGroup, onSnapshot
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, filter} from 'rxjs/operators';
import { GlobalConstants } from 'src/app/global-variables';
import {
  DateAndTimeService
} from './date-and-time.service';
import { FileUploadService } from './file-upload.service';
@Injectable({
  providedIn: 'root'
})
export class ReadService {

  constructor(
    private afs: Firestore,
    private dateTime: DateAndTimeService,
    private fileUploadService: FileUploadService
    ) { }

  // getBooks(): Observable<any[]> {
  //   const booksRef = collection(this.afs, `cscBranchDirectory/san-bernardino/branchVenues`);
  //   return collectionData(booksRef, { idField: 'id' }) as Observable<any[]>;
  // }

  // #region PROMISES

  async branchManagersNamesFn(
    collectionPath: string,
    orderProperty: string,
    orderValue: any
  ) {
    //  console.log('collection', collection  );
    //  console.log('field', field );
    //  console.log('direction', direction );
    const colRef = await getDocs(query(collection(this.afs, collectionPath), orderBy(orderProperty, orderValue)));

 
    // const res = from(d);
    const data = [];
    colRef.forEach((x) => {
      //  console.log('X', x );

      if (x.data().personJobTitle === 'Branch Manager') {
        // const dataList = x.data();
        const obj = {
          optionName: `${x.data().personLegalNameFirst.toUpperCase()} ${x
            .data()
            .personLegalNameLast.toUpperCase()}`,
          value: `${x.data().personLegalNameFirst.toUpperCase()} ${x
            .data()
            .personLegalNameLast.toUpperCase()}`,
        };
        //  console.log('OBJ', obj);
        data.push(obj);
      }
    });
    //  console.log('DATA OBJ', data);
    return data;
  }

  async returnPromiseOrderByAndSingleFieldFilterFn(collectionPath: any, orderProperty: string, orderValue: any, whereProperty: string) {
    const colRef = await getDocs(query(collection(this.afs, collectionPath), orderBy(orderProperty, orderValue)));
    const resultsArray: any[] = []
     colRef.forEach(async (doc)=> {
      const data = doc.data();
      const id = doc.id;
      const singleProperty = data[whereProperty];    
        const obj = await this.dateTime.convertDate(singleProperty);
      resultsArray.push({id,  ...obj})      
  })
    return resultsArray;
  }

  async returnPromiseOrderByAndWhereFilterFn(collectionPath: any, orderProperty: string, orderValue: any, whereProperty: string, whereValue: any ) {
    const colRef = await getDocs(query(collection(this.afs, collectionPath), orderBy(orderProperty, orderValue)));
    const resultsArray: any[] = []
     colRef.forEach(async (doc)=> {
      const data = doc.data();
      const id = doc.id;
      if (data[whereProperty] === whereValue){
        const obj = await this.dateTime.convertDate(data);
      resultsArray.push({id,  ...obj})
      }
  })
    return resultsArray;
  }

  async returnPromiseOrderByFn(collectionPath: any, orderProperty: string, orderValue: any) {
    const colRef = await getDocs(query(collection(this.afs, collectionPath), orderBy(orderProperty, orderValue)));
    const resultsArray: any[] = []
     colRef.forEach(async (doc)=> {
      const data = doc.data();
      const id = doc.id;    
        const obj = await this.dateTime.convertDate(data);
      resultsArray.push({id,  ...obj})    
  })
    return resultsArray;
  }

  async returnPromiseWhereFn(collectionPath: any, whereProperty: string, whereValue: any ) {
    const resultsArray: any[] = []
    const colRef = await getDocs(query(collection(this.afs, collectionPath), where(whereProperty, '==', whereValue)));
    console.log('colRef', colRef);
    colRef.docs.map( f => {
   //   console.log('F', f.data());


      const data = f.data();
   //   console.log('DATA', data);
      const id = f.id;
      const obj =  this.dateTime.convertDate(data);
       
      resultsArray.push({id,  ...obj})     
    });
   //  console.log('ResultsArray ', resultsArray);
     return resultsArray;
  }

  async returnSelectOptionsPromiseOrderBy(
    collectionPath,
    fieldName,
    fieldValue,
    direction
  ) {
    // console.log(collectionPath);
    // console.log(fieldName);
    // console.log(fieldValue);
    // console.log(direction);
    const colRef = await getDocs(query(collection(this.afs, collectionPath), orderBy(fieldName, direction)));

    const data = [];
    colRef.forEach(x => {
      if (x) {
         const dataList = x.data();
         const obj = {
           optionName: ` ${x.data()[fieldName]}`.toUpperCase(),
           value: `${x.data()[fieldValue]}`,
         }
        // const obj = this.dateTime.convertTimestampFn(dataList);
      //   console.log(dataList);
        data.push(obj);
      }
    });
    return data;
  }

 async returnCollectionGroupFn(targetCollection){
    const d =  await getDocs(collectionGroup(this.afs, targetCollection))
    const data = [];
    d.forEach(e => {
        console.log('ALL REQUESTS', e.data());
        data.push(e.data());
      })
      return data;
  }
  // #endregion PROMISES

   returnObservableOrderByFn(collectionPath: any, orderProperty: string, orderValue: any ): Observable<any[]> {
  //  console.log('collection PATH', collectionPath);
    const colRef = collection(this.afs, collectionPath);
  //  console.log('COLREF', colRef);
    const q = query(colRef, orderBy(orderProperty, orderValue ));
 //   console.log('QQQ', q);
    const res = collectionData(q) as Observable<any[]>;
    return res.pipe(
      map((data: any) => {
        const obj = this.dateTime.convertDate(data);
      //  console.log('CONVERTED DATA', obj)
        return obj;
      })
    )
  }



returnObservableOrderByAndFilterFn(collectionPath: any, orderProperty: string, orderValue: any, whereProperty: any, whereValue: any ): Observable<any[]> {
    // console.log('collection', collectionPath);
    const colRef = collection(this.afs, collectionPath);
   // console.log('COLREF', colRef);
    const q = query(colRef, orderBy(orderProperty, orderValue ));
    const res = collectionData(q) as Observable<any[]>;
   //  console.log('CD', res);
 return res.pipe(
    map(x => x.filter(item => item[whereProperty] === whereValue)),
    map((data: any) => {
      const obj = this.dateTime.convertDate(data);
   //   console.log('OBJ', obj)
      // if (obj.storagePath) {
      //   console.log('storagePath', obj.storagePath);
      //   const getImg =  this.fileUploadService.getPublicUrl(obj.storagePath);
      //   console.log('GetImg', getImg);

      //  obj.imageUrl = getImg;

      // }
   //   console.log('CONVERTED DATA', obj)
      return obj;
    })
  )
}
// returnObservableOrderByFilterFn(collectionPath: any, orderProperty: string, orderValue: any, whereProperty: string, whereValue: any ): Observable<any[]> {
//     console.log('collection', collectionPath);
//     const colRef = collection(this.afs, collectionPath);
//     console.log('COLREF', colRef);
//     const q = query(colRef, where(whereProperty, '==', whereValue), orderBy(orderProperty, orderValue ) );
//     return collectionData(q) as Observable<any[]>;
// }

returnObservableWhereFn(collectionPath: any, whereProperty: string, whereValue: any ): Observable<any[]> {
       // console.log('collection', collectionPath);
    const colRef = collection(this.afs, collectionPath);
       // console.log('COLREF', colRef);
    const q = query(colRef, where(whereProperty, '==', whereValue ));
    const res = collectionData(q) as Observable<any[]>;
   //    console.log('CD', res);
   return res.pipe(
      map((data: any) => {
        const obj = this.dateTime.convertDate(data);
      //  console.log('CONVERTED DATA', obj)
        return obj;
      })
    )
  }


   returnCollectionGroupObservableFn(targetCollection){
    const d = collectionGroup(this.afs, targetCollection)
    onSnapshot(d, (querySnapshot) => {
      let data = [];
        querySnapshot.docs.forEach((doc) => {
       //   console.log(JSON.stringify(doc.data())); 
        data.push({...doc.data(), id: doc.id})
       //   data = doc.data()
        });
        console.log('READ DATA', data);        
        return  of(data);
      });
      
  }

}


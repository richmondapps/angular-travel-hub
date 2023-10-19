import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-admin-travel-requests-table',
  templateUrl: './admin-travel-requests-table.component.html',
  styleUrls: ['./admin-travel-requests-table.component.css']
})
export class AdminTravelRequestsTableComponent implements OnInit {
 @Input('tableData') tableData: any;
 @Input('tableCols') tableCols: any;
 @Input('tableHeading') tableHeading: any;
 @Input('whereValue') whereValue: any;

// tableData: Observable<any>;
  param: string;
  readId: any;
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    console.log('THIS TableData', this.tableData);
    console.log('THIS WhereValue', this.whereValue);
    if (history.state.readId){
      this.readId = history.state.readId;
    }
  //    this.param = this.route.snapshot.paramMap.get('request');
    console.log(`param , ${this.readId}`);
    // this.tableData;
    this.fetRequestsWhereFn();
    //  const r = JSON.parse(sessionStorage.getItem('TableRequest'));
    //  console.log(`param , ${r}`);
  }

  fetRequestsWhereFn(){ 
    // console.log('WhereValue', this.whereValue);
    // let d;
    // const collectionRef = collectionGroup(this.afs, 'requestedTravel');
    // if(!this.whereValue || this.whereValue === undefined){
    //   d =  query(collectionRef);    
    //   onSnapshot(d, (querySnapshot) => {
    //     let data = [];
    //     querySnapshot.docs.forEach((doc) => {  
    //      console.log('data', doc.data());
          
    //         data.push({...doc.data(), id: doc.id});     
    //       });
    //        console.log('data', data);
    //    return    this.tableData = of(data);
    //     });     
    // } else {
    //   d =   query(collectionRef, where('requestStatus', '==', this.whereValue))
    //   onSnapshot(d, (querySnapshot) => {
    //     let data = [];
    //     querySnapshot.docs.forEach((doc) => {  
    //      console.log('WHERE data', doc.data());      
    //         data.push({...doc.data(), id: doc.id});     
    //       });
    //        console.log('data', data);
    //     return   this.tableData = of(data);
    //     }); 
    // }     
 }

}

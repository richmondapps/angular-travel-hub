import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ReadService } from 'src/app/services/read.service';
import { getFirestore, getDocs, collectionGroup, onSnapshot, collection, query, where } from "firebase/firestore"
import { Observable, of } from 'rxjs';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-travel-requests-nav',
  templateUrl: './admin-travel-requests-nav.component.html',
  styleUrls: ['./admin-travel-requests-nav.component.css']
})
export class AdminTravelRequestsNavComponent implements OnInit, AfterViewInit {
  travelRequests: Observable<any>;
  tableCols = [
    {columnDef: 'requestStatus', type: 'requestStatus', header: 'Status', readId: 'readId', requesterEmail: 'personEmail'},  
    {columnDef: 'submittedDate', header: 'Submitted', type: 'date', class: 'date'},
    {columnDef: 'requesterFirstLastName', header: 'Name', type: 'fullName', class: 'fullName'},
    {columnDef: 'approvalManager', header: 'Approved By', type: 'fullName', class: 'fullName'},
    {columnDef: 'purposeOfTravel', header: 'Event', type: 'upperCaseText', class: 'upperCaseText'},  
    {columnDef: 'billableTo', header: 'Billable To', type: 'titleCaseText', class: 'titleCaseText'},
    {columnDef: 'docId', header: 'Request Type', type: 'requestIcons', iconField1: 'flightDepartureRequested',
    iconField2: 'accommodationRequested', 
    iconField3: 'vehicleRequested',
    flightType: 'flightRequestType'},
    {columnDef: 'requestCost', header: 'Cost', type: 'cost', class: 'requestCost'},
    {columnDef: 'startDateFull', header: 'Start Date', type: 'date', class: 'text'}
  ];
  //tableData: any;
   tableData: Observable<any>;
   tableHeading = "Total Requests"
  whereValue: any;
  constructor(
    private readService: ReadService,
    private afs: Firestore,
    private router: Router
  ) { }

  ngOnInit(): void {
  // this.fetAllRequestsFn();  
    this.fetRequestsWhereFn();    
     
  }

//   fetAllRequestsFn(){ 
//     const d =  query(collectionGroup(this.afs, 'requestedTravel')) 
   
//    onSnapshot(d, (querySnapshot) => {
//      let data = [];
//      querySnapshot.docs.forEach((doc) => {   
//          data.push({...doc.data(), id: doc.id});     
//        });
//         console.log('data', data);
//         this.tableData = of(data);
//      });    
//  }
  fetRequestsWhereFn(whereValue?){ 
    console.log('WhereValue', whereValue);
    this.tableData = null;
    
    this.whereValue = whereValue;
   // console.log('THIS WhereValue', this.whereValue);
 sessionStorage.setItem('TableRequest', JSON.stringify(whereValue));
 
    // this.router.navigateByUrl('/admin/requests/table', {state: {readId: whereValue}});
    let d;
    const collectionRef = collectionGroup(this.afs, 'requestedTravel');
    if(!whereValue || whereValue === undefined){
      d =  query(collectionRef);    
      onSnapshot(d, (querySnapshot) => {
        let data = [];
        querySnapshot.docs.forEach((doc) => {  
         console.log('NO PARAM', doc.data());
         const approvalManager = doc.data().managerWhoApproved
         .value;  
        const billableBranch = doc.data().billableBranch.value;  
        const requestStatus =    doc.data().requestStatus;
        if(requestStatus !== 'draft'){
          data.push({...doc.data(), id: doc.id, billableTo: billableBranch, approvalManager: approvalManager});  
       }     
          });
           console.log('data', data);
       return    this.tableData = of(data);
        });     
    } else {
      d =   query(collectionRef, where('requestStatus', '==', whereValue))
      onSnapshot(d, (querySnapshot) => {
        let data = [];
        querySnapshot.docs.forEach((doc) => {  
       //  console.log('data', doc.data());  
        const approvalManager = doc.data().managerWhoApproved
        .value;  
       const billableBranch = doc.data().billableBranch.value; 
       const requestStatus =    doc.data().requestStatus;
       console.log('billableBranch', billableBranch);
       if(requestStatus !== 'draft'){
          data.push({...doc.data(), id: doc.id, billableTo: billableBranch, approvalManager: approvalManager});  
       }
              
          });
          console.log('WHERE VAL DATA', data);
        return   this.tableData = of(data);
        }); 
    }     
 }

ngAfterViewInit(){
  // this.fetAllRequestsFn(); 
}
 emittedTableDataFn(d: any) {
    console.log('Emitted Data', d);
   sessionStorage.setItem('TravelRequestId', JSON.stringify(d.id));
   sessionStorage.setItem('TravelRequesterEmail', JSON.stringify(d.requesterEmail));
   
    this.router.navigateByUrl('/admin/requests/detail', {state: {travelRequestId: d.id, personEmail: d.requesterEmail}});
  }


}

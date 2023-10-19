import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ReadService } from "src/app/services/read.service";
import {
	getFirestore,
	getDocs,
	collectionGroup,
	onSnapshot,
	collection,
	query,
	where,
  orderBy,
} from "firebase/firestore";
import { Observable, of } from "rxjs";
import { Firestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
@Component({
  selector: 'app-admin-group-travel-nav',
  templateUrl: './admin-group-travel-nav.component.html',
  styleUrls: ['./admin-group-travel-nav.component.css']
})
export class AdminGroupTravelNavComponent implements OnInit, AfterViewInit {
	travelRequests: Observable<any>;
  tableCols = [
    {columnDef: 'groupTravelArrivalCity', header: 'Arrival City', type: 'name'},
 
    {columnDef: 'groupTravelName', header: 'Name', type: 'upperCaseText'},
    {columnDef: 'startDateFull', header: 'Event Date', type: 'fullDate'},
    {columnDef: 'docId', header: 'Admin', type: 'recordSingleValue',
    btnName: 'Detail'}
  ];
	//tableData: any;
	tableData: Observable<any>;
	tableHeading = "Total Requests";
	whereValue: any;
	constructor(
		private readService: ReadService,
		private afs: Firestore,
		private router: Router
	) {}

	ngOnInit(): void {
		// this.fetAllRequestsFn();
		this.fetRequestsWhereFn();
	}

	fetRequestsWhereFn(whereValue?) {
		console.log("WhereValue", whereValue);
		this.tableData = null;

		this.whereValue = whereValue;
		// console.log('THIS WhereValue', this.whereValue);
		sessionStorage.setItem("TableRequest", JSON.stringify(whereValue));

		// this.router.navigateByUrl('/admin/requests/table', {state: {readId: whereValue}});
		let val;
		const collectionRef = collectionGroup(this.afs, "requestedGroupTravel");
		if (!whereValue || whereValue === undefined) {
			val = query(collectionRef, orderBy("startDateTimeStamp", "asc"));
			onSnapshot(val, (querySnapshot) => {
				let data = [];
				querySnapshot.docs.forEach((doc) => {
				//	console.log("NO PARAM", doc.data());
					// const approvalManager = doc.data().managerWhoApproved.value;
					// const billableBranch = doc.data().billableBranch.value;
					const applicationStatus = doc.data().applicationStatus;
					if (applicationStatus !== "draft") {
						data.push({
							...doc.data(),
							id: doc.id		
						});
					}
				});
				console.log("data", data);
				return (this.tableData = of(data));
			});
		} else {
			val = query(collectionRef, orderBy("startDateTimeStamp", "asc"),where("applicationStatus", "==", whereValue), );
			onSnapshot(val, (querySnapshot) => {
				let data = [];
				querySnapshot.docs.forEach((doc) => {
					 console.log('data', doc.data());
				
					const applicationStatus = doc.data().applicationStatus;
				
					if (applicationStatus !== "draft") {
						data.push({
							...doc.data(),
							id: doc.id
						});
					}
				});
				console.log("WHERE VAL DATA", data);
				return (this.tableData = of(data));
			});
		}
	}

	ngAfterViewInit() {
		// this.fetAllRequestsFn();
	}
	async emittedTableDataFn(val: any) {
		console.log("Val Data", val);
		sessionStorage.setItem("GroupTravelDocId", JSON.stringify(val.id));
			
    const res = await this.readService.returnCollectionGroupPromiseWhereFn(
      `requestedGroupTravel`,
      'docId',
      val.id
    );

    const [a] = [...res];

    sessionStorage.setItem("GroupTravelName", JSON.stringify(a.groupTravelName));
		sessionStorage.setItem("GroupTravelCity", JSON.stringify(a.groupTravelArrivalCity));
    sessionStorage.setItem("GroupTravelRequestedBy", JSON.stringify(a.groupTravelRequestedBy));

    console.log("ARRAY MAP", a);
		this.router.navigateByUrl("/admin/groups/detail", {
			state: { groupTravelDocId: val.id,  },
		});
	}
}

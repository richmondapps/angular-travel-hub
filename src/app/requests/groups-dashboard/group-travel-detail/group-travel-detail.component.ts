import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { from, Observable, of } from "rxjs";
import { take } from "rxjs/operators";
import { CreateService } from "src/app/services/create.service";
import { DeleteService } from "src/app/services/delete.service";
import { ReadService } from "src/app/services/read.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { DeleteDialogComponent } from "src/app/shared/delete-dialog/delete-dialog.component";
import { EditDocumentDialogComponent } from "src/app/shared/edit-document-dialog/edit-document-dialog.component";
import { GroupService } from "../group.service";
import { Location } from '@angular/common';
@Component({
	selector: "app-group-travel-detail",
	templateUrl: "./group-travel-detail.component.html",
	styleUrls: ["./group-travel-detail.component.css"],
})
export class GroupTravelDetailComponent implements OnInit {
	tableCols = [
		{
			columnDef: "readId",
			header: "View",
			type: "recordSingleValue",
			btnName: "Update Flight Info",
		},
    {
			columnDef: "docId",
			header: "Detail",
			type: "recordSingleValue",
			btnName: "Profile",
      urlPath: 'admin/profiles/detail'
		},
		{
			columnDef: "deleteId",
			header: "Delete",
			type: "deleteRecord",
		},
		{
			columnDef: "personLegalNameFirst",
			type: "fullName",
			header: "Name",
			additionalNameField: "personLegalNameLast",
		},
		{ columnDef: "flightDeptDate", header: "Dept. Date", type: "fullDate" },
		{
			columnDef: "flightFromAirport",
			header: "Dept. City",
			type: "upperCaseText",
		},

		{
			columnDef: "birthMonth",
			type: "constructedDate",
			header: "D.o.B",
			date: "birthDate",
			year: "birthYear",
		},
		{ columnDef: "personEmail", header: "Email", type: "email" },

		{
			columnDef: "personKnownTravelerNumber",
			header: "TSA KTN",
			type: "string",
		},

		{ columnDef: "flightReturnDate", header: "Return Date", type: "fullDate" },
		{
			columnDef: "flightReturnAirport",
			header: "Return City",
			type: "upperCaseText",
		},
		{ columnDef: "personCellPhone", header: "Phone", type: "phone" }
	];

	groupTravelDocId: any;
	selectedTravelersHeading: string;
	loggedInUserEmail: any;
	addedTravelersData: any;
	profileData: any[];
	tableData: Observable<any>;
	tableHeading = "Group Members";
	addFlightInfo: (
		| {
				cssWrapperClass: string;
				cssWrapperId: string;
				controlLabel: string;
				controlName: string;
				controlType: string;
				valueType: string;
				placeholder: string;
				options: { optionName: string }[];
				validators: {
					required: boolean;
					maxlength?: undefined;
					minlength?: undefined;
				};
				minDate?: undefined;
		  }
		| {
				cssWrapperClass: string;
				controlLabel: string;
				controlName: string;
				controlType: string;
				valueType: string;
				minDate: any;
				placeholder: string;
				validators: { required: boolean; maxlength: number; minlength: number };
				cssWrapperId?: undefined;
				options?: undefined;
		  }
	)[];
	addPersonToGroupTravel: {
		cssWrapperClass: string;
		controlLabel: string;
		controlName: string;
		controlType: string;
		valueType: string;
		placeholder: string;
		options: any[];
		validators: { maxlength: number; minlength: number; required: boolean };
	}[];
	groupTravelArrivalCity: any;
	groupTravelName: any;
	isShowErrorMsg = false;
	emailArray;
	constructor(
		private readService: ReadService,
		private snackbarService: SnackbarService,
		private createService: CreateService,
		private groupService: GroupService,
		private dialog: MatDialog,
		private deleteService: DeleteService,
    public location: Location, 
		private router: Router
	) {}

	ngOnInit(): void {
		this.addFlightInfo = this.groupService.returnFlightConfigFn();

		this.groupTravelName = JSON.parse(
			sessionStorage.getItem("GroupTravelName")
		);
		this.groupTravelArrivalCity = JSON.parse(
			sessionStorage.getItem("GroupTravelCity")
		);
		// this.groupTravelDocId = JSON.parse(sessionStorage.getItem('GroupTravelDocId'));
		this.loggedInUserEmail = JSON.parse(
			sessionStorage.getItem("LoggedInUserEmail")
		);
		if (history.state.groupTravelDocId) {
			this.groupTravelDocId = history.state.groupTravelDocId;
			console.log("State Obj", this.groupTravelDocId);
			sessionStorage.setItem(
				"GroupTravelDocId",
				JSON.stringify(this.groupTravelDocId)
			);
		} else {
			this.groupTravelDocId = JSON.parse(
				sessionStorage.getItem("GroupTravelDocId")
			);
		}

		console.log("Group Travel DocId", this.groupTravelDocId);

		//  this.fetchSelectedTravelersListFn();
		this.tableDataFn(this.groupTravelDocId);
	}

  dismissFn(){
    this.isShowErrorMsg = false;
  }

	async fetchSelectedTravelersListFn() {
		this.selectedTravelersHeading = "Selected Profiles";
		this.groupTravelDocId = await JSON.parse(
			sessionStorage.getItem("GroupTravelDocId")
		);

		try {
			const t = await this.readService.returnPromiseOrderByFn(
				`raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel/${this.groupTravelDocId}/selectedGroupTravelers`,
				"personEmail",
				"asc"
			);
			console.log("T", t);
			const selectedArray = [];

			t.forEach(async (e) => {
				const val = await this.readService.returnPromiseWhereFn(
					`raEmployeeDirectory/${e.personEmail}/travelProfile`,
					"docId",
					e.personEmail
				);
				console.log("E", val);

				selectedArray.push(...val);
			});
			this.addedTravelersData = of(t);

			const allTravelerEmails = await Promise.all(selectedArray);
			const results = [];
			selectedArray.forEach((s) => {
				console.log("SNAP", s);
			});
			this.profileData = selectedArray;
			this.profileData = selectedArray;
			//  setTimeout(() => {
			//   this.tableDataFn(selectedArray)
			//  }, 1000);
			console.log("allTravelerEmails", allTravelerEmails);
			console.log("selectedArray", selectedArray);
		} catch (error) {
			console.log("Error", error);
		}
	}

	deleteRecordFn(docId: string) {
		console.log(docId);
		const groupTravelArrivalCity = this.groupTravelArrivalCity.toUpperCase();
		const groupTravelName = this.groupTravelName.toUpperCase();
		const msg = `Remove <span style="color: red; font-weight: bold;">
${docId}</span>`;

		const dialogRef = this.dialog.open(DeleteDialogComponent, {
			panelClass: "dialogAddContract",
			data: {
				documentMessage: msg,
				eventTitle: `from 
          ${groupTravelArrivalCity} - ${groupTravelName}`,
				docId,
			},
		});

		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe((res) => {
				console.log(res);
				const returnedData = res;
				if (!returnedData || returnedData.cancel) {
					console.log("returnedData: NOT CONFIRMED");
				} else if (returnedData.confirm) {
					console.log("returnedData: CONFIRMED");

					try {
						this.deleteService.deleteRecordFn(
							`raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel/${this.groupTravelDocId}/selectedGroupTravelers`,
							docId
						);
					} catch (error) {
						console.log("ERROR", error);
					}
				}
			});
	}
  backButtonWithState() {
    return this.location.back();
  }
	availableProfilesFn() {
		this.router.navigateByUrl("/account/group-travel/travelers", {
			state: {
				docId: this.groupTravelDocId,
			},
		});
	}

	tableDataFn(groupTravelDocId) {
		console.log("Group Travel DocId", groupTravelDocId);
		const x = this.readService.returnCollectionGroupObservableWhereAndOrderByFn(
			`selectedGroupTravelers`,
			"groupTravelDocId",
			groupTravelDocId,
			"personEmail",
			"asc"
		);

		this.tableData = x;
		console.log("TABLE DATA", this.tableData);
	}


	async submitGroupRequestFn() {
		const res = await this.readService.returnCollectionGroupPromiseWhereFn(
			`selectedGroupTravelers`,
			"groupTravelDocId",
			this.groupTravelDocId
		);

		console.log("COL GRP RES", res);

		const a = [];
		res.forEach((e) => {
			if (!e.flightDeptDate) {
				a.push({
					personEmail: e.personEmail,
					personLegalNameFirst: e.personLegalNameFirst,
					personLegalNameLast: e.personLegalNameLast,
				});
			}
		});

		if (a?.length) {
			console.log("A Length", a);
			this.isShowErrorMsg = true;
			this.emailArray = a;
		} else {
      	try {
		  const formData = {
		    applicationStatus: 'new'
		  }
		  console.log('OBJ', formData);

		  this.createService.createRecordFn(
		    `raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel`,
		    `${this.groupTravelDocId}`,
		    formData
		  )
		     const snackClass = ['snackSuccess'];
		     const message = `Group request submitted`;
		     this.snackbarService.openSnackBar(message, snackClass);
		     this.router.navigateByUrl('/account/group-travel/draft')
		  } catch (e) {
		    const {code, details} = JSON.parse(JSON.stringify(e));
		    console.log('Error Data', code, details);
		    const snackClass = ['snackError'];
		    const message = `Submission FAILED, please try again `;
		    this.snackbarService.openSnackBar(message, snackClass);
		  }
    }
	
	}
	async addPersonFn() {
		this.addPersonToGroupTravel = await this.groupService.allTravelProfilesFn(
			"travelProfile",
			"personLegalNameFirst",
			"asc"
		);
		const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
			panelClass: "editDialog",
			data: {
				formConfig: this.addPersonToGroupTravel,
				class: "addGroupMember",
			},
		});
		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe(async (res) => {
				if (!res.data) {
					return;
				} else {
					//    console.log('Form Data', res.data);
					const obj = res.data;
					obj.value = obj.addToGroup.value;
					const email = obj.value;
					console.log("OBJ", obj);
					console.log("VAL", obj.value);

					const e = await this.readService.returnPromiseWhereFn(
						`raEmployeeDirectory/${email}/travelProfile`,
						"docId",
						email
					);

					const [s] = [...e];
					const docId = email;
					const formData = {
						docId,
						personCellPhone: s.personCellPhone,
						birthDate: s.birthDate,
						birthMonth: s.birthMonth,
						birthYear: s.birthYear,
						personGender: s.personGender,
						personLegalNameFirst: s.personLegalNameFirst,
						personLegalNameLast: s.personLegalNameLast,
						personKnownTravelerNumber: s.personKnownTravelerNumber,
						createId: docId,
						updateId: docId,
						deleteId: docId,
						readId: docId,
						personEmail: email,
						groupTravelDocId: this.groupTravelDocId,
						applicationStatus: "pending",
					};

					console.log("Form Data", formData);
					try {
						this.createService.createRecordFn(
							`raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel/${this.groupTravelDocId}/selectedGroupTravelers`,
							email,
							formData
						);
					} catch (error) {
						console.log("error", error);
					}
				}
			});
	}

  viewRecordFn(val: any){
    console.log("Emitted Data", val);

    this.router.navigateByUrl(val.path,
      {state: {
        personEmail: val.id
      }})
  }
	emittedTableDataFn(val: any) {
		console.log("Emitted Data", val);
		// sessionStorage.setItem("TravelRequestId", JSON.stringify(val.id));
		// sessionStorage.setItem(
		//   "TravelRequesterEmail",
		//   JSON.stringify(val.personEmail)
		// );

		const dialogRef = this.dialog.open(EditDocumentDialogComponent, {
			panelClass: "editDialog",
			data: {
				formConfig: this.addFlightInfo,
				class: "addGroupFlightInfo",
			},
		});
		dialogRef
			.afterClosed()
			.pipe(take(1))
			.subscribe((res) => {
				if (!res.data) {
					return;
				} else {
					//    console.log('Form Data', res.data);
					const obj = res.data;
					const startDate = obj.flightDeptDate;
					const startDay = startDate.getDate();
					const startMonth = startDate.getMonth() + 1;
					const startYear = startDate.getFullYear();
					obj.flightDeptDate = `${startMonth}/${startDay}/${startYear}`;

					const endDate = obj.flightReturnDate;
					const endDay = endDate.getDate();
					const endMonth = endDate.getMonth() + 1;
					const endYear = endDate.getFullYear();
					obj.flightReturnDate = `${endMonth}/${endDay}/${endYear}`;
					obj.flightFromAirport = obj.flightFromAirport.optionName;
					obj.flightReturnAirport = obj.flightReturnAirport.optionName;

					const formData = {
						...obj,
					};
					console.log("OBJ", formData);
					try {
						this.createService.createRecordFn(
							`raEmployeeDirectory/${this.loggedInUserEmail}/requestedGroupTravel/${this.groupTravelDocId}/selectedGroupTravelers`,
							val.id,
							formData
						);
					} catch (error) {
						console.log("Error", error);
					}
				}
			});
		// this.router.navigateByUrl("/admin/requests/detail", {
		//   state: { travelRequestId: val.id, personEmail: val.requesterEmail },
		// });
	}
}

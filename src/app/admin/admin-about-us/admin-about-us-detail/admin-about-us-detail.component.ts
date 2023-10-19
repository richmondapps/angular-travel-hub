import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/global-variables';
import { CreateService } from 'src/app/services/create.service';
import { ReadService } from 'src/app/services/read.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { UpdateService } from 'src/app/services/update.service';


@Component({
  selector: 'app-admin-about-us-detail',
  templateUrl: './admin-about-us-detail.component.html',
  styleUrls: ['./admin-about-us-detail.component.css']
})
export class AdminAboutUsDetailComponent implements OnInit {
  type: 'content' | 'edit' | 'create' = 'content';
  data: any;
  message;
  showPage = false;
  branchData: any;
  showCreateData: any;
  isBranchData;
  noBranchData: boolean;
  patchValues: any;
  formConfig: FormData[];
 collectionName = 'corpBranchTest';
 docId = 'corp';
  pd: string;
  
  constructor(
    private createService: CreateService,
    private readService: ReadService,
    private updateService: UpdateService
  ) { }


  ngOnInit(): void {
    this.readService.returnObservableWhereFn('raBranchDirectory', 'docId', GlobalConstants.globalBranchDocId).subscribe(d => {
    //  console.log('READ', d);
      if (!d?.length) {
    //    console.log('NO ARRAY', d);
        this.isBranchData = false;
        this.showPage = true;
      } else {
    //    console.log('IS ARRAY', d);
        this.isBranchData = true;
        this.showPage = true;
        this.branchData = d;
      }
    });

    this.pd = `${this.collectionName}/${this.docId}/files`;

   
  }
  changeType(val) {
    this.type = val;
  }
  get isContent() {
    return this.type === 'content';
  }
  get isEdit() {
    this.patchValues = this.branchData;
    return this.type === 'edit';
  }
  get isCreate() {
    return this.type === 'create';
  }
  submittedFormData(d: any) {
  //  console.log('Emitted Data', d);
    const docId = UidGeneratorService.newId();
    this.message = d;
    if (d.docId) {
   //   console.log('Branch ID', d.docId);
      const data = {
        ...d
      };
      this.updateService.updateRecordFn('corpBranchTest', d.docId, data);
    } else {
   //   console.log('NEW ENTRY');
      d.docId = 'corp';
      const data = {
        ...d
      };
      this.createService.createRecordFn('corpBranchTest', docId, data);
      this.isBranchData = true;
    }
  }
}

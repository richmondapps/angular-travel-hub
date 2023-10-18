import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateService } from 'src/app/services/create.service';
import { EventService } from 'src/app/services/event.service';
import { FormService } from 'src/app/services/form.service';
import { UidGeneratorService } from 'src/app/services/uid-generator.service';
import { GlobalConstants } from 'src/app/global-variables';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-admin-bulletin-board-create',
  templateUrl: './admin-bulletin-board-create.component.html',
  styleUrls: ['./admin-bulletin-board-create.component.css']
})
export class AdminBulletinBoardCreateComponent implements OnInit {

  constructor(
    private eventService: EventService,
    private formService: FormService,
    private router: Router,
    private createService: CreateService,
    private snackbarService: SnackbarService,
    
  
  ) { }

  ngOnInit(): void {
   this.emittedDataFn();
  }


  async emittedDataFn(d?){
      console.log(d); // here you get the message from Child component

      if(d){
           const bulletinBoardTitle = d.bulletinBoardTitle;
      //  console.log('vName', this.blogName);
        const bulletinBoardSlug =  await this.formService.trimLowerCaseReplaceSpacesWithHyphenFn(bulletinBoardTitle);
   
      const docId = UidGeneratorService.newId();
      const formData = {
        bulletinBoardSlug,
        docId,
        publishStatus: 'draft',
        ...d
      };
      try {
        this.createService.createRecordFn(
        `${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard`,
        docId,
         formData
        );
         const message = `Title added`;
         this.snackbarService.success(message);
         sessionStorage.setItem('Slug', JSON.stringify(bulletinBoardSlug));
         sessionStorage.setItem('BlogDocId', JSON.stringify(docId));
         localStorage.setItem('BlogDocId', JSON.stringify(docId));
         this.router.navigateByUrl('/admin/bulletin-board/preview',
         {state: { docId: docId}});

        } catch (e) {
        console.log('ERROR', e);
        const message = `Operation Failed`;
        this.snackbarService.error(message);
      }
      }  

   
  }
}

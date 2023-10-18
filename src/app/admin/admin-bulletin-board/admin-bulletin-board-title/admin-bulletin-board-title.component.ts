import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AdminBulletinBoardService } from '../admin-bulletin-board.service';

@Component({
  selector: 'app-admin-bulletin-board-title',
  templateUrl: './admin-bulletin-board-title.component.html',
  styleUrls: ['./admin-bulletin-board-title.component.css']
})
export class AdminBulletinBoardTitleComponent implements OnInit {
@Output() bulletinTitle = new EventEmitter();
  formConfig: { cssWrapperClass: string; controlLabel: string; controlName: string; controlType: string; valueType: string; placeholder: string; validators: { required: boolean; minlength: number; maxlength: number; }; }[];
  showAddBulletinBoardTitleInput = false;
  showEditBulletinBoardNameInput = false;
  bulletinBoardName = "bulletinBoardName";

  constructor(
    private bulletinBoardService: AdminBulletinBoardService
  ) { }

  ngOnInit(): void {
    this.bulletinTitle.emit("dog")
  }

showAddBulletinBoardNameFn(){
  // this.rootCollectionName = this.globalVars.rootCollectionNameFn();
  this.showAddBulletinBoardTitleInput = true;
  this.formConfig = this.bulletinBoardService.bulletinBoardNameFn();
}

emittedFormDataFn(d: any) {
  console.log('E T', d.bulletinBoardTitle);
  try {
    this.bulletinTitle.emit(d);
   
  } catch (e) {
    console.log('ERROR', e);
  }

 // this.bulletinTitle.emit(d.bulletinBoardTitle)
}
}

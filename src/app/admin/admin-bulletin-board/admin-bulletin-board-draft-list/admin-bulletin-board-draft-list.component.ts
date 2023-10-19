import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/global-variables';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-admin-bulletin-board-draft-list',
  templateUrl: './admin-bulletin-board-draft-list.component.html',
  styleUrls: ['./admin-bulletin-board-draft-list.component.css']
})
export class AdminBulletinBoardDraftListComponent implements OnInit {
  blogList: Observable<any[]>;
  branchName: string;

  constructor(
    private readService: ReadService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.branchName = `${GlobalConstants.branchNameTitleCase}`;
   this.blogList = this.readService.returnObservableOrderByAndFilterFn(
      `${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard`,
      'publishStatus',
      'asc',
      'publishStatus',
      'draft'
      );
  }

  readArticleFn(slug){
    this.router.navigateByUrl('/admin/bulletin-board/article',
    {state: { bulletinBoardSlug: slug}});
  }
}

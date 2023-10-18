import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GlobalConstants } from 'src/app/global-variables';
import { ReadService } from 'src/app/services/read.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UpdateService } from 'src/app/services/update.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin-bulletin-board-detail',
  templateUrl: './admin-bulletin-board-detail.component.html',
  styleUrls: ['./admin-bulletin-board-detail.component.css']
})
export class AdminBulletinBoardDetailComponent implements OnInit {
  articleId: any;
  article: any;
  constructor(
    private router: Router,
    private readService: ReadService,
    private updateService: UpdateService,
    public location: Location,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // if (history.state.bulletinBoardSlug){
    //   this.articleId = history.state.bulletinBoardSlug;
    // }
    this.route.params.subscribe((params: Params) => {
      const newsRef = params['bulletinBoardSlug'];
      console.log(newsRef);
      this.articleId = newsRef;
      this.newsArticle(this.articleId);
    });

    this.newsArticle(this.articleId);
  }

  newsArticle(articleId) {
    console.log(articleId);

    this.article = this.readService.returnObservableWhereFn(
      `${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard`,
      'bulletinBoardSlug',
      this.articleId
    );
  }

  updatePublishStatusFn(docId: string, status: string) {
    const p = {
      publishStatus: status
    };

    try {
      this.updateService.updateRecordFn(
        `${GlobalConstants.rootCollectionAndBranchDoc}/bulletinBoard`,
        docId,
        p
      );
      const snackClass = ['snackSuccess'];
      const message = `Your bulletin has been published.`;
      this.snackbarService.openSnackBar(message, snackClass);
      this.router.navigateByUrl('/admin/bulletin-board/published');
    } catch (e) {
      console.log('ERROR', e);
      const snackClass = ['snackError'];
      const message = `FAIL: `;
      this.snackbarService.openSnackBar(message, snackClass);
    }
  }

  editBlogFn(docId: string) {
    this.router.navigateByUrl('/admin/bulletin-board/preview',
           {state: { docId: docId}});
  }

  backButtonWithState() {
    return this.location.back();
  }
}

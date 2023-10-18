import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
// import { AngularFireAuth } from '@angular/fire/auth';
import {
  map,
  shareReplay
} from 'rxjs/operators';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/auth/auth.service';
// import { ReadService } from 'src/app/services/read.service';
import { GlobalConstants } from 'src/app/global-variables';
import { MatSidenav } from '@angular/material/sidenav';
import { ReadService } from 'src/app/services/read.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent  implements OnInit {
  @ViewChild('sitesidenav')
  sitesidenav!: MatSidenav;
  // isHandset$: Observable < boolean > = this.breakpointObserver.observe([Breakpoints.Handset])
  // .pipe(
  //   map(result => result.matches),
  //   shareReplay()
  // );
  loggedInUserEmail: any;
  isAdmin: boolean;
branchTitle = `${GlobalConstants.branchNameTitleCase}`;
  isPhone = false;
  isTablet = false;
  isLaptop = false;
  isDesktop = false;
  isLargeDesktop = false;
  // mainNavMenuItems: any[];
  // loggedInMainNavMenuItems: ({ name: string; link: string; isAdmin?: undefined; } | { name: string; link: string; isAdmin: boolean; })[];
  // notLoggedInMainNavMenuItems: ({ name: string; link: string; isAdmin?: undefined; } | { name: string; link: string; isAdmin: boolean; })[];
   // mainNavMenuItems: any[];
loggedInMainNavMenuItems:any;
   notLoggedInMainNavMenuItems: any;
  miscImages!: Observable<any>;

constructor(private breakpointObserver: BreakpointObserver,
            // public afAuth: AngularFireAuth,
              public authService: AuthService,
             private readService: ReadService,
            private router: Router
            ) {}
ngOnInit(){
  this.miscImages = this.readService.returnObservableWhereFn(
    `${GlobalConstants.corporateMiscImages}`,
    'imageTitle',
    'csc-gold-logo'
  )

  this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge
  ]).subscribe((state: BreakpointState) => {
    if (state.breakpoints[Breakpoints.XSmall]) {
    //  console.log('Matches XSmall viewport');
      this.isPhone = true;
      this.isLaptop = false;
      this.isDesktop = false;
      this.isLargeDesktop = false;
    }
    if (state.breakpoints[Breakpoints.Small]) {
   //   console.log('Matches Small viewport');
      this.isTablet = true;
      this.isLaptop = false;
      this.isDesktop = false;
      this.isLargeDesktop = false;
    }
    if (state.breakpoints[Breakpoints.Medium]) {
    //  console.log('Matches Medium  viewport');
      this.isLaptop = true;
      this.isPhone = false;
      this.isTablet = false;
    }
    if (state.breakpoints[Breakpoints.Large]) {
      this.isDesktop = true;
      this.isLaptop = false;
      this.isTablet = false;
    //  console.log('Matches Large viewport');
    }
    if (state.breakpoints[Breakpoints.XLarge]) {
      this.isLargeDesktop = true;
      this.isLaptop = false;
      this.isTablet = false;
    //  console.log('Matches XLarge viewport');
    }
  });
  // this.loggedInUserEmail = JSON.parse(sessionStorage.getItem('LoggedInUserEmail'));
  // this.fetchUserFn();
  this.loggedInMainNavMenuItemsFn();
  this.notLoggedInMainNavMenuItemsFn();
}

loggedInMainNavMenuItemsFn(){
  this.loggedInMainNavMenuItems = [
 
    {
      name: 'Bulletin-Board',
      link: 'blog'
    },
 
    {
      name: 'FAQ',
      link: 'faq'
    },
    {
      name: 'Privacy',
      link: 'privacy-policy'
    }
  ]
}
notLoggedInMainNavMenuItemsFn(){
  this.notLoggedInMainNavMenuItems = [
  
      {
      name: 'FAQ',
      link: 'faq'
    },
    {
      name: 'Privacy',
      link: 'privacy-policy'
    }
  ]
}

// async fetchUserFn(){
//   const u = await this.readService.returnPromiseWhere(
//     `${GlobalConstants.rootCollectionAndBranchDoc}/branchAuthUsers`,
//       'personEmail',
//       this.loggedInUserEmail
//     );
//  if(u?.length){
//    this.isAdmin = true;
//  } else {
//    this.isAdmin = false;
//  }
//  console.log('USER NAV', u);
// }
}

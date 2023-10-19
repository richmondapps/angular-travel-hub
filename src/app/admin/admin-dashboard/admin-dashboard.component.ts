import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from 'src/app/auth/auth.service';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  menuArray: { name: string; link: string; icon: string; }[];


  constructor(
    private breakpointObserver: BreakpointObserver,
    private readService: ReadService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.menuFn();
  }

  ngAfterViewInit(){
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe((state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
       console.log('Matches XSmall viewport');
       this.sidenav.mode = 'over';
       this.sidenav.close();
      }
      if (state.breakpoints[Breakpoints.Small]) {
        console.log('Matches Small viewport');
        this.sidenav.mode = 'over';
        this.sidenav.close();
      }
      if (state.breakpoints[Breakpoints.Medium]) {
        console.log('Matches Medium  viewport');
this.sidenav.mode = "side";
this.sidenav.open();
      }
      if (state.breakpoints[Breakpoints.Large]) {
        this.sidenav.mode = "side";
        this.sidenav.open();
       console.log('Matches Large viewport');
      }
      if (state.breakpoints[Breakpoints.XLarge]) {
        this.sidenav.mode = "side";
        this.sidenav.open();
       console.log('Matches XLarge viewport');
      }
    });
}

menuFn(){
  this.menuArray = [
    {
      name: 'Auth Users',
      link: 'auth-users',
      icon: 'account_box'
    },
    {
      name: 'Requests',
      link: 'requests',
      icon: 'card_travel'
    },
    {
      name: 'Bulletin Board',
      link: 'bulletin-board',
      icon: 'view_list'
    },
    {
      name: 'Contact Center',
      link: 'twilio',
      icon: 'loyalty'
    },
    {
      name: 'FAQ',
      link: 'faq',
      icon: 'feedback'
    },
    {
      name: 'Report Bugsz',
      link: 'report-bugs',
      icon: 'feedback'
    }
    
      ]
}

  closeSideNav() {
    this.sidenav.close();
  }

}

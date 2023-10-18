import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  memberData: Observable<any>;
  menuArray: { name: string; link: string; icon: string; }[];
  loggedInUserEmail: any;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private readService: ReadService,
    public authService: AuthService

  ) { }

  ngOnInit(): void {
    this.loggedInUserEmail = JSON.parse(
      sessionStorage.getItem('LoggedInUserEmail'));
    this.fetchMemberDataFn();
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

fetchMemberDataFn(){
    // this.memberData = this.readService.returnObservableWhereFn(
    //   'caosMembers',
    //   'personEmail',
    //   this.loggedInUserEmail
    // )
}


  closeSideNav() {
    this.sidenav.close();
  }

menuFn(){
  this.menuArray = [
    {
      name: 'Profile',
      link: 'profile',
      icon: 'account_box'
    },
    {
      name: 'Travel',
      link: 'request',
      icon: 'card_travel'
    },
    {
      name: 'My Trips',
      link: 'my-trips',
      icon: 'view_list'
    },
    {
      name: 'Rewards',
      link: 'rewards',
      icon: 'loyalty'
    },
    {
      name: 'Feedback',
      link: 'feedback',
      icon: 'feedback'
    }
    
      ]
}

}

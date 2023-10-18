import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AuthService } from '../auth.service';


@Injectable({
  providedIn: 'root'
})
export class VerifiedEmployeeGuard implements CanActivate {

 constructor(
  private authService: AuthService,
  private router: Router,
  private snackbarService: SnackbarService
 ){}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authService.isLoggedIn !== true) {
        // window.alert('Access Denied, Login is Required to Access This Page!')
                 const snackClass = ['snackError'];
        const message = 'You are not authorized to view this page, please sign in.';
        this.snackbarService.openSnackBar(message, snackClass);
        this.router.navigate(['login'])
      }
      return true;        
  }
}

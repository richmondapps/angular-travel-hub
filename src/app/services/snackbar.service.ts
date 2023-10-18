import { Injectable, ViewEncapsulation } from '@angular/core';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  encapsulation: ViewEncapsulation.None;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  setAutoHide = true;
  autoHide = 3000;
  addExtraClass = false;
  actionButtonLabel = 'Retry';
  action = true;
  constructor(
  public snackBar: MatSnackBar
    ) {

     }

  openSnackBar(message: any, snackClass: any, setAutoHide?: any) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = [snackClass];
    this.snackBar.open(message, '',  config);
}

error(message: string) {
  const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = ['snackError'];
    return this.snackBar.open(message, '', config);
}

success(message: string) {
  console.log('SNACK MSG', message)
  const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = ['snackSuccess'];
  return this.snackBar.open(message, '', config);
}

info(message: string) {
  const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = ['snackInfo'];
    return this.snackBar.open(message, '', config);
}
}

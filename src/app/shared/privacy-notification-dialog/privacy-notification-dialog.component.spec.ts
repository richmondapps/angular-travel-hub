import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyNotificationDialogComponent } from './privacy-notification-dialog.component';

describe('PrivacyNotificationDialogComponent', () => {
  let component: PrivacyNotificationDialogComponent;
  let fixture: ComponentFixture<PrivacyNotificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivacyNotificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivacyNotificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

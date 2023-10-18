import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactCenterSmsVenuesComponent } from './admin-contact-center-sms-venues.component';

describe('AdminContactCenterSmsVenuesComponent', () => {
  let component: AdminContactCenterSmsVenuesComponent;
  let fixture: ComponentFixture<AdminContactCenterSmsVenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactCenterSmsVenuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactCenterSmsVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

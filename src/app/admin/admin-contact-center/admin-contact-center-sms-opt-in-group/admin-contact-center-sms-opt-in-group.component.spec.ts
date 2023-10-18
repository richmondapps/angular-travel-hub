import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactCenterSmsOptInGroupComponent } from './admin-contact-center-sms-opt-in-group.component';

describe('AdminContactCenterSmsOptInGroupComponent', () => {
  let component: AdminContactCenterSmsOptInGroupComponent;
  let fixture: ComponentFixture<AdminContactCenterSmsOptInGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactCenterSmsOptInGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactCenterSmsOptInGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

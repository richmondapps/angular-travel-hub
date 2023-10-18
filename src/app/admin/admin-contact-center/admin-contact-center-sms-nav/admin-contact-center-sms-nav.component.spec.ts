import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactCenterSmsNavComponent } from './admin-contact-center-sms-nav.component';

describe('AdminContactCenterSmsNavComponent', () => {
  let component: AdminContactCenterSmsNavComponent;
  let fixture: ComponentFixture<AdminContactCenterSmsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactCenterSmsNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactCenterSmsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

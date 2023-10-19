import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactCenterEmailNavComponent } from './admin-contact-center-email-nav.component';

describe('AdminContactCenterEmailNavComponent', () => {
  let component: AdminContactCenterEmailNavComponent;
  let fixture: ComponentFixture<AdminContactCenterEmailNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactCenterEmailNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactCenterEmailNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

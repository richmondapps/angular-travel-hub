import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchStaffNavComponent } from './admin-branch-staff-nav.component';

describe('AdminBranchStaffNavComponent', () => {
  let component: AdminBranchStaffNavComponent;
  let fixture: ComponentFixture<AdminBranchStaffNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBranchStaffNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBranchStaffNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

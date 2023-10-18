import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchStaffDepartmentsComponent } from './admin-branch-staff-departments.component';

describe('AdminBranchStaffDepartmentsComponent', () => {
  let component: AdminBranchStaffDepartmentsComponent;
  let fixture: ComponentFixture<AdminBranchStaffDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBranchStaffDepartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBranchStaffDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

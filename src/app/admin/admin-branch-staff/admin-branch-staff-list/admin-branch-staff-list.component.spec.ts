import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchStaffListComponent } from './admin-branch-staff-list.component';

describe('AdminBranchStaffListComponent', () => {
  let component: AdminBranchStaffListComponent;
  let fixture: ComponentFixture<AdminBranchStaffListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBranchStaffListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBranchStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

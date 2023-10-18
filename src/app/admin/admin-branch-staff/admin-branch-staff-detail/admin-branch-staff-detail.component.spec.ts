import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchStaffDetailComponent } from './admin-branch-staff-detail.component';

describe('AdminBranchStaffDetailComponent', () => {
  let component: AdminBranchStaffDetailComponent;
  let fixture: ComponentFixture<AdminBranchStaffDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBranchStaffDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBranchStaffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

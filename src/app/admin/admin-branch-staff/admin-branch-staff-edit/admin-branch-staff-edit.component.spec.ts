import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchStaffEditComponent } from './admin-branch-staff-edit.component';

describe('AdminBranchStaffEditComponent', () => {
  let component: AdminBranchStaffEditComponent;
  let fixture: ComponentFixture<AdminBranchStaffEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBranchStaffEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBranchStaffEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

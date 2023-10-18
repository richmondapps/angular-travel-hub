import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBranchStaffCreateComponent } from './admin-branch-staff-create.component';

describe('AdminBranchStaffCreateComponent', () => {
  let component: AdminBranchStaffCreateComponent;
  let fixture: ComponentFixture<AdminBranchStaffCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBranchStaffCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBranchStaffCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

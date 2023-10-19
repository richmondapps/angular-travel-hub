import { TestBed } from '@angular/core/testing';

import { AdminBranchStaffService } from './admin-branch-staff.service';

describe('AdminBranchStaffService', () => {
  let service: AdminBranchStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBranchStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

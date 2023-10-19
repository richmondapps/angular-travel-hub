import { TestBed } from '@angular/core/testing';

import { VerifiedEmployeeGuard } from './verified-employee.guard';

describe('VerifiedEmployeeGuard', () => {
  let guard: VerifiedEmployeeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifiedEmployeeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

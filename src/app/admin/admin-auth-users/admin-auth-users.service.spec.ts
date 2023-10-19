import { TestBed } from '@angular/core/testing';

import { AdminAuthUsersService } from './admin-auth-users.service';

describe('AdminAuthUsersService', () => {
  let service: AdminAuthUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAuthUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

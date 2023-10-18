import { TestBed } from '@angular/core/testing';

import { AdminContactCenterService } from './admin-contact-center.service';

describe('AdminContactCenterService', () => {
  let service: AdminContactCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminContactCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

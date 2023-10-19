import { TestBed } from '@angular/core/testing';

import { AdminFeatureRequestService } from './admin-feature-request.service';

describe('AdminFeatureRequestService', () => {
  let service: AdminFeatureRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFeatureRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

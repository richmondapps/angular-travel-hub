import { TestBed } from '@angular/core/testing';

import { AdminTravelRequestsService } from './admin-travel-requests.service';

describe('AdminTravelRequestsService', () => {
  let service: AdminTravelRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminTravelRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

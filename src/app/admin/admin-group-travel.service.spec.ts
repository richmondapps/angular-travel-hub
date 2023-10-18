import { TestBed } from '@angular/core/testing';

import { AdminGroupTravelService } from './admin-group-travel.service';

describe('AdminGroupTravelService', () => {
  let service: AdminGroupTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminGroupTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

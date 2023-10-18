import { TestBed } from '@angular/core/testing';

import { AdminAvailablePositionsService } from './admin-available-positions/admin-available-positions.service';

describe('AdminAvailablePositionsService', () => {
  let service: AdminAvailablePositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAvailablePositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

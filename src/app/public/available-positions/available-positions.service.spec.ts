import { TestBed } from '@angular/core/testing';

import { AvailablePositionsService } from './available-positions.service';

describe('AvailablePositionsService', () => {
  let service: AvailablePositionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailablePositionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

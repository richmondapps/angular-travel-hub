import { TestBed } from '@angular/core/testing';

import { NewProfileService } from './new-profile.service';

describe('NewProfileService', () => {
  let service: NewProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

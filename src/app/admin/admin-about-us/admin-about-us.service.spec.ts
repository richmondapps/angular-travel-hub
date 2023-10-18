import { TestBed } from '@angular/core/testing';

import { AdminAboutUsService } from './admin-about-us.service';

describe('AdminAboutUsService', () => {
  let service: AdminAboutUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAboutUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

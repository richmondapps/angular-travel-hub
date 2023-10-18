import { TestBed } from '@angular/core/testing';

import { AdminBugReportService } from './admin-bug-report.service';

describe('AdminBugReportService', () => {
  let service: AdminBugReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBugReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

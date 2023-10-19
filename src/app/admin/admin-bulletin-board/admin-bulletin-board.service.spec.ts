import { TestBed } from '@angular/core/testing';

import { AdminBulletinBoardService } from './admin-bulletin-board.service';

describe('AdminBulletinBoardService', () => {
  let service: AdminBulletinBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminBulletinBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

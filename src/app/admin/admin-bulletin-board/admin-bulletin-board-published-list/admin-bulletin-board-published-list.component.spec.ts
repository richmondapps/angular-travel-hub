import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardPublishedListComponent } from './admin-bulletin-board-published-list.component';

describe('AdminBulletinBoardPublishedListComponent', () => {
  let component: AdminBulletinBoardPublishedListComponent;
  let fixture: ComponentFixture<AdminBulletinBoardPublishedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardPublishedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardPublishedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

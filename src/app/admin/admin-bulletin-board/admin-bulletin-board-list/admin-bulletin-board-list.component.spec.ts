import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardListComponent } from './admin-bulletin-board-list.component';

describe('AdminBulletinBoardListComponent', () => {
  let component: AdminBulletinBoardListComponent;
  let fixture: ComponentFixture<AdminBulletinBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

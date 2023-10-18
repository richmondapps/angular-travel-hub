import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardDateComponent } from './admin-bulletin-board-date.component';

describe('AdminBulletinBoardDateComponent', () => {
  let component: AdminBulletinBoardDateComponent;
  let fixture: ComponentFixture<AdminBulletinBoardDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

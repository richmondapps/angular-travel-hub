import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardLocationComponent } from './admin-bulletin-board-location.component';

describe('AdminBulletinBoardLocationComponent', () => {
  let component: AdminBulletinBoardLocationComponent;
  let fixture: ComponentFixture<AdminBulletinBoardLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

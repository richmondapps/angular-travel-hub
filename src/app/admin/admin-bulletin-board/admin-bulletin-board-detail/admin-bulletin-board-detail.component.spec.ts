import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardDetailComponent } from './admin-bulletin-board-detail.component';

describe('AdminBulletinBoardDetailComponent', () => {
  let component: AdminBulletinBoardDetailComponent;
  let fixture: ComponentFixture<AdminBulletinBoardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

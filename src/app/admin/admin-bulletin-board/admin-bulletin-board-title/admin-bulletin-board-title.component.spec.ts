import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardTitleComponent } from './admin-bulletin-board-title.component';

describe('AdminBulletinBoardTitleComponent', () => {
  let component: AdminBulletinBoardTitleComponent;
  let fixture: ComponentFixture<AdminBulletinBoardTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

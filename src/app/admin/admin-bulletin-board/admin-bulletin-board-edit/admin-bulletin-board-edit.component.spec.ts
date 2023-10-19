import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardEditComponent } from './admin-bulletin-board-edit.component';

describe('AdminBulletinBoardEditComponent', () => {
  let component: AdminBulletinBoardEditComponent;
  let fixture: ComponentFixture<AdminBulletinBoardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

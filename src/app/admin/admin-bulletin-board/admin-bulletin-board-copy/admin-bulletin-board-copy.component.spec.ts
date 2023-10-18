import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardCopyComponent } from './admin-bulletin-board-copy.component';

describe('AdminBulletinBoardCopyComponent', () => {
  let component: AdminBulletinBoardCopyComponent;
  let fixture: ComponentFixture<AdminBulletinBoardCopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardCopyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardCopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

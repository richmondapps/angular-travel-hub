import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardImageComponent } from './admin-bulletin-board-image.component';

describe('AdminBulletinBoardImageComponent', () => {
  let component: AdminBulletinBoardImageComponent;
  let fixture: ComponentFixture<AdminBulletinBoardImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

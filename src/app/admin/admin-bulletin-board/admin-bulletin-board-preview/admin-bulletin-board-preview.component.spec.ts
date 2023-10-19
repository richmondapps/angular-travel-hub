import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardPreviewComponent } from './admin-bulletin-board-preview.component';

describe('AdminBulletinBoardPreviewComponent', () => {
  let component: AdminBulletinBoardPreviewComponent;
  let fixture: ComponentFixture<AdminBulletinBoardPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

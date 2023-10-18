import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardNavComponent } from './admin-bulletin-board-nav.component';

describe('AdminBulletinBoardNavComponent', () => {
  let component: AdminBulletinBoardNavComponent;
  let fixture: ComponentFixture<AdminBulletinBoardNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

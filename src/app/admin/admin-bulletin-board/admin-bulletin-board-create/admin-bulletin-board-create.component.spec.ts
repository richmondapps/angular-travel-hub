import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardCreateComponent } from './admin-bulletin-board-create.component';

describe('AdminBulletinBoardCreateComponent', () => {
  let component: AdminBulletinBoardCreateComponent;
  let fixture: ComponentFixture<AdminBulletinBoardCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

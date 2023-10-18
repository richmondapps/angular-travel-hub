import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBulletinBoardDraftListComponent } from './admin-bulletin-board-draft-list.component';

describe('AdminBulletinBoardDraftListComponent', () => {
  let component: AdminBulletinBoardDraftListComponent;
  let fixture: ComponentFixture<AdminBulletinBoardDraftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBulletinBoardDraftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBulletinBoardDraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

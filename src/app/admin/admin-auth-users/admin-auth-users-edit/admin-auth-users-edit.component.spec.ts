import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthUsersEditComponent } from './admin-auth-users-edit.component';

describe('AdminAuthUsersEditComponent', () => {
  let component: AdminAuthUsersEditComponent;
  let fixture: ComponentFixture<AdminAuthUsersEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthUsersEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthUsersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

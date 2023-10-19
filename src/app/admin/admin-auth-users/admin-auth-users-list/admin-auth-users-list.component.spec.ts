import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthUsersListComponent } from './admin-auth-users-list.component';

describe('AdminAuthUsersListComponent', () => {
  let component: AdminAuthUsersListComponent;
  let fixture: ComponentFixture<AdminAuthUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthUsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

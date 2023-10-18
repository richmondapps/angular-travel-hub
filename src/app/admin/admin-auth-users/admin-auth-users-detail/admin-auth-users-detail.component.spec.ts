import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthUsersDetailComponent } from './admin-auth-users-detail.component';

describe('AdminAuthUsersDetailComponent', () => {
  let component: AdminAuthUsersDetailComponent;
  let fixture: ComponentFixture<AdminAuthUsersDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthUsersDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthUsersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

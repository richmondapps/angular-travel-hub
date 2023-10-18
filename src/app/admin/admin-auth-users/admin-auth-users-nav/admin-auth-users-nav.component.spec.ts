import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthUsersNavComponent } from './admin-auth-users-nav.component';

describe('AdminAuthUsersNavComponent', () => {
  let component: AdminAuthUsersNavComponent;
  let fixture: ComponentFixture<AdminAuthUsersNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthUsersNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthUsersNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

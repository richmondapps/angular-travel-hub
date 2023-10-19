import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthUsersCreateComponent } from './admin-auth-users-create.component';

describe('AdminAuthUsersCreateComponent', () => {
  let component: AdminAuthUsersCreateComponent;
  let fixture: ComponentFixture<AdminAuthUsersCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthUsersCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthUsersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

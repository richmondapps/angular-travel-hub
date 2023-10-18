import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordlessSignupComponent } from './passwordless-signup.component';

describe('PasswordlessSignupComponent', () => {
  let component: PasswordlessSignupComponent;
  let fixture: ComponentFixture<PasswordlessSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordlessSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordlessSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

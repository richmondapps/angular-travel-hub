import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordlessSigninComponent } from './passwordless-signin.component';

describe('PasswordlessSigninComponent', () => {
  let component: PasswordlessSigninComponent;
  let fixture: ComponentFixture<PasswordlessSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordlessSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordlessSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlternateSigninComponent } from './alternate-signin.component';

describe('AlternateSigninComponent', () => {
  let component: AlternateSigninComponent;
  let fixture: ComponentFixture<AlternateSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlternateSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlternateSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookieOptoutConfirmationComponent } from './cookie-optout-confirmation.component';

describe('CookieOptoutConfirmationComponent', () => {
  let component: CookieOptoutConfirmationComponent;
  let fixture: ComponentFixture<CookieOptoutConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookieOptoutConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieOptoutConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

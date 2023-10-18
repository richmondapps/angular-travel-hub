import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicVenuesComponent } from './public-venues.component';

describe('PublicVenuesComponent', () => {
  let component: PublicVenuesComponent;
  let fixture: ComponentFixture<PublicVenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicVenuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

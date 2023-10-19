import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayRentalComponent } from './one-way-rental.component';

describe('OneWayRentalComponent', () => {
  let component: OneWayRentalComponent;
  let fixture: ComponentFixture<OneWayRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneWayRentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWayRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

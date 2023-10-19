import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCityFlightsComponent } from './return-city-flights.component';

describe('ReturnCityFlightsComponent', () => {
  let component: ReturnCityFlightsComponent;
  let fixture: ComponentFixture<ReturnCityFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnCityFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCityFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

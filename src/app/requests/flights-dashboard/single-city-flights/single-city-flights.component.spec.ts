import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCityFlightsComponent } from './single-city-flights.component';

describe('SingleCityFlightsComponent', () => {
  let component: SingleCityFlightsComponent;
  let fixture: ComponentFixture<SingleCityFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleCityFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCityFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

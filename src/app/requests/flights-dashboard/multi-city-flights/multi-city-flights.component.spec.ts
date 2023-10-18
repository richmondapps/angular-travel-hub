import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiCityFlightsComponent } from './multi-city-flights.component';

describe('MultiCityFlightsComponent', () => {
  let component: MultiCityFlightsComponent;
  let fixture: ComponentFixture<MultiCityFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiCityFlightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiCityFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

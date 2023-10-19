import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightMultiCityOptionsComponent } from './flight-multi-city-options.component';

describe('FlightMultiCityOptionsComponent', () => {
  let component: FlightMultiCityOptionsComponent;
  let fixture: ComponentFixture<FlightMultiCityOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightMultiCityOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightMultiCityOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

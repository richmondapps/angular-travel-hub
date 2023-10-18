import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsVehicleComponent } from './flights-vehicle.component';

describe('FlightsVehicleComponent', () => {
  let component: FlightsVehicleComponent;
  let fixture: ComponentFixture<FlightsVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

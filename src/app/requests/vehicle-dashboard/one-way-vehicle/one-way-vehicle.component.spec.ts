import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneWayVehicleComponent } from './one-way-vehicle.component';

describe('OneWayVehicleComponent', () => {
  let component: OneWayVehicleComponent;
  let fixture: ComponentFixture<OneWayVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneWayVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneWayVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

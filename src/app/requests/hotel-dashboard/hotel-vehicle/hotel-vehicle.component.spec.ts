import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelVehicleComponent } from './hotel-vehicle.component';

describe('HotelVehicleComponent', () => {
  let component: HotelVehicleComponent;
  let fixture: ComponentFixture<HotelVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

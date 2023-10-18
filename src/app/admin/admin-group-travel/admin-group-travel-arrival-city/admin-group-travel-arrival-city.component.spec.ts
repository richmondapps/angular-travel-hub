import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupTravelArrivalCityComponent } from './admin-group-travel-arrival-city.component';

describe('AdminGroupTravelArrivalCityComponent', () => {
  let component: AdminGroupTravelArrivalCityComponent;
  let fixture: ComponentFixture<AdminGroupTravelArrivalCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupTravelArrivalCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupTravelArrivalCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

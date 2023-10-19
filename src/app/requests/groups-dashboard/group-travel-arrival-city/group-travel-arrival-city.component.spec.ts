import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTravelArrivalCityComponent } from './group-travel-arrival-city.component';

describe('GroupTravelArrivalCityComponent', () => {
  let component: GroupTravelArrivalCityComponent;
  let fixture: ComponentFixture<GroupTravelArrivalCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTravelArrivalCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTravelArrivalCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

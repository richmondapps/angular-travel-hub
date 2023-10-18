import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightsAccommodationComponent } from './flights-accommodation.component';

describe('FlightsAccommodationComponent', () => {
  let component: FlightsAccommodationComponent;
  let fixture: ComponentFixture<FlightsAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightsAccommodationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightsAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

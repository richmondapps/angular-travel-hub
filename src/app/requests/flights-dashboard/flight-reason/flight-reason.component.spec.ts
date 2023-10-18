import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightReasonComponent } from './flight-reason.component';

describe('FlightReasonComponent', () => {
  let component: FlightReasonComponent;
  let fixture: ComponentFixture<FlightReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

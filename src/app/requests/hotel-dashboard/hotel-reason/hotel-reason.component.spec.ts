import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelReasonComponent } from './hotel-reason.component';

describe('HotelReasonComponent', () => {
  let component: HotelReasonComponent;
  let fixture: ComponentFixture<HotelReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleReasonComponent } from './vehicle-reason.component';

describe('VehicleReasonComponent', () => {
  let component: VehicleReasonComponent;
  let fixture: ComponentFixture<VehicleReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

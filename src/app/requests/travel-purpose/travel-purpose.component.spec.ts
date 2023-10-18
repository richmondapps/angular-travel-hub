import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPurposeComponent } from './travel-purpose.component';

describe('TravelPurposeComponent', () => {
  let component: TravelPurposeComponent;
  let fixture: ComponentFixture<TravelPurposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelPurposeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

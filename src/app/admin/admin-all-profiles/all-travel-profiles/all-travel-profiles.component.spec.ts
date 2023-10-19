import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTravelProfilesComponent } from './all-travel-profiles.component';

describe('AllTravelProfilesComponent', () => {
  let component: AllTravelProfilesComponent;
  let fixture: ComponentFixture<AllTravelProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTravelProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTravelProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

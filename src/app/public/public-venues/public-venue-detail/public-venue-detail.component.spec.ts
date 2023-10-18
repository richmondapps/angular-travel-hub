import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicVenueDetailComponent } from './public-venue-detail.component';

describe('PublicVenueDetailComponent', () => {
  let component: PublicVenueDetailComponent;
  let fixture: ComponentFixture<PublicVenueDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicVenueDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicVenueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

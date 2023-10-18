import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicVenuesNavComponent } from './public-venues-nav.component';

describe('PublicVenuesNavComponent', () => {
  let component: PublicVenuesNavComponent;
  let fixture: ComponentFixture<PublicVenuesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicVenuesNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicVenuesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupTravelTitleComponent } from './admin-group-travel-title.component';

describe('AdminGroupTravelTitleComponent', () => {
  let component: AdminGroupTravelTitleComponent;
  let fixture: ComponentFixture<AdminGroupTravelTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupTravelTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupTravelTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

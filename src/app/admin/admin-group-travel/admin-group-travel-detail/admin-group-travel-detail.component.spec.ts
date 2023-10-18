import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupTravelDetailComponent } from './admin-group-travel-detail.component';

describe('AdminGroupTravelDetailComponent', () => {
  let component: AdminGroupTravelDetailComponent;
  let fixture: ComponentFixture<AdminGroupTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupTravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

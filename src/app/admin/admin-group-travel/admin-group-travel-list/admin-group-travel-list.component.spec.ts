import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupTravelListComponent } from './admin-group-travel-list.component';

describe('AdminGroupTravelListComponent', () => {
  let component: AdminGroupTravelListComponent;
  let fixture: ComponentFixture<AdminGroupTravelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupTravelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupTravelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

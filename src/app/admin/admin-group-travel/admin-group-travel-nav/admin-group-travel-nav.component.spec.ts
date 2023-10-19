import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupTravelNavComponent } from './admin-group-travel-nav.component';

describe('AdminGroupTravelNavComponent', () => {
  let component: AdminGroupTravelNavComponent;
  let fixture: ComponentFixture<AdminGroupTravelNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupTravelNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupTravelNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelRequestsTableComponent } from './admin-travel-requests-table.component';

describe('AdminTravelRequestsTableComponent', () => {
  let component: AdminTravelRequestsTableComponent;
  let fixture: ComponentFixture<AdminTravelRequestsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelRequestsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

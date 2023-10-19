import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelRequestsDetailComponent } from './admin-travel-requests-detail.component';

describe('AdminTravelRequestsDetailComponent', () => {
  let component: AdminTravelRequestsDetailComponent;
  let fixture: ComponentFixture<AdminTravelRequestsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelRequestsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelRequestsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTravelRequestsNavComponent } from './admin-travel-requests-nav.component';

describe('AdminTravelRequestsNavComponent', () => {
  let component: AdminTravelRequestsNavComponent;
  let fixture: ComponentFixture<AdminTravelRequestsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTravelRequestsNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTravelRequestsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

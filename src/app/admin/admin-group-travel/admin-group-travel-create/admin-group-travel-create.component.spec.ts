import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupTravelCreateComponent } from './admin-group-travel-create.component';

describe('AdminGroupTravelCreateComponent', () => {
  let component: AdminGroupTravelCreateComponent;
  let fixture: ComponentFixture<AdminGroupTravelCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupTravelCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupTravelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

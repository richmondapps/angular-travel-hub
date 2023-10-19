import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelectGroupTravelersComponent } from './admin-select-group-travelers.component';

describe('AdminSelectGroupTravelersComponent', () => {
  let component: AdminSelectGroupTravelersComponent;
  let fixture: ComponentFixture<AdminSelectGroupTravelersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSelectGroupTravelersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSelectGroupTravelersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

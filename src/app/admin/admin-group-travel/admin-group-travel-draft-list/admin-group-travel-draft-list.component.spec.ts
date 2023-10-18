import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupTravelDraftListComponent } from './admin-group-travel-draft-list.component';

describe('AdminGroupTravelDraftListComponent', () => {
  let component: AdminGroupTravelDraftListComponent;
  let fixture: ComponentFixture<AdminGroupTravelDraftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupTravelDraftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupTravelDraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

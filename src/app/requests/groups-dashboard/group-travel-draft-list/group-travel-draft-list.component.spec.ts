import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTravelDraftListComponent } from './group-travel-draft-list.component';

describe('GroupTravelDraftListComponent', () => {
  let component: GroupTravelDraftListComponent;
  let fixture: ComponentFixture<GroupTravelDraftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTravelDraftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTravelDraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
